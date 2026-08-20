#!/usr/bin/env bash

set -Eeuo pipefail

usage() {
  printf 'Usage: %s user@server [remote_dir] [public_url]\n' "$0" >&2
  printf 'Example: %s root@203.0.113.10 /opt/signalbit https://example.ru\n' "$0" >&2
}

if [ "$#" -lt 1 ] || [ "$#" -gt 3 ]; then
  usage
  exit 1
fi

REMOTE_HOST="$1"
REMOTE_DIR="${2:-/opt/signalbit}"
SERVER_ADDRESS="${REMOTE_HOST#*@}"
PUBLIC_URL="${3:-http://$SERVER_ADDRESS}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ ! "$REMOTE_DIR" =~ ^/[A-Za-z0-9._/-]+$ ]]; then
  printf 'remote_dir must be an absolute path containing only letters, digits, ., _, - and /.\n' >&2
  exit 1
fi

if [[ ! "$PUBLIC_URL" =~ ^https?://[A-Za-z0-9._:\[\]-]+$ ]]; then
  printf 'public_url must look like https://example.ru (without a trailing slash or path).\n' >&2
  exit 1
fi

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    printf 'Required local command is missing: %s\n' "$1" >&2
    exit 1
  fi
}

require_command ssh
require_command rsync

printf 'Uploading full stack sources to %s:%s...\n' "$REMOTE_HOST" "$REMOTE_DIR"
ssh "$REMOTE_HOST" "mkdir -p '$REMOTE_DIR'"

rsync -az --delete \
  --exclude '.git/' \
  --exclude '.agents/' \
  --exclude '.env*' \
  --exclude '.pnpm-store/' \
  --exclude '.vite/' \
  --exclude 'node_modules/' \
  --exclude 'dist/' \
  --exclude 'dist-*/' \
  --exclude 'build/' \
  --exclude '.cache/' \
  --exclude '.tmp/' \
  --exclude 'backend/public/uploads/' \
  --exclude 'backend/transfer_*.log' \
  "$ROOT_DIR/" "$REMOTE_HOST:$REMOTE_DIR/"

ssh "$REMOTE_HOST" "REMOTE_DIR='$REMOTE_DIR' PUBLIC_URL='$PUBLIC_URL' bash -s" <<'REMOTE_SCRIPT'
set -Eeuo pipefail

cd "$REMOTE_DIR"
# shellcheck disable=SC1091
. scripts/deploy-remote-common.sh

wait_for_service() {
  local service="$1"
  local attempts="${2:-60}"
  local container_id
  local status

  for ((attempt = 1; attempt <= attempts; attempt += 1)); do
    container_id="$("${DOCKER[@]}" compose --env-file .env.stack -p signalbit-stack -f docker-compose.stack.yml ps -q "$service" 2>/dev/null || true)"
    if [ -n "$container_id" ]; then
      status="$("${DOCKER[@]}" inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$container_id" 2>/dev/null || true)"
      if [ "$status" = 'healthy' ] || [ "$status" = 'running' ]; then
        return
      fi
    fi
    sleep 3
  done

  printf 'Service %s did not become healthy. Recent logs:\n' "$service" >&2
  "${DOCKER[@]}" compose --env-file .env.stack -p signalbit-stack -f docker-compose.stack.yml logs --tail=100 "$service" >&2
  exit 1
}

install_docker
select_docker_command

umask 077
if [ ! -f .env.stack ]; then
  database_password="$(generate_secret)"
  cat > .env.stack <<ENV_FILE
APP_KEYS=$(generate_secret),$(generate_secret),$(generate_secret),$(generate_secret)
API_TOKEN_SALT=$(generate_secret)
ADMIN_JWT_SECRET=$(generate_secret)
TRANSFER_TOKEN_SALT=$(generate_secret)
JWT_SECRET=$(generate_secret)
ENCRYPTION_KEY=$(generate_secret)

DATABASE_NAME=signalbit_cms
DATABASE_USERNAME=signalbit
DATABASE_PASSWORD=$database_password
DATABASE_SSL=false

PUBLIC_URL=$PUBLIC_URL
CORS_ORIGINS=$PUBLIC_URL
CORS_ALLOW_VERCEL_PREVIEWS=false
VITE_CONTACT_FORM_ENDPOINT=
HTTP_BIND_ADDRESS=0.0.0.0
HTTP_PORT=80

# Fill these values to enable email delivery, then run the deploy script again.
SMTP_HOST=
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USERNAME=
SMTP_PASSWORD=
SMTP_FROM=
SMTP_REPLY_TO=
ENV_FILE
  chmod 600 .env.stack
  printf 'Created persistent configuration: %s/.env.stack\n' "$REMOTE_DIR"
fi

printf 'Building and starting PostgreSQL + Strapi + frontend...\n'
"${DOCKER[@]}" compose --env-file .env.stack -p signalbit-stack -f docker-compose.stack.yml up -d --build --remove-orphans
wait_for_service postgres 30
wait_for_service strapi 60
wait_for_service frontend 30
"${DOCKER[@]}" compose --env-file .env.stack -p signalbit-stack -f docker-compose.stack.yml ps
REMOTE_SCRIPT

printf '\nFull-stack deployment completed.\n'
printf 'Website:     %s\n' "$PUBLIC_URL"
printf 'Admin panel: %s/admin\n' "$PUBLIC_URL"
printf 'API health:  %s/_health\n' "$PUBLIC_URL"
printf 'Persistent config: %s/.env.stack on the server\n' "$REMOTE_DIR"

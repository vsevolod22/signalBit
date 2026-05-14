#!/usr/bin/env bash

set -euo pipefail

if [ "$#" -lt 1 ]; then
  printf 'Usage: %s user@server [remote_dir]\n' "$0" >&2
  exit 1
fi

REMOTE_HOST="$1"
REMOTE_DIR="${2:-/opt/signalbit}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    printf 'Required command is missing: %s\n' "$1" >&2
    exit 1
  fi
}

require_command ssh
require_command rsync

ssh "$REMOTE_HOST" "mkdir -p '$REMOTE_DIR'"

rsync -az --delete \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude 'backend/node_modules' \
  --exclude 'dist' \
  --exclude 'backend/build' \
  --exclude 'backend/dist' \
  --exclude 'backend/.tmp' \
  --exclude 'backend/.cache' \
  --exclude 'backend/public/uploads' \
  --exclude 'backend/.env' \
  "$ROOT_DIR/" "$REMOTE_HOST:$REMOTE_DIR/"

ssh "$REMOTE_HOST" "REMOTE_DIR='$REMOTE_DIR' bash -s" <<'REMOTE_SCRIPT'
set -euo pipefail

cd "$REMOTE_DIR"

if ! command -v docker >/dev/null 2>&1; then
  printf 'Docker is not installed on the server. Install Docker first.\n' >&2
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  printf 'Docker Compose plugin is not installed on the server. Install docker compose first.\n' >&2
  exit 1
fi

generate_secret() {
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -base64 32 | tr -d '\n'
  else
    date +%s%N | sha256sum | cut -d ' ' -f 1
  fi
}

mkdir -p backend

if [ ! -f backend/.env ]; then
  cat > backend/.env <<ENV_FILE
HOST=0.0.0.0
PORT=1337
APP_KEYS=$(generate_secret),$(generate_secret),$(generate_secret),$(generate_secret)
API_TOKEN_SALT=$(generate_secret)
ADMIN_JWT_SECRET=$(generate_secret)
TRANSFER_TOKEN_SALT=$(generate_secret)
JWT_SECRET=$(generate_secret)
ENCRYPTION_KEY=$(generate_secret)

DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=signalbit_cms
DATABASE_USERNAME=signalbit
DATABASE_PASSWORD=$(generate_secret)
DATABASE_SSL=false
STRAPI_TELEMETRY_DISABLED=true
CORS_ORIGINS=http://localhost:5173,http://localhost:4173
CORS_ALLOW_VERCEL_PREVIEWS=false
ENV_FILE
fi

set -a
. backend/.env
set +a

docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml ps
REMOTE_SCRIPT

printf 'Strapi CMS deployed to %s:%s\n' "$REMOTE_HOST" "$REMOTE_DIR"
printf 'Admin panel: http://%s:1337/admin\n' "${REMOTE_HOST#*@}"

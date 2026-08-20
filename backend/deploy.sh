#!/usr/bin/env bash

set -Eeuo pipefail

usage() {
  printf 'Usage: %s user@server [remote_dir] [cors_origins]\n' "$0" >&2
  printf 'Example: %s root@203.0.113.10 /opt/signalbit-backend https://example.ru,https://www.example.ru\n' "$0" >&2
  printf 'Use * as cors_origins to allow requests from every site.\n' >&2
}

if [ "$#" -lt 1 ] || [ "$#" -gt 3 ]; then
  usage
  exit 1
fi

REMOTE_HOST="$1"
REMOTE_DIR="${2:-/opt/signalbit-backend}"
CORS_ORIGINS="${3:-*}"
BACKEND_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ ! "$REMOTE_DIR" =~ ^/[A-Za-z0-9._/-]+$ ]]; then
  printf 'remote_dir must be an absolute path containing only letters, digits, ., _, - and /.\n' >&2
  exit 1
fi

validate_cors_origins() {
  local origin
  local origins

  if [ "$CORS_ORIGINS" = '*' ]; then
    return
  fi

  IFS=',' read -r -a origins <<< "$CORS_ORIGINS"
  for origin in "${origins[@]}"; do
    if [[ ! "$origin" =~ ^https?://[A-Za-z0-9._:\[\]-]+$ ]]; then
      printf 'Invalid CORS origin: %s\n' "$origin" >&2
      printf 'Use URLs without paths or trailing slashes, separated by commas.\n' >&2
      exit 1
    fi
  done
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    printf 'Required local command is missing: %s\n' "$1" >&2
    exit 1
  fi
}

validate_cors_origins
require_command ssh
require_command rsync

printf 'Uploading standalone backend to %s:%s...\n' "$REMOTE_HOST" "$REMOTE_DIR"
ssh "$REMOTE_HOST" "mkdir -p '$REMOTE_DIR'"

rsync -az --delete \
  --exclude '.git/' \
  --exclude '.env' \
  --exclude '.env.*' \
  --exclude '.cache/' \
  --exclude '.tmp/' \
  --exclude '.strapi/' \
  --exclude '.strapi-updater.json' \
  --exclude 'build/' \
  --exclude 'dist/' \
  --exclude 'node_modules/' \
  --exclude 'public/uploads/' \
  --exclude 'transfer_*.log' \
  "$BACKEND_ROOT/" "$REMOTE_HOST:$REMOTE_DIR/"

ssh "$REMOTE_HOST" "REMOTE_DIR='$REMOTE_DIR' CORS_ORIGINS='$CORS_ORIGINS' bash -s" <<'REMOTE_SCRIPT'
set -Eeuo pipefail

set_privileged_command() {
  if [ "$(id -u)" -eq 0 ]; then
    SUDO=()
  elif command -v sudo >/dev/null 2>&1 && sudo -n true 2>/dev/null; then
    SUDO=(sudo -n)
  else
    printf 'Docker installation requires root or passwordless sudo on the server.\n' >&2
    exit 1
  fi
}

install_docker() {
  if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
    return
  fi

  if ! command -v apt-get >/dev/null 2>&1; then
    printf 'Docker is missing. Automatic installation supports Debian/Ubuntu only.\n' >&2
    exit 1
  fi

  set_privileged_command

  if command -v docker >/dev/null 2>&1; then
    "${SUDO[@]}" apt-get update
    if ! "${SUDO[@]}" env DEBIAN_FRONTEND=noninteractive apt-get install -y docker-compose-plugin; then
      "${SUDO[@]}" env DEBIAN_FRONTEND=noninteractive apt-get install -y docker-compose-v2
    fi
    docker compose version >/dev/null 2>&1 && return
    printf 'Could not add Docker Compose to the existing Docker installation.\n' >&2
    exit 1
  fi

  # shellcheck disable=SC1091
  . /etc/os-release
  case "${ID:-}" in
    debian | ubuntu) docker_distribution="$ID" ;;
    *)
      printf 'Automatic Docker installation supports Debian/Ubuntu only.\n' >&2
      exit 1
      ;;
  esac

  docker_codename="${UBUNTU_CODENAME:-${VERSION_CODENAME:-}}"
  if [ -z "$docker_codename" ]; then
    printf 'Could not determine the server distribution codename.\n' >&2
    exit 1
  fi

  printf 'Installing Docker Engine and Docker Compose...\n'
  "${SUDO[@]}" apt-get update
  "${SUDO[@]}" env DEBIAN_FRONTEND=noninteractive apt-get install -y ca-certificates curl
  "${SUDO[@]}" install -m 0755 -d /etc/apt/keyrings

  docker_key_file="$(mktemp)"
  docker_sources_file="$(mktemp)"
  curl -fsSL "https://download.docker.com/linux/$docker_distribution/gpg" -o "$docker_key_file"
  "${SUDO[@]}" install -m 0644 "$docker_key_file" /etc/apt/keyrings/docker.asc

  printf '%s\n' \
    'Types: deb' \
    "URIs: https://download.docker.com/linux/$docker_distribution" \
    "Suites: $docker_codename" \
    'Components: stable' \
    "Architectures: $(dpkg --print-architecture)" \
    'Signed-By: /etc/apt/keyrings/docker.asc' > "$docker_sources_file"
  "${SUDO[@]}" install -m 0644 "$docker_sources_file" /etc/apt/sources.list.d/docker.sources
  rm -f "$docker_key_file" "$docker_sources_file"

  "${SUDO[@]}" apt-get update
  "${SUDO[@]}" env DEBIAN_FRONTEND=noninteractive apt-get install -y \
    docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  if command -v systemctl >/dev/null 2>&1; then
    "${SUDO[@]}" systemctl enable --now docker
  else
    "${SUDO[@]}" service docker start
  fi
}

select_docker_command() {
  if docker info >/dev/null 2>&1; then
    DOCKER=(docker)
  elif command -v sudo >/dev/null 2>&1 && sudo -n docker info >/dev/null 2>&1; then
    DOCKER=(sudo -n docker)
  else
    printf 'The current server user cannot access Docker.\n' >&2
    exit 1
  fi
}

generate_secret() {
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -hex 32
  else
    od -An -N32 -tx1 /dev/urandom | tr -d ' \n'
  fi
}

wait_for_service() {
  local service="$1"
  local attempts="${2:-60}"
  local container_id
  local status

  for ((attempt = 1; attempt <= attempts; attempt += 1)); do
    container_id="$("${DOCKER[@]}" compose --env-file .env -p signalbit-backend -f docker-compose.prod.yml ps -q "$service" 2>/dev/null || true)"
    if [ -n "$container_id" ]; then
      status="$("${DOCKER[@]}" inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$container_id" 2>/dev/null || true)"
      if [ "$status" = 'healthy' ] || [ "$status" = 'running' ]; then
        return
      fi
    fi
    sleep 3
  done

  printf 'Service %s did not become healthy. Recent logs:\n' "$service" >&2
  "${DOCKER[@]}" compose --env-file .env -p signalbit-backend -f docker-compose.prod.yml logs --tail=100 "$service" >&2
  exit 1
}

cd "$REMOTE_DIR"
install_docker
select_docker_command

umask 077
if [ ! -f .env ]; then
  database_password="$(generate_secret)"
  cat > .env <<ENV_FILE
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_KEYS=$(generate_secret),$(generate_secret),$(generate_secret),$(generate_secret)
API_TOKEN_SALT=$(generate_secret)
ADMIN_JWT_SECRET=$(generate_secret)
TRANSFER_TOKEN_SALT=$(generate_secret)
JWT_SECRET=$(generate_secret)
ENCRYPTION_KEY=$(generate_secret)
STRAPI_TELEMETRY_DISABLED=true

DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=signalbit_cms
DATABASE_USERNAME=signalbit
DATABASE_PASSWORD=$database_password
DATABASE_SSL=false

CORS_ORIGINS=$CORS_ORIGINS
CORS_ALLOW_VERCEL_PREVIEWS=false
STRAPI_BIND_ADDRESS=0.0.0.0
STRAPI_PORT=1337

SMTP_HOST=
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USERNAME=
SMTP_PASSWORD=
SMTP_FROM=
SMTP_REPLY_TO=
ENV_FILE
  chmod 600 .env
  printf 'Created persistent production env: %s/.env\n' "$REMOTE_DIR"
fi

printf 'Building and starting PostgreSQL + Strapi...\n'
"${DOCKER[@]}" compose --env-file .env -p signalbit-backend -f docker-compose.prod.yml up -d --build --remove-orphans
wait_for_service postgres 30
wait_for_service strapi 60
"${DOCKER[@]}" compose --env-file .env -p signalbit-backend -f docker-compose.prod.yml ps
REMOTE_SCRIPT

SERVER_ADDRESS="${REMOTE_HOST#*@}"
printf '\nBackend deployment completed.\n'
printf 'Admin panel: http://%s:1337/admin\n' "$SERVER_ADDRESS"
printf 'API health:  http://%s:1337/_health\n' "$SERVER_ADDRESS"
printf 'Server env:  %s/.env\n' "$REMOTE_DIR"

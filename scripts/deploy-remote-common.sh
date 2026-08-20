#!/usr/bin/env bash

# Shared helpers for the remote part of deploy-cms.sh and deploy-stack.sh.

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
    printf 'Docker is installed, but the Compose plugin is missing. Installing it...\n'
    "${SUDO[@]}" apt-get update
    if ! "${SUDO[@]}" env DEBIAN_FRONTEND=noninteractive apt-get install -y docker-compose-plugin; then
      "${SUDO[@]}" env DEBIAN_FRONTEND=noninteractive apt-get install -y docker-compose-v2
    fi

    if docker compose version >/dev/null 2>&1; then
      return
    fi

    printf 'Could not add Docker Compose to the existing Docker installation.\n' >&2
    exit 1
  fi

  # Install Docker Engine from Docker's official apt repository.
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

  printf 'Installing Docker Engine and Docker Compose from the official repository...\n'
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
    printf 'The current server user cannot access Docker. Use root or configure the docker group.\n' >&2
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


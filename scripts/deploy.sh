#!/usr/bin/env bash
set -Eeuo pipefail

readonly APP_DIR="/var/www/example-frontend"
readonly BRANCH="main"
readonly HEALTH_URL="http://127.0.0.1:3000/api/health"

stage() { printf '\n==> %s\n' "$1"; }

# Non-interactive SSH sessions do not load NVM automatically.
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [[ ! -s "$NVM_DIR/nvm.sh" ]]; then
  echo "NVM was not found at $NVM_DIR" >&2
  exit 1
fi
# shellcheck source=/dev/null
. "$NVM_DIR/nvm.sh"

stage "Entering application directory"
cd "$APP_DIR"
nvm install
nvm use

stage "Updating checkout to origin/$BRANCH"
git fetch --prune origin "$BRANCH"
# Ignored .env.production persists because reset only changes tracked files.
git reset --hard "origin/$BRANCH"

stage "Installing locked dependencies"
npm ci

stage "Building Next.js application"
# NEXT_PUBLIC_API_URL is read from persistent .env.production and embedded here.
npm run build

stage "Starting or reloading PM2 process"
mkdir -p logs
pm2 startOrReload ecosystem.config.cjs --update-env

stage "Checking local frontend health"
healthy=false
for attempt in {1..15}; do
  if curl --fail --silent --show-error "$HEALTH_URL" >/dev/null; then
    healthy=true
    break
  fi
  sleep 2
done
if [[ "$healthy" != true ]]; then
  pm2 logs diet-wellness-frontend --lines 80 --nostream || true
  echo "Health check failed: $HEALTH_URL" >&2
  exit 1
fi

pm2 status diet-wellness-frontend
stage "Deployment completed"

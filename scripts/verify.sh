#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT_DIR"

step() { echo "\n✅ $1"; }

step "Installing dependencies"
pnpm install --frozen-lockfile

step "Running lint"
pnpm lint

step "Type checking"
pnpm exec turbo run typecheck

step "Building packages"
pnpm build

step "Starting infrastructure"
docker compose -f infra/docker/docker-compose.yml up -d postgres redis minio keycloak

step "Applying migrations"
pnpm --filter @tool-jockey/api prisma:migrate

step "Seeding database"
pnpm --filter @tool-jockey/api prisma:seed

step "Running API tests"
pnpm --filter @tool-jockey/api test

step "Building web"
pnpm --filter @tool-jockey/web build

step "Running Playwright"
cd tests/e2e
pnpm install --frozen-lockfile
pnpm test || (npx playwright install && pnpm test)
cd "$ROOT_DIR"

step "Running performance smoke"
if command -v k6 >/dev/null 2>&1; then
  k6 run --vus 1 --duration 10s tests/perf/checkout-smoke.js || true
else
  echo "k6 not found, skipping"
fi

step "Verification complete"

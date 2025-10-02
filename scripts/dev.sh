#!/usr/bin/env bash
set -euo pipefail

docker compose -f infra/docker/docker-compose.yml up -d
pnpm --filter @tool-jockey/api prisma:migrate
pnpm --filter @tool-jockey/api prisma:seed
pnpm exec turbo run dev --parallel --filter "@tool-jockey/api" --filter "@tool-jockey/web"

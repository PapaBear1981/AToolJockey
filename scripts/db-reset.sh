#!/usr/bin/env bash
set -euo pipefail

pnpm --filter @tool-jockey/api prisma:migrate reset --force
pnpm --filter @tool-jockey/api prisma:seed

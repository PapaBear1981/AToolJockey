#!/usr/bin/env bash
set -euo pipefail

pnpm install --frozen-lockfile
pnpm lint
pnpm exec turbo run typecheck
pnpm build
pnpm --filter @tool-jockey/api test -- --runInBand
pnpm --filter @tool-jockey/web build
cd tests/e2e
pnpm install --frozen-lockfile
pnpm test -- --reporter=list

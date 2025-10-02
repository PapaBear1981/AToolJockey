# Tool Jockey API

## Overview
NestJS service implementing the Tool Jockey domain: authentication, checkout rules, calibration, transfers, and reporting. The service exposes an OpenAPI spec at `/api/docs` and enforces RBAC with bearer tokens (Keycloak in dev, static dev tokens for local testing).

## Quickstart
```bash
pnpm install
cp .env.example .env
pnpm prisma:migrate
pnpm prisma:seed
pnpm start:dev
```

## Authentication
- **Bearer token** from Keycloak. During local development the following static tokens are accepted:
  - `dev-admin-token`
  - `dev-manager-token`
  - `dev-user-token`
- Attach via `Authorization: Bearer <token>` header.

## Key Endpoints
| Method | Path | Description |
| --- | --- | --- |
| GET | `/healthz` | Health probe |
| GET | `/tools` | Search inventory |
| POST | `/checkouts` | Checkout with rule evaluation |
| POST | `/calibration/receive` | Receive calibrated tool |
| POST | `/transfers` | Initiate transfer |
| POST | `/repairs` | Log/close repair |
| POST | `/files/presign` | Generate S3 presigned upload |
| POST | `/labels/:toolId/print` | Generate ZPL label |

## Error Codes
Errors are returned as JSON `{ "statusCode": 400, "message": "error_code" }`. Common codes:
- `checkout_blocked`: calibration or quarantine prevented issuance.
- `duplicate_serial`: serial number already exists for the type.
- `tool_not_found`: referenced tool does not exist.

## Testing
```bash
pnpm test
pnpm test:watch
```

## Seeding
Seed adds example warehouses, tool types, and sample tools with calibration/quarantine states.

## Environment Variables
See `.env.example`. Key values:
- `DATABASE_URL`: Postgres connection
- `S3_ENDPOINT`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`: MinIO/S3 credentials
- `KEYCLOAK_*`: OIDC realm configuration
- `WEB_ORIGIN`: Allowed CORS origin

## Architecture Notes
- **Prisma** for database access.
- **BullMQ** ready for async jobs (e.g., thumbnailing) – not yet wired but scaffolding in place.
- **Event log** uses SHA-256 hash chaining for tamper evidence.
- **Rate limiting** configured via `@nestjs/throttler` (120 req/min).


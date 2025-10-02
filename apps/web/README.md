# Tool Jockey Web

## Overview
Next.js 15 application delivering the operator dashboard, scanner-first workflows, and offline-ready experience. Built with Tailwind CSS, React Query, and Dexie for IndexedDB persistence.

## Quickstart
```bash
pnpm install
cp .env.example .env.local
pnpm dev
```
The app expects the API at `NEXT_PUBLIC_API_URL` (default `http://localhost:3000`).

## Pages
- `/` – dashboard summary cards and navigation.
- `/inventory` – searchable tool list with status badges.
- `/checkouts` – scanner-first checkout flow (stubbed for now).
- `/reports` – placeholders for Metabase embeds.
- `/admin` – RBAC management shell.

## Offline Notes
- Dexie caches inventory and pending mutations.
- `queueMutation` records offline actions; `flushQueue` replays when network is back.
- Service worker generated via `next-pwa` (disabled in dev).

## Accessibility & UI
- Tailwind forms plugin ensures accessible inputs.
- Dark/light theme persisted in `localStorage` and toggled via navigation.
- Shared UI kit lives in `@tool-jockey/ui`.

## Testing
Currently Playwright smoke tests cover page loads. Extend specs in `tests/e2e/specs`.


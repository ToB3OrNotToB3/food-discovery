# Food Discovery — frontend

The web client for the Food Discovery project. The current home screen is an early Bengaluru discovery prototype; every restaurant name, description, and Vibe Check shown on it is fictional demo content, not a real listing or review.

## Run locally

Requirements: Node.js 24 (or Node.js 22.12+) and pnpm 11. The app itself supports older Node versions, but the test runner requires these supported versions.

```sh
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Useful checks:

For a phone or another browser using this computer's Wi-Fi address, set `GOODFIND_DEV_ORIGIN` to that address before starting the development server (for example, `192.168.1.6`). This lets Next.js serve its development assets to the LAN preview.

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Project conventions

- Keep product screens and domain logic organized by feature as the app grows.
- Keep shared visual primitives separate from feature-specific components.
- Treat demo content as demo content; never present a synthetic rating as a real user signal.
- See `../docs/FRONTEND_ARCHITECTURE.md` for the agreed frontend direction and first-slice acceptance criteria.

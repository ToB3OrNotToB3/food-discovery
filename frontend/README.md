# Food Discovery — frontend

The web client for the Food Discovery project. The current home screen is an early Bengaluru discovery prototype; every restaurant name, description, and Vibe Check shown on it is fictional demo content, not a real listing or review.

## Run locally

Requirements: Node.js 20.9 or newer and pnpm 10 or newer.

```sh
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Useful checks:

```sh
pnpm lint
pnpm typecheck
pnpm build
```

## Project conventions

- Keep product screens and domain logic organized by feature as the app grows.
- Keep shared visual primitives separate from feature-specific components.
- Treat demo content as demo content; never present a synthetic rating as a real user signal.
- See `../docs/FRONTEND_ARCHITECTURE.md` for the agreed frontend direction and first-slice acceptance criteria.

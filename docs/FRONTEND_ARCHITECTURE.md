# Frontend Architecture

Last updated: 28 September 2026

## Status

Accepted for the initial frontend foundation. Revisit individual choices only when product evidence or implementation constraints justify a change.

## Goals

- Deliver a mobile-first food-discovery experience for Bangalore users.
- Support an immersive vertical feed and intent-based search without sacrificing accessible navigation.
- Make public restaurant and dish pages fast, linkable, and discoverable.
- Start with typed demo data and switch to FastAPI without rewriting presentation components.
- Keep product behavior testable, observable, and deployable from the beginning.

## Non-Goals

- Replacing the FastAPI backend with Next.js server logic.
- Adding native mobile applications.
- Implementing authentication, payments, ordering, or public reviews in the first slice.
- Introducing global state, a monorepo tool, or a large component framework before it is needed.

## Technology Decisions

| Area | Choice | Reason |
| --- | --- | --- |
| Framework | Next.js App Router | Supports public pages, server rendering, route-level loading/error states, and app-like client navigation. |
| Language | TypeScript with strict checking | Keeps mock data, API responses, and UI states explicit and refactor-safe. |
| Package manager | pnpm | Fast, space-efficient installs with a strict dependency model. |
| Styling | Tailwind CSS plus CSS custom-property tokens | Enables rapid responsive work while keeping colours, typography, spacing, and motion centrally controlled. |
| UI primitives | Native HTML first; Radix Primitives for complex controls | Preserves semantics and provides tested keyboard/focus behaviour for dialogs, menus, and similar patterns. |
| Server state | Next.js server fetching plus TanStack Query where client caching is required | Avoids client JavaScript for ordinary pages while supporting the infinite feed and interactive search. |
| Local state | React state; URL search parameters for shareable filters | Avoids an unnecessary global state dependency and keeps discovery views linkable. |
| Anonymous saves | Versioned local storage | Supports useful saving before authentication exists and leaves a migration path for account sync. |
| Validation | Generated OpenAPI types plus runtime validation at untrusted boundaries | Prevents the frontend from blindly trusting API or stored data. |
| Component tests | Vitest and React Testing Library | Tests behaviour through the DOM rather than component internals. |
| End-to-end tests | Playwright with axe checks | Covers real browser journeys and automatically detectable accessibility issues. |

Do not add a global state library, form library, animation library, analytics SDK, or authentication SDK until a concrete requirement exists.

## Repository Layout

The frontend will live beside the existing Python application rather than inside it.

```text
food-discovery/
├── app/                         # FastAPI and sentiment code
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/                 # Routes, layouts, metadata, loading and error files
│   │   ├── components/
│   │   │   ├── ui/              # Reusable design-system primitives
│   │   │   └── features/        # Cross-feature composed UI
│   │   ├── features/            # Feature-specific components, queries and state
│   │   │   ├── discovery/
│   │   │   ├── restaurants/
│   │   │   ├── search/
│   │   │   └── saves/
│   │   ├── lib/
│   │   │   ├── api/             # Transport, adapters and generated API types
│   │   │   ├── storage/         # Versioned browser persistence
│   │   │   └── utilities/
│   │   ├── mocks/               # Fictional, visibly labelled prototype content
│   │   ├── styles/               # Global styles and design tokens
│   │   └── types/                # Frontend-only domain and view-model types
│   └── tests/
│       ├── e2e/
│       └── fixtures/
└── docs/
```

Prefer feature ownership over generic folders such as `helpers/` or `common/`. A shared abstraction should exist only after at least two real consumers need it.

## Initial Routes

| Route | Purpose | Initial rendering |
| --- | --- | --- |
| `/` | Mobile discovery feed | Server-rendered shell with client-managed feed continuation |
| `/search` | Query, area, cuisine, price and dietary discovery | URL-driven server result with client filter controls |
| `/restaurants/[slug]` | Public restaurant details, dishes, Vibe Check and actions | Server-rendered public page |
| `/dishes/[slug]` | Public dish details and linked restaurant | Server-rendered public page |
| `/saved` | Device-local saved restaurants and dishes | Client-rendered from versioned local storage |

Filters and search intent belong in the URL whenever practical. Temporary presentation state, such as whether a sheet is open, stays local to the component.

## Rendering and Data Flow

```text
FastAPI or typed mock adapter
          ↓
Validated domain response
          ↓
Server Component or TanStack Query
          ↓
Feature component
          ↓
Reusable UI primitive
```

- Use Server Components by default.
- Add `use client` only at the smallest interaction boundary.
- Fetch public restaurant and dish data on the server for the initial render.
- Use TanStack Query for cursor pagination, background refresh, and client mutations.
- Do not call FastAPI directly from visual components. Components depend on domain functions exposed by `lib/api`.
- Keep FastAPI as the source of truth for restaurant, dish, review, and sentiment data.
- Do not duplicate backend business rules in Next.js route handlers or Server Actions.

## Mock-to-API Boundary

The first implementation uses fictional, clearly labelled demo content. Both mock and live implementations must satisfy the same frontend interface.

```text
DiscoveryDataSource
├── getFeed(input)
├── search(input)
├── getRestaurant(slug)
└── getDish(slug)
```

Rules:

- Use stable fictional IDs and slugs.
- Store media provenance in a separate manifest.
- Never attach synthetic reviews or ratings to real restaurants.
- Include representative empty, error, insufficient-data, long-text, missing-media, and slow-response fixtures.
- Generate TypeScript API types from the FastAPI OpenAPI document when endpoints exist.
- Add a contract check in CI once both clients are connected.

## Draft First-Slice API Contract

This is a coordination draft, not an implemented backend contract. Vansh and Satyam must review it before backend or frontend code depends on exact field names.

```text
GET /v1/feed?area={area}&cursor={cursor}&limit={limit}
GET /v1/search?q={query}&area={area}&cursor={cursor}
GET /v1/restaurants/{slug}
GET /v1/dishes/{slug}
```

Every paginated response should include `items` and `next_cursor`. Public entities should use stable IDs and slugs. Restaurant detail responses should distinguish factual data, demo data, and computed sentiment.

A Vibe Check response must include:

- positive-review percentage
- included review count
- calculation description
- data provenance
- an explicit insufficient-data state

Model confidence for one review must never be mapped to a restaurant rating.

## Design-System Rules

- Define colour, type, spacing, radius, elevation, motion, and layout values as named tokens.
- Use semantic tokens such as `surface`, `text-muted`, and `action-primary` instead of feature-specific colour names.
- Start with native HTML elements and enhance only where necessary.
- Keep touch targets at least 44 by 44 CSS pixels where practical.
- Respect reduced-motion, forced-colours, text zoom, and keyboard-only use.
- Support narrow mobile screens first, then tablet and desktop layouts.
- Never communicate sentiment, price, availability, or errors through colour alone.

## Accessibility Standard

Target WCAG 2.2 Level AA.

Required checks include:

- semantic landmarks and heading order
- visible and unobscured focus
- full keyboard operation
- accessible names and validation messages
- captions or equivalent text for meaningful video content
- pause and mute controls for automatically playing media
- contrast and non-colour indicators
- screen-reader announcements for asynchronous results and errors
- manual testing in addition to automated axe scans

## Performance Budgets

Measure production-like mobile conditions. At the 75th percentile, target:

- Largest Contentful Paint: 2.5 seconds or less
- Interaction to Next Paint: 200 milliseconds or less
- Cumulative Layout Shift: 0.1 or less

Additional budgets:

- Do not autoplay multiple videos simultaneously.
- Load only the active video and a small bounded preload window.
- Prefer poster images and adaptive video delivery.
- Lazy-load below-the-fold media and non-critical UI.
- Keep third-party scripts out of the critical path.
- Record bundle growth during reviews; every new dependency needs a clear product purpose.

## Security and Privacy

- Never expose secrets in `NEXT_PUBLIC_*` variables.
- Treat API, URL, local-storage, and media metadata as untrusted input.
- Allowlist external image and media origins.
- Add security headers and a Content Security Policy before public deployment.
- Request geolocation only after a user action and always provide manual area selection.
- Do not store precise location history.
- Do not render unsanitized user HTML.
- Keep dependency updates and vulnerability checks in the maintenance workflow.

## Testing Strategy

### Unit and component

- formatting and domain mapping
- Vibe Check states
- filter and save behaviour
- loading, empty, error and missing-media components
- keyboard and accessible-name behaviour

### End-to-end

- browse feed and open a restaurant
- search and apply filters
- save and remove an item
- open an external action safely
- recover from API failure
- navigate the critical journey with a keyboard
- run axe checks on stable page states

Tests should prefer user-visible roles, names, and outcomes over implementation details.

## Quality Gates

Every frontend pull request must pass:

- formatting
- linting
- strict TypeScript checking
- unit and component tests
- production build
- critical Playwright tests once the application shell exists
- automated accessibility checks once routes exist

Before a public release, also require manual keyboard, screen-reader, responsive, slow-network, reduced-motion, and real-device checks.

## Environments and Deployment

- Local development reads typed mock data by default until a backend environment is available.
- Environment variables select the API base URL; application code does not hard-code environments.
- Pull requests should eventually receive preview deployments.
- The production hosting provider is intentionally undecided.
- A PWA manifest may be added to establish installable metadata, but offline caching, push notifications, and service workers are later decisions.

## First Vertical Slice

The first implementation slice is complete when a user can:

1. open a responsive discovery feed populated with labelled demo data
2. move through feed items with touch, pointer, or keyboard
3. open a restaurant detail page
4. view factual details and a transparent demo Vibe Check
5. save or unsave the restaurant locally
6. encounter intentional loading, empty, and error states

It must also pass formatting, linting, type checking, component tests, a production build, and the initial accessibility smoke test.

## References

- [React: Creating a React App](https://react.dev/learn/creating-a-react-app)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js SPA guide](https://nextjs.org/docs/app/guides/single-page-applications)
- [TypeScript strict mode](https://www.typescriptlang.org/tsconfig/strict)
- [Radix accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing)
- [Core Web Vitals](https://web.dev/articles/vitals)

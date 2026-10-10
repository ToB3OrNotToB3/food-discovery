# Project State

Last updated: 11 October 2026

## Current Status

The project is under active development. The video feed now limits media loading to the visible clip and has explicit loading timeout, retry, and offline poster states.

Phase 0 product definition and Phase 1 frontend architecture are complete. A Python/FastAPI backend has been started and the reusable sentiment-analysis module is implemented. The Next.js frontend now has a responsive photo discovery prototype, a swipe/scroll vertical stock-video feed, and an initial component-test gate. The full discovery slice remains in progress.

## Completed

- Python project environment created.
- FastAPI and Uvicorn introduced for the backend.
- A sentiment-analysis model has been tested successfully.
- Individual review sentiment can be classified.
- Sentiment model loading and single-review prediction have been moved into the reusable `app/sentiment.py` module.
- A simple review aggregation prototype can calculate the percentage of positive reviews.
- Shared Codex collaboration instructions have been added through `AGENTS.md`.
- Phase 0 product definition, V1 boundaries, prototype-content policy, success metrics, and monetization direction have been documented in `docs/PRODUCT_BRIEF.md`.
- Developer ownership and the next frontend task have been recorded in `docs/TASKS.md`.
- The frontend foundation, structure, data flow, quality gates, and first vertical slice are defined in `docs/FRONTEND_ARCHITECTURE.md`.

## Current Implementation

The project currently contains:

- a Python backend foundation
- an `app/` directory
- request and response schemas for sentiment analysis
- a sentiment-analysis demo
- reusable model-loading and prediction functions in `app/sentiment.py`
- project dependencies in `requirements.txt`
- Git version control
- shared project documentation and Codex instructions

The reusable sentiment module loads DistilBERT on CPU and returns a positive or negative label with confidence for an individual review. The original demo still works with sample reviews and produces an aggregate positive-review percentage.

No working FastAPI routes exist yet. The frontend in `frontend/` supports cuisine, area, budget and vegetarian filters, token-based search, a device-local saved list, shareable restaurant pages, and explicitly synthetic Vibe Checks. Typed fictional data lives in `frontend/src/mocks/places.ts`; interaction code lives in `frontend/src/features/discovery/Discovery.tsx`. Photo sources and licence provenance are recorded in `frontend/MEDIA_MANIFEST.md`. `pnpm test` checks primary navigation, filtering, saving, and simulated video playback, sound, keyboard movement, and media failure.

## Current Work

- Developer 1 — Vansh: define and record the next backend or API task and coordinate the initial frontend API contract.
- Developer 2 — Satyam: complete the vertical video feed and remaining first-slice quality gates.

Active ownership is maintained in `docs/TASKS.md`.

## Incomplete / Not Yet Implemented

- Production video delivery and real-device validation of feed loading/error/offline fallback
- API-compatible mock adapter and URL-driven filters (current prototype uses local UI state)
- Agreed production API contract
- Working FastAPI routes
- Restaurant, dish, and review models
- Persistent database storage
- Real restaurant and review data integration
- Frontend-to-backend integration
- Authentication and authorization
- Production validation and error handling
- Broader automated component and accessibility coverage, browser E2E tests, and CI (the first component tests now exist)
- Observability and analytics
- Deployment setup

## Known Issues / Limitations

- Restaurant, dish, review, image, and video content is currently mock or not yet created.
- Sentiment aggregation is still a prototype rather than a complete application feature.
- Model confidence for a single review is not a restaurant rating.
- The frontend framework is decided; exact API response shapes still require coordination between both developers.
- Public review submission is outside the initial alpha scope.
- The stock-video feed at `/watch` scroll-snaps between full-screen clips, tracks the active clip from scroll position, and loads video only for that clip. Dosa and burger stream through the same-origin demo route; biryani uses a 1.25 MB local encode of the 52 MB source. It keeps poster, offline, retry, and loading-timeout states. Only the burger clip has an audio track; the other clips explicitly say “No audio.” Component tests simulate these transitions, but playback and touch gestures still need verification in target browsers. No live venue data, directions, or ordering is connected.

## Recommended Next Step

Recheck autoplay, swipe/scroll behavior, the burger clip's sound toggle, and fallback in target mobile browsers. Add the first browser/accessibility smoke check, then coordinate the draft API contract with Vansh before integrating real endpoints.

## Restaurant Page Milestone

- `/restaurants/[slug]` now provides a direct, refreshable page for each fictional place, with page metadata, sample menu pricing, and transparent synthetic Vibe Checks.
- Feed cards link to these pages. Shared save state uses `frontend/src/features/saves/useSavedPlaces.ts`, with validated versioned storage and a visit-only fallback when writes fail.
- Copy-link actions include a manual-copy fallback. Localhost links work only on the same computer until the app is deployed.
- Restaurant routes include loading, retry and missing-place screens. No real venue contact details, location claims, or ordering links are fabricated.

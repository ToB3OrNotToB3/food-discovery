# Project State

Last updated: 11 October 2026

## Product Stage

The project is currently in the early MVP / validation stage.

The immediate goal is to build a small but usable product, validate the core experience, and keep development manageable for a two-person team.

The long-term goal is to evolve the product into a full-scale startup with production web and mobile applications, real users, persistent data, deployment infrastructure, and scalable services where justified.

## Current Product Direction

The product is expected to eventually include:

- a web application
- a mobile application
- a shared backend/API
- restaurant and review functionality
- Vibe Check using both in-app reviews and external reviews in a later stage; external providers and integration are not yet selected or implemented
- ML/model-driven sentiment functionality
- persistent production data
- real user accounts
- production deployment

The current implementation should remain simpler than the long-term architecture.

## Product and Frontend Milestone

Phase 0 product definition is complete in `docs/PRODUCT_BRIEF.md`, including the Bangalore audience, V1 discovery journey, content policy, success metrics, and monetization direction. The initial alpha uses read-only synthetic reviews; public review submission is outside its scope.

Satyam completed Phase 1 frontend architecture in `docs/FRONTEND_ARCHITECTURE.md` and built a Next.js prototype with discovery filters, shareable fictional restaurant pages, local saving, and a vertical stock-video feed. Production discovery response shapes still require agreement with Vansh.

## Completed

- Python project environment created
- Git repository configured
- FastAPI backend introduced
- Uvicorn introduced for local serving
- sentiment-analysis model tested successfully
- individual review sentiment can be classified
- prototype positive-review percentage calculation created
- shared Codex collaboration instructions added
- shared project documentation added
- Phase 0 product definition completed
- reusable model loading and prediction implemented in `app/sentiment.py`
- `GET /health` and `POST /sentiment` implemented in `app/main.py`, with startup model loading and request/response validation
- Next.js frontend scaffolded in `frontend/` with fictional discovery content, restaurant pages, shared local saves, and a swipe/scroll video feed
- Video feed limited to the visible clip, with a 1.25 MB local biryani encode, offline poster messaging, loading timeout, retry, and component checks

## Current Implementation

The repository currently includes:

- a Python backend
- an `app/` directory
- a Next.js frontend in `frontend/`
- a sentiment-analysis prototype
- dependencies in `requirements.txt`
- Git version control
- shared Codex instructions
- shared development documentation

The reusable sentiment module loads DistilBERT on CPU. The API accepts review text and returns a label and confidence without persisting reviews. The original demo separately computes an aggregate positive-review percentage from sample data; restaurant-level aggregation is not exposed by the API.

On 29 September 2026, an in-process TestClient smoke check passed for health, real positive/negative model predictions, and rejection of blank, missing, and overlong input. No committed backend automated suite exists yet. The installed TestClient emitted an httpx deprecation warning; revisit its dependency when adding the test suite.

The frontend uses typed fictional data in `frontend/src/mocks/places.ts` and labels synthetic Vibe Checks. `/watch` plays allowlisted stock footage; dosa and burger stream through a same-origin demo route, while biryani uses an optimized local MP4. Only the active clip receives a video URL. `pnpm lint`, `pnpm typecheck`, `pnpm test` (9 component tests), and `pnpm build` passed on 11 October 2026. Browser and real-device playback checks remain open.

## Sentiment Training Learning Progress

`data/training_data.json` contains 30 AI-generated practice reviews: 10 each labelled POSITIVE, NEGATIVE, and NEUTRAL. `inspect_training_data.py` reads the UTF-8 JSON, rejects blank text and unsupported labels, and prints label counts. This small synthetic dataset is for learning, not evidence of real-world accuracy. The serving API still uses the original binary DistilBERT model; no custom model has been trained.

Vansh's next learning step is a reproducible, stratified training/test split (24/6) using scikit-learn. This split is not implemented yet. Keep the earlier challenging evaluation examples separate from training; a larger representative dataset and fresh held-out evaluation will be needed for meaningful quality claims.

## Developer Ownership

### Vansh — Developer 1
Working primarily on:
- backend
- APIs
- ML/model development
- backend service logic
- data/backend integration

### Satyam — Developer 2
Working primarily on:
- frontend
- web UI
- frontend/backend integration
- future mobile UI

## MVP Priorities

1. Finish the discovery slice and agree its API contract before live frontend/backend integration.
2. Make the backend API structure clean enough for frontend consumption.
3. Build the initial web experience.
4. Persist real data.
5. Connect sentiment functionality to real review data.
6. Validate the product before adding large-scale infrastructure.

## Not Yet Implemented / Finalized

- production database
- real restaurant/review data integration
- final authentication system
- production-ready API contracts
- complete frontend application and real-device feed validation
- mobile application
- deployment pipeline
- production hosting
- CI/CD
- monitoring and observability
- rate limiting
- full automated test coverage
- production security hardening
- analytics
- large-scale performance architecture

## Startup Scaling Principle

Do not overengineer for hypothetical scale.

Current priorities are:

- ship a usable MVP
- validate assumptions
- maintain clean interfaces
- keep the codebase understandable
- avoid choices that unnecessarily prevent future growth

Scale-oriented infrastructure should be introduced only when real usage or technical constraints justify it.

## Recommended Next Step

Verify autoplay, scrolling, sound, and fallback in target mobile browsers, then add an accessibility/browser smoke check. Agree the first discovery API contract between Satyam and Vansh before implementing dependent clients or endpoints. Vansh's separate model-learning next step is the reproducible 24/6 dataset split and focused API/model tests.

# Project State

Last updated: 29 September 2026

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
- ML/model-driven sentiment functionality
- persistent production data
- real user accounts
- production deployment

The current implementation should remain simpler than the long-term architecture.

## Product and Frontend Milestone

Phase 0 product definition is complete in `docs/PRODUCT_BRIEF.md`, including the Bangalore audience, V1 discovery journey, content policy, success metrics, and monetization direction. The initial alpha uses read-only synthetic reviews; public review submission is outside its scope.

Satyam is completing Phase 1 frontend architecture: technology choices, repository structure, API boundary, quality gates, and development workflow. No frontend framework or production discovery response shapes are finalized.

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

## Current Implementation

The repository currently includes:

- a Python backend
- an `app/` directory
- a sentiment-analysis prototype
- dependencies in `requirements.txt`
- Git version control
- shared Codex instructions
- shared development documentation

The reusable sentiment module loads DistilBERT on CPU. The API accepts review text and returns a label and confidence without persisting reviews. The original demo separately computes an aggregate positive-review percentage from sample data; restaurant-level aggregation is not exposed by the API.

On 29 September 2026, an in-process TestClient smoke check passed for health, real positive/negative model predictions, and rejection of blank, missing, and overlong input. No committed automated suite exists yet. The installed TestClient emitted an httpx deprecation warning; revisit its dependency when adding the test suite.

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

1. Implement the smallest discovery slice from the agreed Phase 0 product brief after coordinating its API contract.
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
- complete frontend application
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

Complete Phase 1 frontend architecture and agree the first discovery API contract between Satyam and Vansh before implementing dependent clients or endpoints. Use typed mock data consistent with that contract. Vansh should add focused API/model tests and plan the required restaurant/dish/review data structures; Satyam owns frontend architecture and implementation.

# Architecture

Last updated: 29 September 2026

Product scope and initial user journeys are defined in `docs/PRODUCT_BRIEF.md`.

## Architecture Philosophy

The product is currently in the MVP stage but is intended to grow into a full-scale startup.

The architecture should be:

- simple enough for a two-person team now
- modular enough to evolve later
- shared across web and mobile where practical
- production-aware without being prematurely complex

The current preference is a modular monolith with a shared backend API.

Microservices or distributed infrastructure should not be introduced unless there is a real operational or scaling reason.

## Target Product Shape

```text
                ┌─────────────────┐
                │     Web App     │
                └────────┬────────┘
                         │
                         │ HTTPS / API
                         │
                ┌────────▼────────┐
                │   Backend API   │
                │    FastAPI      │
                └────────┬────────┘
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
   Restaurant       Review/User      Sentiment
    Services          Services         Service
                                         │
                                         ▼
                                      ML Model
                         │
                         ▼
                      Database

                ┌─────────────────┐
                │   Mobile App    │
                └────────┬────────┘
                         │
                         └──────► same backend API
```

The web and mobile clients should use the same backend services and API contracts wherever practical.

## Current MVP Architecture

```text
Server startup -> load DistilBERT analyzer into app.state
POST /sentiment -> Pydantic validation -> loaded analyzer -> label/confidence JSON
GET /health -> {"status": "ok"}
Server shutdown -> remove the application's analyzer reference
```

The analyzer is loaded once per server process, including after development reloads. Each request reuses it. Inference runs in a synchronous endpoint. Review data is not persisted. Aggregate positive-review percentage currently exists only in the standalone demo, not the API.

## Current Implementation State

- `app/sentiment.py`: CPU model loading and prediction functions.
- `app/schemas.py`: review text and prediction validation.
- `app/main.py`: lifespan management, health, and sentiment endpoints.
- Restaurant, dish, database, authentication, and frontend integration remain unimplemented.

## Web Client

Satyam (Developer 2) owns frontend product and implementation work unless reassigned in `docs/TASKS.md`.

Phase 1 architecture is in progress. No frontend framework has been committed yet. Before implementation, Phase 1 must document:

- framework and language choices
- frontend repository structure
- routing and rendering strategy
- state and data-fetching approach
- API client and error contract
- mock-data strategy and transition to live APIs
- accessibility, performance, security, testing, and observability gates
- local development, CI, preview, and deployment workflow

The frontend must initially support typed mock data that matches the agreed FastAPI response shapes. Shared response shapes must be coordinated with Vansh (Developer 1) before either side changes them.

Primary responsibilities:

- restaurant discovery UI
- restaurant details
- review display
- sentiment display
- account-related UI
- communication with backend APIs

The web client should avoid owning core business logic that belongs in the backend.

## Mobile Client

Status: planned, not yet an MVP blocker unless priorities change.

The mobile app should consume the same backend API as the web app where practical.

Core business rules should remain centralized in shared backend services.

Mobile framework is not yet finalized.

## Backend

### Current Technology

- Python
- FastAPI
- Uvicorn

### Responsibilities

- API endpoints
- business logic
- restaurant data
- review data
- user/account logic
- authentication/authorization integration
- sentiment analysis integration
- aggregation of sentiment results
- database access
- external service integration where required

For the MVP, these can live in one deployable backend application with clear internal modules.

## API Layer

The backend API is intended to be shared by web and mobile clients.

Aim for:

- clear request/response schemas
- consistent error handling
- input validation
- backward compatibility once real clients depend on endpoints

Avoid client-specific API duplication unless there is a strong reason.

## API Boundary

The production API contract is not yet defined. Phase 1 must agree on the first vertical-slice contract before frontend or backend implementation depends on it.

At minimum, the contract should define:

- stable request and response schemas
- identifiers, timestamps, pagination, filtering, and sorting
- validation and error response shape
- loading, empty, partial, and failure states
- sentiment percentage, review count, provenance, and insufficient-data behavior
- versioning and compatibility expectations

Model confidence for one review must not be exposed as a restaurant rating.

The existing `/sentiment` endpoint is a development inference interface, not the agreed restaurant/discovery contract or a public review-submission feature. Public review submission remains outside the initial alpha.

## Sentiment / ML Layer

The current prototype classifies individual reviews as positive or negative.

Aggregate sentiment is currently:

```text
positive reviews / total reviews × 100
```

During the MVP stage, the model can remain integrated with the backend if operationally simplest.

Separate model-serving infrastructure should be considered only if justified by load, latency, model size, scaling, or independent deployment needs.

## Data Layer

Status: database not yet finalized.

The MVP database should prioritize:

- reliability
- simple operations
- straightforward migrations
- support for the core data model

Document later:

- selected database
- main entities/tables
- relationships
- migration strategy
- backup expectations

## Authentication

Status: not finalized.

When selected, document:

- authentication provider or implementation
- session/token approach
- authorization model
- account lifecycle
- web/mobile compatibility

## Environments

Long-term, distinguish at least:

- local development
- production

Add staging when deployment frequency and product risk justify it.

Environment-specific configuration should use environment variables or equivalent configuration rather than hard-coded values.

## Deployment

MVP goal:

- simple, reliable deployment
- minimal operational burden
- easy redeployment
- secrets stored outside source control

Later, as needed:

- CI/CD
- staging
- monitoring
- automated migrations
- autoscaling
- more advanced infrastructure

## Observability

MVP:
- useful application logs
- useful error reporting

Later:
- structured logging
- metrics
- tracing
- uptime monitoring
- alerting
- product analytics

## Scalability Strategy

Preferred sequence:

1. build the MVP
2. observe real bottlenecks
3. optimize database/API
4. add caching/background jobs where needed
5. scale individual components
6. consider service decomposition only when justified

## Repository Structure

```text
food-discovery/
├── app/
├── sentiment_demo.py
├── requirements.txt
├── README.md
├── AGENTS.md
└── docs/
    ├── PROJECT_STATE.md
    ├── TASKS.md
    ├── ARCHITECTURE.md
    └── DECISIONS.md
```


## Source-of-Truth Rules

- `docs/PRODUCT_BRIEF.md` defines product scope, users, journeys, boundaries, and success.
- `docs/TASKS.md` defines active ownership.
- `docs/PROJECT_STATE.md` records the current implementation state and next step.
- `docs/DECISIONS.md` records accepted technical decisions.
- Working code takes precedence when documentation becomes stale; update the documentation in the same focused change whenever possible.

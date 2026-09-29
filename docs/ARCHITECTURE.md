# Architecture

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
Sample review data
       ↓
Python / FastAPI backend
       ↓
Sentiment model
       ↓
Positive / negative classification
       ↓
Aggregate sentiment calculation
```

## Web Client

Status: early / not finalized.

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

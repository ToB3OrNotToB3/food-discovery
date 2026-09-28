# Architecture

Last updated: 28 September 2026

## Overview

The project is a food-discovery application with a Python/FastAPI backend and an ML sentiment-analysis component. Product scope and initial user journeys are defined in `docs/PRODUCT_BRIEF.md`.

The technical architecture is still evolving. The frontend framework, database, authentication provider, deployment platform, and production API contract have not yet been decided.

## Current High-Level Flow

```text
Review data
    ↓
Python / FastAPI backend
    ↓
Sentiment model
    ↓
Positive / negative classification
    ↓
Aggregate positive-review percentage
    ↓
Transparent Vibe Check response
```

## Backend

### Current Technologies

- Python
- FastAPI
- Uvicorn
- Hugging Face Transformers
- DistilBERT sentiment model

### Current Responsibilities

The backend is expected to handle:

- API endpoints
- restaurant and dish data
- review data
- sentiment inference and aggregation
- validation and error responses
- authentication and authorization if required
- persistence once a database is selected

### Current Implementation State

- `app/sentiment.py` loads the sentiment model and classifies individual review text.
- `app/schemas.py` defines sentiment request and response schemas.
- `app/main.py` is still a placeholder; no working API routes exist yet.
- Restaurant, dish, review, database, and authentication layers are not implemented.

## Frontend

Satyam (Developer 2) owns frontend product and implementation work unless reassigned in `docs/TASKS.md`.

The initial frontend architecture is defined in `docs/FRONTEND_ARCHITECTURE.md`. The accepted foundation uses Next.js App Router, strict TypeScript, pnpm, Tailwind CSS design tokens, and accessible native or Radix-based primitives.

The frontend must initially support typed mock data that matches the agreed FastAPI response shapes. Shared response shapes must be coordinated with Vansh (Developer 1) before either side changes them.

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

## Repository Structure

```text
app/
    __init__.py
    main.py
    schemas.py
    sentiment.py
docs/
    ARCHITECTURE.md
    DECISIONS.md
    FRONTEND_ARCHITECTURE.md
    PRODUCT_BRIEF.md
    PROJECT_STATE.md
    TASKS.md
AGENTS.md
README.md
requirements.txt
sentiment_demo.py
```

A `frontend/` directory will be added when the application foundation is scaffolded.

## Source-of-Truth Rules

- `docs/PRODUCT_BRIEF.md` defines product scope, users, journeys, boundaries, and success.
- `docs/TASKS.md` defines active ownership.
- `docs/PROJECT_STATE.md` records the current implementation state and next step.
- `docs/DECISIONS.md` records accepted technical decisions.
- Working code takes precedence when documentation becomes stale; update the documentation in the same focused change whenever possible.

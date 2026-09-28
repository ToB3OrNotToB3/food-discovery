# Tasks

This file tracks active work so both developers and both Codex instances know who is working on what.

## In Progress

### Developer 1 — Vansh

- [ ] Define and record the next backend or API task before implementation.
- [ ] Coordinate the initial frontend API contract with Satyam before changing shared response shapes.

### Developer 2 — Satyam

- [ ] Scaffold the frontend foundation and implement the first vertical discovery slice defined in `docs/FRONTEND_ARCHITECTURE.md`.

## Todo

- [ ] Organize the FastAPI backend into a clear production structure.
- [ ] Define restaurant data model.
- [ ] Define review data model.
- [ ] Create restaurant API endpoints.
- [ ] Create review API endpoints.
- [ ] Connect review data to sentiment analysis.
- [ ] Replace sample reviews with real stored/retrieved reviews.
- [ ] Decide on a database.
- [ ] Connect frontend to backend.
- [ ] Add validation and error handling.
- [ ] Add tests.
- [ ] Add authentication if required.
- [ ] Prepare deployment configuration.

## Completed

- [x] Initialize Python project.
- [x] Set up Git repository.
- [x] Test sentiment-analysis model.
- [x] Calculate positive-review percentage from sample reviews.
- [x] Add shared `AGENTS.md` instructions for Codex collaboration.
- [x] Complete Phase 0 product definition in `docs/PRODUCT_BRIEF.md`.
- [x] Define Phase 1 frontend architecture, technology choices, API boundary, and quality gates.

## Task Ownership Rule

Before starting substantial work, assign the task to one developer in the `In Progress` section.

When a task is finished:

1. move it to `Completed`
2. update `PROJECT_STATE.md`
3. record any major technical decision in `DECISIONS.md`

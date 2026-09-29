# Tasks

This file tracks active work, developer ownership, and startup-stage priorities.

## In Progress

### Vansh — Developer 1

Primary responsibility:
- backend
- APIs
- ML/model development

Current tasks:
- [ ] Organize the FastAPI backend into a maintainable MVP structure.
- [ ] Define the first stable API contracts needed by the frontend.
- [ ] Build and improve the sentiment/model pipeline.
- [ ] Define restaurant data model.
- [ ] Define review data model.
- [ ] Create restaurant API endpoints.
- [ ] Create review API endpoints.
- [ ] Connect review data to sentiment analysis.
- [ ] Add backend validation and useful error handling.
- [ ] Add focused backend/model tests for critical flows.

### Satyam — Developer 2

Primary responsibility:
- frontend
- web UI
- future mobile UI

Current tasks:
- [ ] Define the initial web app structure.
- [ ] Build the first core user flow.
- [ ] Create restaurant listing UI.
- [ ] Create restaurant details UI.
- [ ] Display review and sentiment information.
- [ ] Connect frontend components to backend APIs.
- [ ] Add loading, empty, and error states.
- [ ] Keep frontend structure reusable enough for future product growth.

## MVP Todo

- [ ] Agree on the first end-to-end MVP user journey.
- [ ] Replace sample reviews with real stored/retrieved reviews.
- [ ] Select a production-suitable but simple database.
- [ ] Connect frontend and backend end-to-end.
- [ ] Add basic user authentication if required by the MVP.
- [ ] Add integration tests for critical flows.
- [ ] Prepare a simple deployment setup.
- [ ] Deploy the first usable web MVP.
- [ ] Collect real user feedback.

## Later / Post-MVP

These should not block the first usable release unless genuinely required:

- [ ] Mobile application.
- [ ] CI/CD automation.
- [ ] Centralized monitoring and observability.
- [ ] Rate limiting.
- [ ] Advanced analytics.
- [ ] Background job infrastructure.
- [ ] Caching layer.
- [ ] High-scale architecture.
- [ ] Service decomposition / microservices, if justified.
- [ ] Advanced recommendation/personalization systems.
- [ ] Production-scale model serving, if justified by traffic.

## Completed

- [x] Initialize Python project.
- [x] Set up Git repository.
- [x] Test sentiment-analysis model.
- [x] Calculate positive-review percentage from sample reviews.
- [x] Add shared `AGENTS.md` instructions.
- [x] Add shared project documentation.
- [x] Assign developer ownership.

## Task Ownership Rule

Vansh owns backend, model, and API work.

Satyam owns frontend work and will own mobile UI work when mobile development begins.

If a task affects both areas, coordinate before making overlapping changes.

When a task is finished:

1. move it to `Completed`
2. update `PROJECT_STATE.md`
3. update `ARCHITECTURE.md` if system structure changed
4. record major technical decisions in `DECISIONS.md`

## Startup Priority Rule

Do not allow long-term scale work to block MVP delivery unless there is a clear near-term requirement.

Prefer:

- small validated steps
- clean boundaries
- simple deployment
- maintainable code

over premature infrastructure complexity.

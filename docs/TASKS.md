# Tasks

This file tracks active work so both developers and both Codex instances know who is working on what.

## In Progress

### Developer 1 — Vansh

- [ ] Define and record the next backend or API task before implementation.
- [ ] Coordinate the initial frontend API contract with Satyam before changing shared response shapes.

### Developer 2 — Satyam

- [ ] Complete the first vertical discovery slice: verify autoplay and swiping on real mobile browsers, optimize video delivery, add API adapter and feed loading/error states, and automate accessibility/component checks.

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

- [x] Replace button-driven clip navigation with a full-screen swipe/scroll feed and muted autoplay for the visible clip.

- [x] Add an illustrative vertical video preview with controlled playback, accessible controls, poster fallback, local saving, linked restaurant details, and media provenance.

- [x] Add shareable restaurant routes, shared persistent saving, copy-link fallback, and restaurant loading/error/not-found screens.

- [x] Scaffold the Next.js frontend and build a responsive photo discovery prototype with typed demo data, functioning filters, persistent local saves, detail dialogs, and synthetic Vibe Checks.

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

# Technical and Product Decisions

This file records important technical, architectural, and product-direction decisions.

Do not record minor implementation details here.

---

## 2026-09-28 — Startup Product Direction

### Decision

The project will start as a small MVP but is intended to evolve into a full-scale startup product.

### Implication

Development should prioritize:

- rapid validation
- maintainable code
- simple architecture
- clear interfaces
- production-aware decisions

Avoid both disposable prototype hacks and premature large-scale infrastructure.

---

## 2026-09-28 — Web and Mobile Product

### Decision

The long-term product will support both web and mobile applications.

### Implication

Where practical, both clients should consume the same backend API and share the same core business logic.

The web app is expected to be developed before the mobile app unless priorities change.

---

## 2026-09-28 — MVP-First Architecture

### Decision

Use the simplest architecture that supports the MVP while preserving reasonable future evolution.

### Current Direction

Prefer a modular monolith over microservices during the early stage.

### Reason

The team is small and the product has not yet reached a scale where distributed infrastructure is justified.

### Revisit When

Consider service separation only if real requirements appear, such as:

- independent scaling needs
- deployment isolation
- significant team growth
- operational bottlenecks
- model-serving constraints

---

## 2026-09-28 — Shared Backend API

### Decision

The web and future mobile clients should use the same backend API wherever practical.

### Reason

This reduces duplicated business logic and creates a consistent product backend.

---

## 2026-09-27 — Backend Framework

### Decision

Use FastAPI for the Python backend.

### Reason

The project is Python-based and includes ML functionality, and FastAPI provides a suitable API layer for application and ML features.

---

## 2026-09-27 — Sentiment Representation

### Decision

The current sentiment prototype represents sentiment as the percentage of reviews classified as positive.

### Example

```text
3 positive reviews
2 negative reviews

Positive sentiment = 60%
```

### Note

This is the current prototype behavior and can be revised if product requirements change.

---

## 2026-09-27 — Shared Codex Context

### Decision

Use Git-tracked project documentation as the shared context layer between both developers' Codex instances.

### Files

- `AGENTS.md`
- `docs/PROJECT_STATE.md`
- `docs/TASKS.md`
- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`

### Reason

Codex chat histories on separate computers should not be treated as shared project memory.

---

## 2026-09-28 — Developer Ownership

### Decision

Vansh owns:

- backend
- APIs
- ML/model work

Satyam owns:

- frontend
- web UI
- future mobile UI

### Reason

Clear ownership reduces conflicting changes and helps both Codex instances understand responsibilities.

---

## Decisions Still To Be Made

Record these when finalized:

- web frontend framework
- mobile framework
- database
- authentication approach
- hosting/deployment provider
- production model-serving approach
- analytics stack
- monitoring/error-reporting tools
- CI/CD strategy
- external restaurant/data providers

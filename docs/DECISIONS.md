# Technical Decisions

This file records important technical and architectural decisions.

Do not record minor implementation details here.

---

## 2026-09-27 — Backend Framework

### Decision

Use FastAPI for the Python backend.

### Reason

The project is Python-based and includes ML functionality, so FastAPI provides a convenient way to expose application and ML features through APIs.

---

## 2026-09-27 — Sentiment Representation

### Decision

The current sentiment prototype represents restaurant/review sentiment as the percentage of reviews classified as positive.

### Example

```text
3 positive reviews
2 negative reviews

Positive sentiment = 60%
```

### Note

This is the current prototype behavior and can be revised later if product requirements change.

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

Codex chat histories on separate computers should not be treated as shared project memory. Important context should live in the repository.

---

## Future Decisions

Add entries here when making important choices such as:

- database selection
- frontend framework
- authentication method
- external APIs/services
- deployment platform
- major API contract changes
- significant architecture changes

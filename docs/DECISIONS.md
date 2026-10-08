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

## 2026-09-28 — Frontend Foundation

### Decision

Build the frontend in a new `frontend/` directory using Next.js App Router, TypeScript with strict checking, pnpm, Tailwind CSS with design tokens, and accessible native or Radix-based UI primitives.

Use server rendering by default for public pages and add client-side data management only where the infinite feed, search, or mutations require it. FastAPI remains the backend source of truth.

### Reason

The product needs fast public restaurant pages, app-like navigation, an interactive mobile feed, and a typed boundary that can move from demo content to FastAPI without rewriting presentation components.

### Constraints

- Do not duplicate backend business logic in Next.js.
- Do not add global state or major dependencies without a concrete requirement.
- Target WCAG 2.2 AA and the Core Web Vitals "good" thresholds.
- Keep the hosting provider and authentication solution undecided until their requirements are known.

### Detail

See `docs/FRONTEND_ARCHITECTURE.md`.

---

## 2026-10-08 — Demo Video Delivery

### Decision

Stream the allowlisted Pexels demo clips through a same-origin Next.js route that forwards byte-range requests. Keep this route limited to prototype media; production video hosting remains undecided.

### Reason

The direct external video sources failed in the app browser. Same-origin delivery lets the feed request playable video ranges without adding large stock files to Git.

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

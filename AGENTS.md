# AGENTS.md

## Project Context

This repository is being developed collaboratively by two developers using OpenAI Codex on separate computers.

Codex conversation histories are not shared. The repository and its documentation are the shared source of truth.

This product is intended to start as a small MVP, validate the idea, and ship quickly. The long-term goal is to become a full-scale startup with production web and mobile applications, real users, persistent data, and scalable infrastructure when justified.

Do not overengineer the MVP, but do not make short-term choices that unnecessarily block future growth.

## Developer Ownership

### Vansh — Developer 1
Primary ownership:
- backend
- APIs
- ML/model development
- backend service logic
- data/backend integration

### Satyam — Developer 2
Primary ownership:
- frontend
- web UI
- future mobile UI
- frontend/backend integration

## Shared Context

Before substantial work, inspect when relevant:

- `README.md`
- `docs/PROJECT_STATE.md`
- `docs/TASKS.md`
- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`

Do not assume information from previous Codex conversations exists unless it is written into the repository.

## MVP Principles

During the early stage:

- optimize for learning, validation, speed, and maintainability
- keep the architecture simple and modular
- prefer a modular monolith over microservices
- use one shared backend API for web and mobile where practical
- do not add queues, caches, orchestration, or distributed infrastructure only for hypothetical scale
- avoid disposable prototype hacks that create expensive future rewrites
- document deliberate shortcuts that may need revisiting

## Production Awareness

Even during the MVP stage, consider:

- security
- authentication and authorization
- input validation
- error handling
- secrets management
- environment configuration
- API consistency
- data integrity
- logging
- testing
- maintainability
- deployment impact

As the product grows, also consider:

- scalability
- monitoring and observability
- rate limiting
- performance
- background jobs
- backups and recovery
- CI/CD
- backward compatibility
- analytics

Do not add production complexity before it is needed, but do not ignore production concerns entirely.

## Before Making Changes

1. Inspect the relevant existing code.
2. Read `docs/PROJECT_STATE.md`.
3. Read `docs/TASKS.md`.
4. Read `docs/DECISIONS.md` before architectural or technology changes.
5. Avoid modifying another developer's active work unless necessary.
6. Prefer extending existing patterns over introducing new structures without a clear reason.

## During Development

- Keep changes focused on the requested task.
- Do not rewrite unrelated working code.
- Do not silently change architecture, APIs, database structure, or major dependencies.
- If a requested change conflicts with a documented decision, point out the conflict.
- Inspect code rather than guessing.
- Keep core business logic in shared backend services rather than duplicating it across clients.

## After Substantial Changes

Update shared documentation when relevant.

### Update `docs/PROJECT_STATE.md`
Record:
- what was implemented
- important files or modules changed
- current implementation status
- known issues or limitations
- MVP impact
- recommended next step

### Update `docs/TASKS.md`
Record:
- completed tasks
- newly discovered tasks
- current task ownership

### Update `docs/ARCHITECTURE.md`
Update when:
- a major component is added
- data flow changes
- web/mobile/backend boundaries change
- deployment architecture changes
- an external service becomes part of the system

### Update `docs/DECISIONS.md`
Record:
- framework, database, service, or hosting choices
- significant API contract changes
- major architectural decisions
- reversed decisions
- deliberate MVP shortcuts that may need revisiting

## Git and Collaboration Rules

- Treat Git as the synchronization layer between both developers.
- Do not overwrite or remove another developer's work without a clear reason.
- Prefer small, focused commits.
- Prefer separate branches for substantial features.
- Check whether the local branch is behind the shared branch before large changes.
- Never commit secrets, API keys, passwords, tokens, `.env` contents, or credentials.

## Handoff Principle

At the end of substantial work, leave the repository so another developer opening a brand-new Codex conversation can understand:

1. what changed
2. the current product state
3. what is MVP-only versus intended long-term
4. important decisions
5. known problems
6. what should happen next

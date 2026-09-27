# AGENTS.md

## Project Collaboration Context

This repository is being developed collaboratively by two developers using OpenAI Codex on separate computers.

Codex conversation histories are not shared between the two developers. Therefore, the repository itself is the shared source of truth for project context.

Do not assume that information from a previous Codex conversation is available unless it has been written into the repository.

## Shared Project Context

Before substantial work, inspect these files when relevant:

- `README.md` — project overview and setup
- `docs/PROJECT_STATE.md` — current implementation state and recent progress
- `docs/TASKS.md` — active tasks and task ownership
- `docs/ARCHITECTURE.md` — current system architecture
- `docs/DECISIONS.md` — important technical and architectural decisions

If one of these files does not exist yet, do not invent its contents.

## Before Making Changes

Before modifying code:

1. Inspect the relevant existing code first.
2. Read `docs/PROJECT_STATE.md` to understand the current state.
3. Read `docs/TASKS.md` to check what each developer is currently working on.
4. Read `docs/DECISIONS.md` before making architectural or technology changes.
5. Avoid modifying files that are actively being worked on by the other developer unless necessary.
6. Prefer extending existing patterns over introducing a completely new structure without reason.

## During Development

- Keep changes focused on the requested task.
- Do not rewrite unrelated working code.
- Do not silently change architecture, APIs, database structure, or major dependencies.
- If a requested change conflicts with an existing documented decision, point out the conflict before proceeding.
- Preserve compatibility with the existing project unless the task explicitly requires a breaking change.
- When uncertain about how an existing component works, inspect the code rather than guessing.

## After Substantial Changes

After completing substantial work, update the shared project documentation when relevant.

### Update `docs/PROJECT_STATE.md` with:

- what was implemented
- important files or modules changed
- current implementation status
- known issues or limitations
- recommended next step

### Update `docs/TASKS.md` with:

- completed tasks
- newly discovered tasks
- current task ownership

### Update `docs/DECISIONS.md` when:

- a new framework, library, service, or database is chosen
- an API contract changes significantly
- a major architectural decision is made
- an earlier technical decision is reversed

Do not add trivial implementation details to `DECISIONS.md`.

## Git and Collaboration Rules

- Treat Git as the synchronization layer between both developers.
- Do not overwrite or remove another developer's work without a clear reason.
- Prefer small, focused commits.
- Prefer separate branches for substantial features.
- Before large changes, check whether the local branch is behind the shared branch.
- If merge conflicts or overlapping work are likely, identify them instead of blindly resolving them.
- Do not commit secrets, API keys, passwords, tokens, `.env` contents, or other credentials.

## Documentation Rules

Keep shared documentation concise and useful.

Do not turn `PROJECT_STATE.md` into a chronological diary.

Good project-state documentation should answer:

- What works right now?
- What is being worked on?
- What changed recently?
- What is broken or incomplete?
- What should happen next?

The repository and the actual code take precedence if documentation becomes outdated. If code and documentation disagree, inspect the implementation and update the documentation.

## Handoff Principle

At the end of substantial work, leave the repository in a state where another developer opening a brand-new Codex conversation can understand:

1. what changed,
2. the current state of the project,
3. any important decisions,
4. known problems,
5. what should happen next.

The goal is for both Codex instances to share project knowledge through Git-tracked files rather than relying on shared chat history.

# Food Discovery

A food discovery product in the early MVP stage, developed while learning machine learning, MLOps, and backend architecture. The goal is to validate a usable web experience first, with a future mobile app sharing the same backend API.

## App idea

A short-form restaurant video feed with review sentiment (Vibe Check), dish tagging, personalized recommendations, and ordering links.

## Current progress

- Working local sentiment demo using Hugging Face DistilBERT on CPU.
- Demo calculates the percentage of positive predictions across five sample reviews.
- Pydantic request and response schemas with whitespace trimming and validation.
- Reusable sentiment model-loading and prediction functions, with a standalone example.
- A basic FastAPI application with `GET /health`, returning `{"status": "ok"}`.
- Sentiment is not yet connected to an API endpoint. The health endpoint only checks that the API responds; it does not check the model.

## Structure

- `sentiment_demo.py`: runnable sentiment experiment.
- `app/schemas.py`: review request and prediction response validation.
- `app/sentiment.py`: loads the sentiment pipeline and predicts a review's label and confidence; includes a standalone example.
- `app/main.py`: FastAPI application with the health endpoint.
- `app/__init__.py`: Python package marker.
- `docs/`: shared project state, tasks, architecture, and decisions.
- `AGENTS.md`: development and collaboration instructions.

## Run the demo (Windows PowerShell)

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe sentiment_demo.py
```

The first run downloads the pretrained model. Dependencies are not yet fully pinned.

If your `.venv` already exists, reuse it rather than creating it again. Run commands from the repository root.

## Run the reusable sentiment example

```powershell
.\.venv\Scripts\python.exe -m app.sentiment
```

This loads the analyzer, analyzes one sample review, and prints a dictionary containing `label` and `confidence`. The example runs only when the module is started directly, not when its functions are imported.

## Run the local API

```powershell
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

Open http://127.0.0.1:8000/health to receive:

```json
{"status": "ok"}
```

Interactive API documentation is available at http://127.0.0.1:8000/docs. Keep the server running while using these URLs. `--reload` is for local development.

## Model and validation

Model: `distilbert/distilbert-base-uncased-finetuned-sst-2-english`.

Model confidence for a single review is different from the percentage of reviews classified as positive. The sample Vibe Check is a learning example, not a validated restaurant rating.

The request schema strips surrounding whitespace and requires 1–2,000 characters. The response schema requires a string label and confidence between 0 and 1. These schemas are defined but are not yet wired into an API route. The prediction function truncates model input to 512 tokens, which is separate from the character limit.

## Scope and collaboration

The current implementation uses sample reviews. Persistent storage, restaurant/review endpoints, authentication, frontend integration, and deployment are not yet implemented. Video feeds, dish recognition, recommendations, and ordering links remain planned features.

Vansh owns backend, APIs, and ML work. Satyam owns frontend and future mobile UI work. The architecture direction is a modular monolith with a shared backend API; add infrastructure when concrete requirements justify it.

See [project state](docs/PROJECT_STATE.md), [tasks](docs/TASKS.md), [architecture](docs/ARCHITECTURE.md), and [decisions](docs/DECISIONS.md) for shared context.

## Next learning step

Connect the existing sentiment functions and schemas to `POST /sentiment`, loading the analyzer once during application startup. Verify valid predictions and rejected blank input. Coordinate this backend milestone with the team's first end-to-end MVP user flow.

# Food Discovery

A learning project exploring machine learning, MLOps, and backend architecture for a food discovery app.

## App idea

A short-form restaurant video feed with review sentiment (Vibe Check), dish tagging, personalized recommendations, and ordering links.

## Project documentation

- [`docs/PRODUCT_BRIEF.md`](docs/PRODUCT_BRIEF.md): product vision, initial market, V1 scope, and success definition.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): current technical architecture and system boundaries.
- [`docs/PROJECT_STATE.md`](docs/PROJECT_STATE.md): what works now, known limitations, and the recommended next step.
- [`docs/TASKS.md`](docs/TASKS.md): active work and developer ownership.

## Current progress

- Working local sentiment demo using Hugging Face DistilBERT on CPU.
- Demo calculates the percentage of positive predictions across five sample reviews.
- Reusable sentiment module loads the model and returns a label with confidence for a review.
- Pydantic request and response schemas with whitespace trimming and validation.
- Backend folder structure created. API routes and model-serving integration are next; the API is not runnable yet.

## Structure

- `sentiment_demo.py`: runnable sentiment experiment.
- `app/schemas.py`: review request and prediction response validation.
- `app/sentiment.py`: model loading and reusable sentiment prediction functions.
- `app/main.py`: placeholder for the FastAPI application.
- `app/__init__.py`: Python package marker.

## Run the demo (Windows PowerShell)

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe sentiment_demo.py
```

The first run downloads the pretrained model. Dependencies are not yet fully pinned.

Model: `distilbert/distilbert-base-uncased-finetuned-sst-2-english`.

Model confidence for a single review is different from the percentage of reviews classified as positive. The sample Vibe Check is a learning example, not a validated restaurant rating.

## Next learning step

Connect the schemas and sentiment module to a FastAPI endpoint.

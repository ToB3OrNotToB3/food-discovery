from contextlib import asynccontextmanager

from fastapi import FastAPI, Request

from app.schemas import SentimentRequest, SentimentResponse
from app.sentiment import load_sentiment_model, predict_sentiment


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.analyzer = load_sentiment_model()

    yield

    del app.state.analyzer


app = FastAPI(
    title="Food Discovery API",
    lifespan=lifespan,
)


@app.get("/health")
def health():
    return {"status": "ok"}
    
@app.post("/sentiment", response_model=SentimentResponse)
def analyze_sentiment(
    payload: SentimentRequest,
    request: Request,
):
    analyzer = request.app.state.analyzer

    return predict_sentiment(analyzer, payload.text)

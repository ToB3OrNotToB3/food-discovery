from transformers import pipeline


MODEL_ID = "distilbert/distilbert-base-uncased-finetuned-sst-2-english"


def load_sentiment_model():
    return pipeline(
        task="sentiment-analysis",
        model=MODEL_ID,
        device=-1,
    )


def predict_sentiment(analyzer, text: str) -> dict:
    result = analyzer(
        text,
        truncation=True,
        max_length=512,
    )[0]

    return {
        "label": result["label"],
        "confidence": float(result["score"]),
    }


if __name__ == "__main__":
    analyzer = load_sentiment_model()
    prediction = predict_sentiment(analyzer, "The food was amazing!")
    print(prediction)
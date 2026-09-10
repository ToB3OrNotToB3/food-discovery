from transformers import pipeline

sentiment_analyzer = pipeline(
    task="sentiment-analysis",
    model="distilbert/distilbert-base-uncased-finetuned-sst-2-english",
    device=-1,
)


def analyze_review(review):
    results = sentiment_analyzer(review)
    return results[0]


prediction = analyze_review("The biryani was delicious!")

reviews = [
    "The biryani was delicious!",
    "The staff were friendly and helpful.",
    "The food was cold and tasted terrible.",
    "Amazing food. I would definitely come back!",
    "The service was awful.",
]

positive_count = 0

for review in reviews:
    prediction = analyze_review(review)

    print(review)
    print("Sentiment:", prediction["label"])
    print()

    if prediction["label"] == "POSITIVE":
        positive_count += 1

total_reviews = len(reviews)
positive_percentage = (positive_count / total_reviews) * 100

print(f"Vibe Check: {positive_percentage:.1f}% positive")
print(f"Based on {total_reviews} sample reviews")
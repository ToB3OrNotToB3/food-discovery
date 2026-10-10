import json
from collections import Counter
from pathlib import Path


data_path = Path(__file__).parent / "data" / "training_data.json"

with data_path.open(encoding="utf-8") as file:
    reviews = json.load(file)

allowed_labels = {"POSITIVE", "NEGATIVE", "NEUTRAL"}

for index, review in enumerate(reviews, start=1):
    if not review["text"].strip():
        raise ValueError(f"Review {index} has empty text.")

    if review["label"] not in allowed_labels:
        raise ValueError(f"Review {index} has an invalid label.")

print("All reviews passed validation.")

label_counts = Counter(review["label"] for review in reviews)

print("Total reviews:", len(reviews))
print("Reviews per label:", dict(label_counts))
print("First review:", reviews[0])

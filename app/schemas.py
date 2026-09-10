from pydantic import BaseModel, ConfigDict, Field


class SentimentRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    text: str = Field(min_length=1, max_length=2000)


class SentimentResponse(BaseModel):
    label: str
    confidence: float = Field(ge=0, le=1)
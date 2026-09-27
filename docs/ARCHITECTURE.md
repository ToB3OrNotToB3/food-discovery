# Architecture

## Overview

The project is currently a Python-based application with a FastAPI backend and an ML sentiment-analysis component.

The architecture is still evolving.

## Current High-Level Flow

```text
Review data
    ↓
Python / FastAPI backend
    ↓
Sentiment model
    ↓
Positive / negative classification
    ↓
Aggregate sentiment calculation
    ↓
Sentiment percentage
```

## Backend

### Current Technologies

- Python
- FastAPI
- Uvicorn

### Current Responsibilities

The backend is expected to handle:

- API endpoints
- restaurant data
- review data
- sentiment analysis
- aggregation of sentiment results
- communication with the frontend

## Sentiment Analysis

The current prototype classifies individual reviews as positive or negative.

The aggregate sentiment score is currently interpreted as:

```text
positive reviews / total reviews × 100
```

Example:

```text
3 positive reviews
2 negative reviews

Positive sentiment = 60%
```

## Data Layer

A persistent database has not yet been finalized.

When a database is chosen, document:

- database technology
- main entities/tables
- relationships
- how the backend accesses the database

## Frontend

Frontend architecture has not yet been documented here.

When frontend development is added, document:

- framework
- major components
- API communication
- state-management approach if used

## Repository Structure

Current important items include:

```text
food-discovery/
├── app/
├── sentiment_demo.py
├── requirements.txt
├── README.md
├── AGENTS.md
└── docs/
    ├── PROJECT_STATE.md
    ├── TASKS.md
    ├── ARCHITECTURE.md
    └── DECISIONS.md
```

Update this file whenever the system structure changes substantially.

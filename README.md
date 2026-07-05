# Smart Loan Approval Predictor

Smart Loan Approval Predictor is a solo full-stack machine learning project that predicts whether a loan application is likely to be approved or rejected.

The project is built as three independent services in one repository:

```txt
loan-predictor/
├── ml-service/     # Python, FastAPI, scikit-learn, XGBoost
├── backend/        # Node.js, Express, JWT auth, database logic
├── frontend/       # React user interface
└── README.md
```

## Project Goal

The goal of this project is to demonstrate a complete production-style flow:

1. Train a real machine learning model.
2. Serve the model through a Python FastAPI microservice.
3. Build a Node.js/Express backend that handles authentication and business logic.
4. Build a React frontend for users to submit loan applications and view prediction history.

This is not an LLM wrapper project. The prediction system is based on a self-trained machine learning pipeline.

## Architecture

```txt
React Frontend
     |
     v
Node.js / Express Backend
     |
     | calls ML service over HTTP
     v
FastAPI ML Service
     |
     v
Trained ML Model Pipeline
```

The ML service is responsible only for model inference. The backend will be responsible for authentication, request validation, database storage, and prediction history.

## Current Status

### Completed

- Created the Python ML service
- Loaded and inspected the loan prediction dataset
- Built preprocessing for missing values, categorical encoding, and numerical scaling
- Trained and compared Logistic Regression, Random Forest, and XGBoost models
- Selected the best model using ROC-AUC
- Saved the final model pipeline with joblib
- Built a FastAPI service with:
  - `GET /`
  - `GET /health`
  - `GET /model-info`
  - `POST /predict`
- Added local documentation for the ML service

### In Progress

- Backend API setup with Node.js and Express

### Planned

- JWT authentication
- Database schema for users and predictions
- Protected prediction endpoint in the backend
- React frontend with login, prediction form, result page, and history dashboard

## Services

### ML Service

The ML service lives inside:

```txt
ml-service/
```

See the detailed ML service documentation here:

```txt
ml-service/README.md
```

Run the ML service:

```powershell
cd ml-service
.\venv\Scripts\python.exe -m uvicorn main:app --reload
```

API docs:

```txt
http://127.0.0.1:8000/docs
```

### Backend

The backend will live inside:

```txt
backend/
```

It will expose endpoints such as:

```txt
POST /api/auth/register
POST /api/auth/login
POST /api/predict
GET /api/predictions
```

### Frontend

The frontend will live inside:

```txt
frontend/
```

It will provide the user interface for registration, login, loan prediction, and prediction history.

## Tech Stack

### Machine Learning Service

- Python
- FastAPI
- pandas
- scikit-learn
- XGBoost
- joblib

### Backend

- Node.js
- Express
- JWT
- bcrypt
- MySQL or MongoDB

### Frontend

- React
- React Router
- Tailwind CSS
- Recharts

## Development Roadmap

1. Build and test the ML service independently.
2. Build the backend API with authentication and database storage.
3. Connect the backend to the ML service.
4. Build the React frontend.
5. Polish, document, and deploy the full system.

## Notes

The raw dataset is not committed to Git. Anyone cloning the repository must download the dataset separately and place it inside:

```txt
ml-service/data/raw/loan_prediction.csv
```

The saved model artifacts are generated locally after running the training script.
# Smart Loan Approval Predictor

Smart Loan Approval Predictor is a solo full-stack machine learning project that predicts whether a loan application is likely to be approved or rejected.

The project is built as three independent services in one repository:

```txt
loan-predictor/
├── ml-service/     # Python, FastAPI, scikit-learn, XGBoost
├── backend/        # Node.js, Express, JWT auth, MySQL
├── frontend/       # React, Vite, React Router
└── README.md
```

## Project Goal

The goal of this project is to demonstrate a complete production-style flow:

1. Train a real machine learning model.
2. Serve the model through a Python FastAPI microservice.
3. Build a Node.js/Express backend that handles authentication, database storage, and business logic.
4. Build a React frontend where users can register, log in, submit loan applications, and view prediction history.

This is not an LLM wrapper project. The prediction system is based on a self-trained machine learning pipeline.

## Architecture

```txt
React Frontend
     |
     | HTTP requests
     v
Node.js / Express Backend
     |
     | authenticated ML request + prediction logging
     v
FastAPI ML Service
     |
     v
Trained ML Model Pipeline
```

The frontend never talks directly to the ML service. It talks to the Express backend.

The backend handles authentication, protected routes, database storage, and communication with the ML service.

The ML service handles model loading and prediction only.

## Current Status

### Completed

- Python FastAPI ML service
- Dataset loading and inspection scripts
- Missing-value preprocessing
- One-hot encoding for categorical features
- Numerical scaling
- Logistic Regression baseline
- Model comparison with Logistic Regression, Random Forest, and XGBoost
- Best model selection using ROC-AUC
- Saved model pipeline with joblib
- FastAPI endpoints:
  - `GET /`
  - `GET /health`
  - `GET /model-info`
  - `POST /predict`
- Express backend with:
  - MySQL connection
  - User registration
  - User login
  - JWT authentication middleware
  - Protected current-user route
  - Protected prediction endpoint
  - Protected prediction history endpoint
  - Request validation
  - Central error handling
- React frontend with:
  - Routing
  - Shared layout and navigation
  - Register page
  - Login page
  - Auth storage helper
  - Protected frontend routes
  - Loan prediction form
  - Prediction result display
  - Prediction history page
  - Not Found page

## Tech Stack

### ML Service

- Python
- FastAPI
- pandas
- scikit-learn
- XGBoost
- joblib
- Uvicorn

### Backend

- Node.js
- Express
- MySQL
- mysql2
- bcryptjs
- JSON Web Token
- Axios
- express-validator
- CORS

### Frontend

- React
- Vite
- React Router
- CSS

## Environment Variables

Each service has its own local environment setup.

### Backend `.env`

Create this file:

```txt
backend/.env
```

Example:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_actual_mysql_password
DB_NAME=loan_predictor

JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=1d

ML_SERVICE_URL=http://127.0.0.1:8000
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env`

Create this file:

```txt
frontend/.env
```

Example:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Environment files are intentionally ignored by Git.

## Dataset Setup

The ML service expects the classic Kaggle-style Loan Prediction dataset.

Place the training CSV here:

```txt
ml-service/data/raw/loan_prediction.csv
```

The expected target column is:

```txt
Loan_Status
```

The raw dataset is ignored by Git and should not be committed.

## Database Setup

Create the MySQL database manually:

```sql
CREATE DATABASE IF NOT EXISTS loan_predictor;
```

Then from the backend folder, create the required tables:

```powershell
cd backend
npm run db:create-users
npm run db:create-predictions
```

## Running the Project Locally

Open three terminals.

### Terminal 1: Start the ML Service

```powershell
cd ml-service
.\venv\Scripts\python.exe -m uvicorn main:app --reload
```

ML service runs at:

```txt
http://127.0.0.1:8000
```

FastAPI docs:

```txt
http://127.0.0.1:8000/docs
```

### Terminal 2: Start the Backend

```powershell
cd backend
npm run dev
```

Backend runs at:

```txt
http://localhost:5000
```

Health check:

```txt
http://localhost:5000/health
```

### Terminal 3: Start the Frontend

```powershell
cd frontend
npm run dev
```

Frontend runs at:

```txt
http://localhost:5173
```

## Main User Flow

1. Open the frontend.
2. Register a new account.
3. Log in.
4. Submit a loan application from the prediction page.
5. View the prediction result.
6. Open the history page to view saved predictions.

## API Summary

### ML Service

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | Check ML service status |
| GET | `/model-info` | View selected model and metrics |
| POST | `/predict` | Get raw ML prediction |

### Backend

| Method | Endpoint | Purpose | Protected |
|---|---|---|---|
| GET | `/health` | Check backend status | No |
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| POST | `/api/predict` | Submit loan prediction | Yes |
| GET | `/api/predictions` | Get prediction history | Yes |

## Service Documentation

Detailed service-specific documentation:

```txt
ml-service/README.md
backend/README.md
frontend/README.md
```

## Notes

The saved ML model is a complete pipeline. It includes preprocessing and the selected classifier, so raw applicant data can be passed directly during prediction.

The backend stores prediction history in MySQL and associates each prediction with the logged-in user.

The frontend uses JWT-based authentication and stores the token locally for protected requests.
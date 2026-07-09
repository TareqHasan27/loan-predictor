# Smart Loan Approval Predictor - Backend

This is the Node.js/Express backend for the Smart Loan Approval Predictor project.

The backend handles user authentication, JWT-protected routes, MySQL database access, prediction history storage, and communication with the Python FastAPI ML service.

## Current Features

- Express server with clean route/controller/model structure
- MySQL database connection using `mysql2`
- User registration with bcrypt password hashing
- User login with JWT token generation
- Protected route middleware using JWT
- Prediction storage in MySQL
- Backend-to-ML-service communication using Axios
- Protected loan prediction endpoint
- Protected prediction history endpoint
- Central 404 and error-handling middleware
- Request validation for prediction payloads using `express-validator`

## Folder Structure

```txt
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── auth.controller.js
│   ├── health.controller.js
│   └── prediction.controller.js
├── middleware/
│   ├── errorHandler.js
│   ├── notFound.js
│   ├── validateRequest.js
│   └── verifyToken.js
├── models/
│   ├── Prediction.js
│   └── User.js
├── routes/
│   ├── auth.routes.js
│   ├── health.routes.js
│   ├── prediction.routes.js
│   └── predictionHistory.routes.js
├── scripts/
│   ├── createUsersTable.js
│   ├── createPredictionsTable.js
│   ├── testUserModel.js
│   ├── testPredictionModel.js
│   └── testMlService.js
├── services/
│   └── mlService.js
├── validators/
│   └── prediction.validator.js
├── .env.example
├── package.json
├── server.js
└── README.md
```

## Setup

Install dependencies:

```powershell
npm install
```

Create a local `.env` file inside the `backend/` folder:

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
```

The `.env` file is ignored by Git. Do not commit real database passwords or JWT secrets.

## Database Setup

Create the database manually in MySQL:

```sql
CREATE DATABASE IF NOT EXISTS loan_predictor;
```

Create the `users` table:

```powershell
npm run db:create-users
```

Create the `predictions` table:

```powershell
npm run db:create-predictions
```

## Run the Backend

```powershell
npm run dev
```

The backend runs at:

```txt
http://localhost:5000
```

Health check:

```http
GET /health
```

Expected response:

```json
{
  "status": "ok",
  "service": "backend"
}
```

## API Endpoints

### Register User

```http
POST /api/auth/register
```

Postman body:

```json
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "Password123"
}
```

Expected response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "testuser@example.com"
  }
}
```

### Login User

```http
POST /api/auth/login
```

Postman body:

```json
{
  "email": "testuser@example.com",
  "password": "Password123"
}
```

Expected response:

```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "testuser@example.com"
  }
}
```

Use the returned token for protected routes.

### Get Current User

```http
GET /api/auth/me
```

Postman headers:

```txt
Authorization: Bearer YOUR_TOKEN_HERE
```

Expected response:

```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "testuser@example.com",
    "created_at": "..."
  }
}
```

### Create Loan Prediction

The ML service must be running before this endpoint is tested.

Start the ML service from the `ml-service/` folder:

```powershell
.\venv\Scripts\python.exe -m uvicorn main:app --reload
```

Then call the backend endpoint:

```http
POST /api/predict
```

Postman headers:

```txt
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE
```

Postman body:

```json
{
  "gender": "Male",
  "married": "Yes",
  "dependents": "0",
  "education": "Graduate",
  "self_employed": "No",
  "applicant_income": 5849,
  "coapplicant_income": 0,
  "loan_amount": 128,
  "loan_amount_term": 360,
  "credit_history": 1,
  "property_area": "Urban"
}
```

Expected response:

```json
{
  "success": true,
  "message": "Prediction completed successfully",
  "result": {
    "prediction": "Approved",
    "prediction_class": 1,
    "confidence": 0.8421,
    "probability_rejected": 0.1579,
    "probability_approved": 0.8421
  },
  "saved_prediction": {
    "id": 1,
    "user_id": 1,
    "input_data": {
      "gender": "Male",
      "married": "Yes",
      "dependents": "0",
      "education": "Graduate",
      "self_employed": "No",
      "applicant_income": 5849,
      "coapplicant_income": 0,
      "loan_amount": 128,
      "loan_amount_term": 360,
      "credit_history": 1,
      "property_area": "Urban"
    },
    "prediction": "Approved",
    "confidence": 0.8421
  }
}
```

Exact prediction values may differ depending on the selected ML model.

### Get Prediction History

```http
GET /api/predictions
```

Postman headers:

```txt
Authorization: Bearer YOUR_TOKEN_HERE
```

Expected response:

```json
{
  "success": true,
  "count": 1,
  "predictions": [
    {
      "id": 1,
      "user_id": 1,
      "input_data": {
        "gender": "Male",
        "married": "Yes",
        "dependents": "0",
        "education": "Graduate",
        "self_employed": "No",
        "applicant_income": 5849,
        "coapplicant_income": 0,
        "loan_amount": 128,
        "loan_amount_term": 360,
        "credit_history": 1,
        "property_area": "Urban"
      },
      "prediction": "Approved",
      "confidence": 0.8421,
      "created_at": "..."
    }
  ]
}
```

## Useful Test Scripts

Test the User model:

```powershell
npm run test:user-model
```

Test the Prediction model:

```powershell
npm run test:prediction-model
```

Test backend-to-ML-service communication:

```powershell
npm run test:ml-service
```

## Notes

The backend does not train or run the ML model directly. It calls the FastAPI ML service over HTTP.

The backend stores prediction history in MySQL so each logged-in user can later view their own previous predictions.
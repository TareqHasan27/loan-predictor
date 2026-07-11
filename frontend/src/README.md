# Smart Loan Approval Predictor - Frontend

This is the React frontend for the Smart Loan Approval Predictor project.

The frontend provides the user interface for registration, login, loan prediction, and prediction history. It communicates with the Node.js/Express backend API.

## Current Features

- React app created with Vite
- Client-side routing with React Router
- Shared layout and navigation bar
- Register form connected to the backend
- Login form connected to the backend
- JWT token and user data stored in localStorage
- Navbar login/logout status
- Protected frontend routes for prediction and history pages
- Loan prediction form connected to the protected backend endpoint
- Prediction result display
- Prediction history page connected to the backend
- Not Found page for unknown routes

## Folder Structure

```txt
frontend/
├── src/
│   ├── api/
│   │   ├── authApi.js
│   │   └── predictionApi.js
│   ├── components/
│   │   ├── AppLayout.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── PredictPage.jsx
│   │   ├── HistoryPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── utils/
│   │   └── authStorage.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── .env.example
├── package.json
└── README.md
```

## Setup

Install dependencies:

```powershell
npm install
```

Create a local `.env` file inside the `frontend/` folder:

```env
VITE_API_BASE_URL=http://localhost:5000
```

The `.env` file is ignored by Git. The committed `.env.example` file shows the required variable.

## Run the Frontend

```powershell
npm run dev
```

The frontend runs at:

```txt
http://localhost:5173
```

## Required Services

For registration, login, prediction, and history to work, the backend must be running:

```powershell
cd ../backend
npm run dev
```

For loan prediction to work, the ML service must also be running:

```powershell
cd ../ml-service
.\venv\Scripts\python.exe -m uvicorn main:app --reload
```

## Routes

### Home

```txt
/
```

Landing page for the project.

### Register

```txt
/register
```

Creates a new user account by calling:

```http
POST /api/auth/register
```

### Login

```txt
/login
```

Authenticates a user by calling:

```http
POST /api/auth/login
```

On successful login, the frontend stores the JWT token and user object in `localStorage`.

### Predict

```txt
/predict
```

Protected route. Requires login.

Submits loan application data to:

```http
POST /api/predict
```

The request includes the saved JWT token in the `Authorization` header.

### History

```txt
/history
```

Protected route. Requires login.

Fetches the logged-in user's prediction history from:

```http
GET /api/predictions
```

### Not Found

Any unknown route shows a custom 404 page.

Example:

```txt
/random-page
```

## Manual Test Flow

1. Start the backend.
2. Start the frontend.
3. Open:

```txt
http://localhost:5173/register
```

4. Register a user.
5. Go to:

```txt
http://localhost:5173/login
```

6. Log in with the registered account.
7. Confirm the navbar shows the logged-in user's email.
8. Go to:

```txt
http://localhost:5173/predict
```

9. Start the ML service if it is not already running.
10. Submit a loan prediction form.
11. Confirm the prediction result appears.
12. Go to:

```txt
http://localhost:5173/history
```

13. Confirm the saved prediction appears in the history list.

## Sample Prediction Input

```txt
Gender: Male
Married: Yes
Dependents: 0
Education: Graduate
Self employed: No
Applicant income: 5849
Coapplicant income: 0
Loan amount: 128
Loan amount term: 360
Credit history: 1
Property area: Urban
```

## Notes

The frontend does not talk directly to the FastAPI ML service. It only talks to the Express backend.

The backend is responsible for authentication, saving prediction history, and calling the ML service.
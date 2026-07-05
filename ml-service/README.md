# Smart Loan Approval Predictor - ML Service

This is the Python ML microservice for the Smart Loan Approval Predictor project.

It trains and serves a loan approval prediction model using FastAPI, scikit-learn, and XGBoost. The service is designed to run independently before being connected to the Node.js backend.

## Current Features

- Loads the loan prediction dataset from a local CSV file
- Performs basic dataset inspection
- Handles missing values
- Encodes categorical features with one-hot encoding
- Scales numerical features
- Trains and compares multiple models:
  - Logistic Regression
  - Random Forest
  - XGBoost
- Selects the best model using ROC-AUC
- Saves the trained model pipeline with joblib
- Serves predictions through a FastAPI `/predict` endpoint
- Exposes model metrics through `/model-info`

## Folder Structure

```txt
ml-service/
├── data/
│   └── raw/
│       ├── .gitkeep
│       └── loan_prediction.csv        # local only, not committed
├── model/
│   ├── .gitkeep
│   ├── loan_approval_model.joblib     # generated after training
│   └── model_metrics.json             # generated after training
├── scripts/
│   ├── inspect_dataset.py
│   ├── eda_feature_summary.py
│   ├── test_data_loader.py
│   ├── test_missing_value_preprocessor.py
│   ├── test_full_preprocessor.py
│   ├── test_train_split.py
│   ├── train_logistic_regression_baseline.py
│   ├── compare_models.py
│   ├── train_best_model.py
│   ├── test_saved_model_prediction.py
│   ├── test_predictor_module.py
│   └── test_schemas.py
├── src/
│   ├── data_loader.py
│   ├── preprocessing.py
│   ├── predictor.py
│   ├── schemas.py
│   └── model_info.py
├── main.py
├── requirements.txt
└── README.md
```

## Setup

Create a virtual environment:

```powershell
python -m venv venv
```

Activate it on Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

If activation causes issues, use the local Python directly:

```powershell
.\venv\Scripts\python.exe -m pip install -r requirements.txt
```

## Dataset Setup

This service expects the classic Kaggle-style Loan Prediction dataset.

Download the dataset and place the training CSV here:

```txt
ml-service/data/raw/loan_prediction.csv
```

If the downloaded file has a name such as:

```txt
train_u6lujuX_CVtuZ9i.csv
```

rename it to:

```txt
loan_prediction.csv
```

The expected target column is:

```txt
Loan_Status
```

The expected feature columns are:

```txt
Gender
Married
Dependents
Education
Self_Employed
ApplicantIncome
CoapplicantIncome
LoanAmount
Loan_Amount_Term
Credit_History
Property_Area
```

The raw dataset is intentionally ignored by Git and should not be committed.

## Inspect the Dataset

Run the basic dataset inspection script:

```powershell
.\venv\Scripts\python.exe -m scripts.inspect_dataset
```

Run the feature summary script:

```powershell
.\venv\Scripts\python.exe -m scripts.eda_feature_summary
```

These scripts verify the dataset shape, column names, missing values, target distribution, and feature types.

## Test the Data Pipeline

Test the reusable dataset loader:

```powershell
.\venv\Scripts\python.exe -m scripts.test_data_loader
```

Test missing-value preprocessing:

```powershell
.\venv\Scripts\python.exe -m scripts.test_missing_value_preprocessor
```

Test the full preprocessing pipeline:

```powershell
.\venv\Scripts\python.exe -m scripts.test_full_preprocessor
```

Test the stratified train/test split:

```powershell
.\venv\Scripts\python.exe -m scripts.test_train_split
```

## Train Models

Train a Logistic Regression baseline:

```powershell
.\venv\Scripts\python.exe -m scripts.train_logistic_regression_baseline
```

Compare Logistic Regression, Random Forest, and XGBoost:

```powershell
.\venv\Scripts\python.exe -m scripts.compare_models
```

Train all candidate models, select the best model using ROC-AUC, and save the final model pipeline:

```powershell
.\venv\Scripts\python.exe -m scripts.train_best_model
```

This creates:

```txt
model/loan_approval_model.joblib
model/model_metrics.json
```

## Test Saved Model Inference

After training, verify that the saved model can be loaded and used for prediction:

```powershell
.\venv\Scripts\python.exe -m scripts.test_saved_model_prediction
```

Test the reusable predictor module:

```powershell
.\venv\Scripts\python.exe -m scripts.test_predictor_module
```

Test the Pydantic request and response schemas:

```powershell
.\venv\Scripts\python.exe -m scripts.test_schemas
```

## Run the FastAPI Service

Start the service:

```powershell
.\venv\Scripts\python.exe -m uvicorn main:app --reload
```

The service runs at:

```txt
http://127.0.0.1:8000
```

Interactive API documentation is available at:

```txt
http://127.0.0.1:8000/docs
```

## Available Endpoints

### Root

```http
GET /
```

Example response:

```json
{
  "message": "Smart Loan Approval Predictor ML service is running"
}
```

### Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "ok",
  "service": "ml-service"
}
```

### Model Info

```http
GET /model-info
```

Returns the selected model, selection metric, and evaluation results.

### Predict Loan Approval

```http
POST /predict
```

Example request:

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

Example response:

```json
{
  "prediction": "Approved",
  "prediction_class": 1,
  "confidence": 0.8421,
  "probability_rejected": 0.1579,
  "probability_approved": 0.8421
}
```

Exact probability values may differ depending on the selected best model.

## Notes

The saved model is a complete scikit-learn pipeline. It includes both preprocessing and the selected classifier. This means raw applicant data can be passed directly to the pipeline during prediction.

The dataset file is kept local and ignored by Git. Anyone cloning the repository must download the dataset separately and place it in the expected path.
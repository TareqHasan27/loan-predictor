from functools import lru_cache
from pathlib import Path

import joblib
import pandas as pd


MODEL_PATH = Path(__file__).resolve().parents[1] / "model" / "loan_approval_model.joblib"

REQUIRED_FEATURES = [
    "Gender",
    "Married",
    "Dependents",
    "Education",
    "Self_Employed",
    "ApplicantIncome",
    "CoapplicantIncome",
    "LoanAmount",
    "Loan_Amount_Term",
    "Credit_History",
    "Property_Area",
]


@lru_cache(maxsize=1)
def load_model():
    if not MODEL_PATH.exists():
        raise FileNotFoundError(
            f"Saved model not found at {MODEL_PATH}. "
            "Run scripts.train_best_model first."
        )

    return joblib.load(MODEL_PATH)


def validate_applicant_data(applicant_data):
    missing_features = [
        feature for feature in REQUIRED_FEATURES if feature not in applicant_data
    ]

    if missing_features:
        raise ValueError(f"Missing required features: {missing_features}")


def predict_loan_approval(applicant_data):
    validate_applicant_data(applicant_data)

    model_pipeline = load_model()

    applicant_df = pd.DataFrame([applicant_data])

    prediction = model_pipeline.predict(applicant_df)[0]
    prediction_proba = model_pipeline.predict_proba(applicant_df)[0]

    probability_rejected = float(prediction_proba[0])
    probability_approved = float(prediction_proba[1])

    prediction_label = "Approved" if prediction == 1 else "Rejected"
    confidence = probability_approved if prediction == 1 else probability_rejected

    return {
        "prediction": prediction_label,
        "prediction_class": int(prediction),
        "confidence": round(float(confidence), 4),
        "probability_rejected": round(probability_rejected, 4),
        "probability_approved": round(probability_approved, 4),
    }
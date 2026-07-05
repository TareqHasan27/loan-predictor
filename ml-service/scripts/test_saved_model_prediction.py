from pathlib import Path

import joblib
import pandas as pd


MODEL_PATH = Path("model/loan_approval_model.joblib")


def main():
    if not MODEL_PATH.exists():
        print("Saved model was not found.")
        print(f"Expected model path: {MODEL_PATH}")
        print("Run this first:")
        print(r".\venv\Scripts\python.exe -m scripts.train_best_model")
        return

    model_pipeline = joblib.load(MODEL_PATH)

    sample_applicant = {
        "Gender": "Male",
        "Married": "Yes",
        "Dependents": "0",
        "Education": "Graduate",
        "Self_Employed": "No",
        "ApplicantIncome": 5849,
        "CoapplicantIncome": 0.0,
        "LoanAmount": 128.0,
        "Loan_Amount_Term": 360.0,
        "Credit_History": 1.0,
        "Property_Area": "Urban",
    }

    sample_df = pd.DataFrame([sample_applicant])

    prediction = model_pipeline.predict(sample_df)[0]
    prediction_proba = model_pipeline.predict_proba(sample_df)[0]

    probability_rejected = prediction_proba[0]
    probability_approved = prediction_proba[1]

    predicted_label = "Approved" if prediction == 1 else "Rejected"
    confidence = probability_approved if prediction == 1 else probability_rejected

    print("Saved model loaded successfully.")
    print("\nSample applicant:")
    print(sample_df)

    print("\nPrediction result:")
    print(f"Predicted class: {predicted_label}")
    print(f"Confidence: {confidence:.4f}")
    print(f"Probability rejected: {probability_rejected:.4f}")
    print(f"Probability approved: {probability_approved:.4f}")


if __name__ == "__main__":
    main()
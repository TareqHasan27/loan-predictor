from src.predictor import predict_loan_approval


def main():
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

    result = predict_loan_approval(sample_applicant)

    print("Predictor module works successfully.")
    print("\nPrediction result:")
    print(result)


if __name__ == "__main__":
    main()
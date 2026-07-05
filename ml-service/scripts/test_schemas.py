from pydantic import ValidationError

from src.schemas import LoanApplicationRequest, LoanPredictionResponse


def main():
    valid_payload = {
        "gender": "Male",
        "married": "Yes",
        "dependents": "0",
        "education": "Graduate",
        "self_employed": "No",
        "applicant_income": 5849,
        "coapplicant_income": 0.0,
        "loan_amount": 128.0,
        "loan_amount_term": 360.0,
        "credit_history": 1,
        "property_area": "Urban",
    }

    application = LoanApplicationRequest(**valid_payload)

    print("Valid request schema works.")
    print("\nParsed request:")
    print(application)

    print("\nConverted model input:")
    print(application.to_model_input())

    response = LoanPredictionResponse(
        prediction="Approved",
        prediction_class=1,
        confidence=0.8421,
        probability_rejected=0.1579,
        probability_approved=0.8421,
    )

    print("\nResponse schema works.")
    print(response)

    invalid_payload = valid_payload.copy()
    invalid_payload["loan_amount"] = -50

    try:
        LoanApplicationRequest(**invalid_payload)
    except ValidationError as error:
        print("\nInvalid request correctly failed validation.")
        print(error.errors()[0])


if __name__ == "__main__":
    main()
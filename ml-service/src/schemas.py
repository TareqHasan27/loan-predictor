from typing import Literal

from pydantic import BaseModel, Field


class LoanApplicationRequest(BaseModel):
    gender: Literal["Male", "Female"]
    married: Literal["Yes", "No"]
    dependents: Literal["0", "1", "2", "3+"]
    education: Literal["Graduate", "Not Graduate"]
    self_employed: Literal["Yes", "No"]

    applicant_income: float = Field(..., ge=0)
    coapplicant_income: float = Field(..., ge=0)
    loan_amount: float = Field(..., gt=0)
    loan_amount_term: float = Field(..., gt=0)
    credit_history: int = Field(..., ge=0, le=1)

    property_area: Literal["Urban", "Semiurban", "Rural"]

    def to_model_input(self):
        return {
            "Gender": self.gender,
            "Married": self.married,
            "Dependents": self.dependents,
            "Education": self.education,
            "Self_Employed": self.self_employed,
            "ApplicantIncome": self.applicant_income,
            "CoapplicantIncome": self.coapplicant_income,
            "LoanAmount": self.loan_amount,
            "Loan_Amount_Term": self.loan_amount_term,
            "Credit_History": self.credit_history,
            "Property_Area": self.property_area,
        }


class LoanPredictionResponse(BaseModel):
    prediction: Literal["Approved", "Rejected"]
    prediction_class: int
    confidence: float
    probability_rejected: float
    probability_approved: float
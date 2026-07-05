from fastapi import FastAPI, HTTPException

from src.predictor import predict_loan_approval
from src.schemas import LoanApplicationRequest, LoanPredictionResponse


app = FastAPI(
    title="Smart Loan Approval Predictor - ML Service",
    description="Standalone ML microservice for loan approval prediction.",
    version="0.1.0",
)


@app.get("/")
def root():
    return {
        "message": "Smart Loan Approval Predictor ML service is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "ml-service"
    }


@app.post("/predict", response_model=LoanPredictionResponse)
def predict(application: LoanApplicationRequest):
    try:
        model_input = application.to_model_input()
        prediction_result = predict_loan_approval(model_input)

        return prediction_result

    except FileNotFoundError as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        )
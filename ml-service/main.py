from fastapi import FastAPI


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
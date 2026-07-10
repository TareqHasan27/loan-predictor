import { useState } from "react";

import { createLoanPrediction } from "../api/predictionApi";

const initialFormData = {
  gender: "Male",
  married: "Yes",
  dependents: "0",
  education: "Graduate",
  self_employed: "No",
  applicant_income: "",
  coapplicant_income: "",
  loan_amount: "",
  loan_amount_term: "360",
  credit_history: "1",
  property_area: "Urban",
};

function PredictPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const buildPayload = () => {
    return {
      ...formData,
      applicant_income: Number(formData.applicant_income),
      coapplicant_income: Number(formData.coapplicant_income),
      loan_amount: Number(formData.loan_amount),
      loan_amount_term: Number(formData.loan_amount_term),
      credit_history: Number(formData.credit_history),
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setPredictionResult(null);
    setErrorMessage("");

    try {
      const payload = buildPayload();
      const data = await createLoanPrediction(payload);

      setPredictionResult(data.result);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="wide-form-card">
        <p className="eyebrow">Prediction</p>
        <h1>Loan Prediction</h1>

        <p className="form-intro">
          Enter applicant details to predict whether the loan is likely to be
          approved or rejected.
        </p>

        {errorMessage && (
          <div className="alert alert-error">{errorMessage}</div>
        )}

        {predictionResult && (
          <div className="prediction-result-card">
            <p className="result-label">Prediction result</p>
            <h2>{predictionResult.prediction}</h2>

            <div className="result-grid">
              <div>
                <span>Confidence</span>
                <strong>{predictionResult.confidence}</strong>
              </div>

              <div>
                <span>Approved probability</span>
                <strong>{predictionResult.probability_approved}</strong>
              </div>

              <div>
                <span>Rejected probability</span>
                <strong>{predictionResult.probability_rejected}</strong>
              </div>
            </div>
          </div>
        )}

        <form className="prediction-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="married">Married</label>
              <select
                id="married"
                name="married"
                value={formData.married}
                onChange={handleChange}
                required
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dependents">Dependents</label>
              <select
                id="dependents"
                name="dependents"
                value={formData.dependents}
                onChange={handleChange}
                required
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3+">3+</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="education">Education</label>
              <select
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
              >
                <option value="Graduate">Graduate</option>
                <option value="Not Graduate">Not Graduate</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="self_employed">Self employed</label>
              <select
                id="self_employed"
                name="self_employed"
                value={formData.self_employed}
                onChange={handleChange}
                required
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="property_area">Property area</label>
              <select
                id="property_area"
                name="property_area"
                value={formData.property_area}
                onChange={handleChange}
                required
              >
                <option value="Urban">Urban</option>
                <option value="Semiurban">Semiurban</option>
                <option value="Rural">Rural</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="applicant_income">Applicant income</label>
              <input
                id="applicant_income"
                name="applicant_income"
                type="number"
                min="0"
                value={formData.applicant_income}
                onChange={handleChange}
                placeholder="5849"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="coapplicant_income">Coapplicant income</label>
              <input
                id="coapplicant_income"
                name="coapplicant_income"
                type="number"
                min="0"
                value={formData.coapplicant_income}
                onChange={handleChange}
                placeholder="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="loan_amount">Loan amount</label>
              <input
                id="loan_amount"
                name="loan_amount"
                type="number"
                min="1"
                value={formData.loan_amount}
                onChange={handleChange}
                placeholder="128"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="loan_amount_term">Loan amount term</label>
              <input
                id="loan_amount_term"
                name="loan_amount_term"
                type="number"
                min="1"
                value={formData.loan_amount_term}
                onChange={handleChange}
                placeholder="360"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="credit_history">Credit history</label>
              <select
                id="credit_history"
                name="credit_history"
                value={formData.credit_history}
                onChange={handleChange}
                required
              >
                <option value="1">1 - Good credit history</option>
                <option value="0">0 - No credit history</option>
              </select>
            </div>
          </div>

          <button type="submit" className="primary-button" disabled={isLoading}>
            {isLoading ? "Predicting..." : "Predict loan approval"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default PredictPage;
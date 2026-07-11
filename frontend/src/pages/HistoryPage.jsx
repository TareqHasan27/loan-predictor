import { useEffect, useState } from "react";

import { getPredictionHistory } from "../api/predictionApi";

function HistoryPage() {
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadPredictionHistory = async () => {
      try {
        const data = await getPredictionHistory();

        setPredictions(data.predictions || []);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadPredictionHistory();
  }, []);

  return (
    <main className="page-shell">
      <section className="wide-form-card">
        <p className="eyebrow">Dashboard</p>
        <h1>Prediction History</h1>

        <p className="form-intro">
          Review your previous loan approval predictions and submitted applicant
          details.
        </p>

        {isLoading && <div className="alert alert-info">Loading history...</div>}

        {errorMessage && (
          <div className="alert alert-error">{errorMessage}</div>
        )}

        {!isLoading && !errorMessage && predictions.length === 0 && (
          <div className="empty-state">
            <h2>No predictions yet</h2>
            <p>
              Submit a loan application from the prediction page, and it will
              appear here.
            </p>
          </div>
        )}

        {!isLoading && predictions.length > 0 && (
          <div className="history-list">
            {predictions.map((prediction) => (
              <article className="history-card" key={prediction.id}>
                <div className="history-card-header">
                  <div>
                    <p className="result-label">Prediction</p>
                    <h2>{prediction.prediction}</h2>
                  </div>

                  <span className="history-date">
                    {new Date(prediction.created_at).toLocaleString()}
                  </span>
                </div>

                <div className="result-grid">
                  <div>
                    <span>Confidence</span>
                    <strong>{prediction.confidence}</strong>
                  </div>

                  <div>
                    <span>Applicant income</span>
                    <strong>{prediction.input_data.applicant_income}</strong>
                  </div>

                  <div>
                    <span>Loan amount</span>
                    <strong>{prediction.input_data.loan_amount}</strong>
                  </div>
                </div>

                <div className="history-details">
                  <span>{prediction.input_data.gender}</span>
                  <span>{prediction.input_data.married === "Yes" ? "Married" : "Not married"}</span>
                  <span>{prediction.input_data.education}</span>
                  <span>{prediction.input_data.property_area}</span>
                  <span>
                    Credit history: {prediction.input_data.credit_history}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default HistoryPage;
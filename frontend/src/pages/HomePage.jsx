import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">Full-stack ML project</p>

        <h1>Smart Loan Approval Predictor</h1>

        <p className="hero-text">
          A complete machine learning web application that predicts whether a
          loan application is likely to be approved or rejected. The system uses
          a trained ML model, a protected backend API, MySQL storage, and a
          React frontend.
        </p>

        <div className="hero-actions">
          <Link to="/predict" className="primary-link-button">
            Make a prediction
          </Link>

          <Link to="/history" className="secondary-link-button">
            View history
          </Link>
        </div>

        <div className="workflow-grid">
          <article className="workflow-card">
            <span>01</span>
            <h2>Create account</h2>
            <p>
              Users register and log in through the Express backend using
              JWT-based authentication.
            </p>
          </article>

          <article className="workflow-card">
            <span>02</span>
            <h2>Submit loan data</h2>
            <p>
              The protected prediction form collects applicant, income, loan,
              credit, and property details.
            </p>
          </article>

          <article className="workflow-card">
            <span>03</span>
            <h2>Get ML result</h2>
            <p>
              The backend sends the request to the FastAPI ML service and
              returns the approval prediction.
            </p>
          </article>

          <article className="workflow-card">
            <span>04</span>
            <h2>Track history</h2>
            <p>
              Each prediction is saved in MySQL and displayed later on the
              history dashboard.
            </p>
          </article>
        </div>

        <div className="status-grid">
          <div className="status-item">
            <span>ML Service </span>
            <strong>FastAPI + scikit-learn</strong>
          </div>

          <div className="status-item">
            <span>Backend </span>
            <strong>Express + MySQL + JWT</strong>
          </div>

          <div className="status-item">
            <span>Frontend </span>
            <strong>React + Vite</strong>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
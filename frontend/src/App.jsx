import "./App.css";

function App() {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">Smart Loan Approval Predictor</p>

        <h1>Frontend service is running</h1>

        <p className="hero-text">
          This React app will later connect to the Express backend for
          authentication, loan prediction, and prediction history.
        </p>

        <div className="status-grid">
          <div className="status-item">
            <span className="status-label">ML Service</span>
            <span className="status-value">FastAPI</span>
          </div>

          <div className="status-item">
            <span className="status-label">Backend</span>
            <span className="status-value">Express</span>
          </div>

          <div className="status-item">
            <span className="status-label">Frontend</span>
            <span className="status-value">React</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
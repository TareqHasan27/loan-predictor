import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="app-shell">
      <section className="placeholder-card">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>

        <p className="hero-text">
          The page you are looking for does not exist. You can go back to the
          homepage and continue using the loan prediction app.
        </p>

        <Link to="/" className="primary-link-button">
          Go to homepage
        </Link>
      </section>
    </main>
  );
}

export default NotFoundPage;
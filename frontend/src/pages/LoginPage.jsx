import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { loginUser } from "../api/authApi";
import { saveAuthData } from "../utils/authStorage";

const initialFormData = {
  email: "",
  password: "",
};

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectedFrom = location.state?.from?.pathname;
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const data = await loginUser(formData);

      saveAuthData({
        token: data.token,
        user: data.user,
      });

      setSuccessMessage("Login successful.");
      setFormData(initialFormData);
      setTimeout(() => {
        navigate(redirectedFrom || "/predict");
      }, 600);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="app-shell">
      <section className="form-card">
        <p className="eyebrow">Account</p>
        <h1>Login</h1>

        <p className="form-intro">
          Sign in to submit loan applications and view your prediction history.
        </p>

        {redirectedFrom && (
          <div className="alert alert-info">
            Please log in to access {redirectedFrom}.
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        {errorMessage && (
          <div className="alert alert-error">{errorMessage}</div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="testuser@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              required
            />
          </div>

          <button type="submit" className="primary-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
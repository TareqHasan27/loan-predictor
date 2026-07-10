import { useState } from "react";

import { registerUser } from "../api/authApi";

const initialFormData = {
  name: "",
  email: "",
  password: "",
};

function RegisterPage() {
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
      const data = await registerUser(formData);

      setSuccessMessage(data.message || "Account created successfully.");
      setFormData(initialFormData);
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
        <h1>Create account</h1>

        <p className="form-intro">
          Register to submit loan applications and save your prediction history.
        </p>

        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        {errorMessage && (
          <div className="alert alert-error">{errorMessage}</div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Test User"
              required
            />
          </div>

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
              placeholder="At least 6 characters"
              minLength={6}
              required
            />
          </div>

          <button type="submit" className="primary-button" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default RegisterPage;
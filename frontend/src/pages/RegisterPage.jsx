import { useState } from "react";

const initialFormData = {
  name: "",
  email: "",
  password: "",
};

function RegisterPage() {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Register form submitted:", formData);
  };

  return (
    <main className="app-shell">
      <section className="form-card">
        <p className="eyebrow">Account</p>
        <h1>Create account</h1>

        <p className="form-intro">
          Register to submit loan applications and save your prediction history.
        </p>

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

          <button type="submit" className="primary-button">
            Create account
          </button>
        </form>
      </section>
    </main>
  );
}

export default RegisterPage;
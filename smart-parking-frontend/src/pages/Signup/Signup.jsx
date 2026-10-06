import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import { authService } from "../../services/authService";

import park3 from "../../assets/park3.jpg";

import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await authService.register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        roleId: 2,
      });

      alert("Account created successfully.");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Signup failed:", error);

      alert(
        error?.message ||
          "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="auth-page signup-page"
      style={{
        backgroundImage: `url(${park3})`,
      }}
    >
      <div className="auth-overlay"></div>

      {/* TOP BAR */}

      <header className="auth-topbar">
        <Link to="/" className="auth-brand">
          <div className="auth-brand-logo">P</div>

          <div>
            <strong>Smart Parking</strong>
            <span>Park Smarter. Live Better.</span>
          </div>
        </Link>

        <div className="auth-top-link">
          <span>Already have an account?</span>

          <Link to="/login">
            Sign In
          </Link>
        </div>
      </header>

      {/* CENTER FORM */}

      <section className="auth-center">
        <div className="auth-card signup-card">
          <div className="auth-card-header">
            <span className="auth-label">
              CREATE ACCOUNT
            </span>

            <h1>
              Join Smart Parking
              <br />
              <strong>today.</strong>
            </h1>

            <p>
              Create your account and start managing
              your parking experience.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                required
              />
            </div>

            <div className="signup-password-row">
              <div className="auth-field">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </Button>
          </form>

          <div className="auth-bottom-text">
            <span>Already have an account?</span>

            <Link to="/login">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <div className="auth-bottom-gradient"></div>
    </main>
  );
}

export default Signup;
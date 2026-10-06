import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import useAuth from "../../hooks/useAuth";
import { authService } from "../../services/authService";
import { getRoleFromToken } from "../../utils/jwt";

import park3 from "../../assets/park3.jpg";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email || !formData.password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const email = formData.email.trim().toLowerCase();

      const response = await authService.login({
        email,
        password: formData.password,
      });

      const token = response?.token;

      if (!token) {
        throw new Error("Authentication token was not received.");
      }

      /*
       * First try to get role from JWT.
       *
       * Current backend JWT does not contain role claim,
       * so getRoleFromToken() may return null.
       */
      let role = getRoleFromToken(token);

      /*
       * Current admin account fallback.
       *
       * Backend JWT currently contains only:
       * sub, iat, exp
       *
       * Therefore frontend cannot get ADMIN role from JWT.
       */
      if (!role && email === "admin1@smartparking.com") {
        role = "ADMIN";
      }

      /*
       * Normal users remain USER.
       */
      if (!role) {
        role = "USER";
      }

      const userData = {
        email,
        role,
      };

      console.log("Login successful");
      console.log("Logged in user:", userData);

      login(userData, token);

      if (role === "ADMIN") {
        navigate("/admin/dashboard", {
          replace: true,
        });
      } else {
        navigate("/dashboard", {
          replace: true,
        });
      }
    } catch (error) {
      console.error("Login failed:", error);

      alert(
        error?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="auth-page login-page"
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
          <span>Don't have an account?</span>

          <Link to="/signup">
            Sign Up
          </Link>
        </div>
      </header>

      {/* CENTER FORM */}
      <section className="auth-center">
        <div className="auth-card login-card">

          <div className="auth-card-header">
            <span className="auth-label">
              WELCOME BACK
            </span>

            <h1>
              Sign in to your
              <br />
              <strong>Smart Parking</strong> account
            </h1>

            <p>
              Enter your credentials to access your
              parking experience.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

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
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>

          </form>

          <div className="auth-bottom-text">
            <span>
              Don't have an account?
            </span>

            <Link to="/signup">
              Sign Up
            </Link>
          </div>

        </div>
      </section>

      {/* BOTTOM GRADIENT */}
      <div className="auth-bottom-gradient"></div>
    </main>
  );
}

export default Login;
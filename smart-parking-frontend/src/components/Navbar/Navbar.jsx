import { Link, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";

import useAuth from "../../hooks/useAuth";

import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("smart-parking-theme") || "light"
  );

  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("smart-parking-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) =>
      current === "light" ? "dark" : "light"
    );

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">P</div>

          <div className="logo-text">
            <span>Smart</span>
            <strong>Parking</strong>
          </div>
        </Link>

        <nav className="navbar-links">
          <Link
            to="/"
            className={
              isActive("/") ? "nav-link active" : "nav-link"
            }
          >
            Home
          </Link>

          <Link
            to="/about"
            className={
              isActive("/about") ? "nav-link active" : "nav-link"
            }
          >
            About
          </Link>
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } theme`}
            title={`Switch to ${
              theme === "light" ? "dark" : "light"
            } theme`}
          >
            <span aria-hidden="true">
              {theme === "light" ? "☾" : "☀"}
            </span>

            <span className="theme-toggle-label">
              {theme === "light" ? "Dark" : "Light"}
            </span>
          </button>

          {isAuthenticated ? (
            <>
              <Link
                to={
                  user?.role === "ADMIN"
                    ? "/admin/dashboard"
                    : "/dashboard"
                }
                className="nav-login"
              >
                Dashboard
              </Link>

              <button
                type="button"
                className="nav-signup"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-login">
                Login
              </Link>

              <Link to="/signup" className="nav-signup">
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <button
            type="button"
            className="theme-toggle mobile-theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } theme`}
          >
            <span aria-hidden="true">
              {theme === "light" ? "☾" : "☀"}
            </span>

            <span>
              {theme === "light"
                ? "Switch to dark theme"
                : "Switch to light theme"}
            </span>
          </button>

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="mobile-nav-link"
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="mobile-nav-link"
          >
            About
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to={
                  user?.role === "ADMIN"
                    ? "/admin/dashboard"
                    : "/dashboard"
                }
                onClick={() => setMenuOpen(false)}
                className="mobile-nav-link"
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="mobile-signup"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="mobile-nav-link"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="mobile-signup"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  return (
    <div className="login-page">

      <div className="login-box">
        <h2>Login</h2>
        <p className="subtitle">Park your vehicle</p>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        
        <button className="login-submit">Login</button>

        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>

    </div>
  );
}

export default Login;
import React from "react";
import "./about.css";

function About() {
  return (
    <section id="about" className="about-section">

      <h1>About Smart Parking System</h1>

      <p>
        Smart Parking System is a modern web-based solution designed to
        simplify vehicle parking management. It helps users find available
        parking slots for bikes, cars, and autos in real-time.
      </p>

      <div className="about-grid">

        <div className="about-card">
          <h3>🚗 Real-Time Availability</h3>
          <p>
            Check live parking slot availability and avoid waiting time.
          </p>
        </div>

        <div className="about-card">
          <h3>⚡ Fast Booking</h3>
          <p>
            Book your parking slot instantly with a smooth and simple UI.
          </p>
        </div>

        <div className="about-card">
          <h3>💰 Affordable Pricing</h3>
          <p>
            Transparent hourly pricing for bikes, cars, and autos.
          </p>
        </div>

        <div className="about-card">
          <h3>🔐 Secure System</h3>
          <p>
            User authentication ensures safe and reliable booking experience.
          </p>
        </div>

      </div>

    </section>
  );
}

export default About;
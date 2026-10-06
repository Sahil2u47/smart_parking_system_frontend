import { useNavigate } from "react-router-dom";

import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleFindParking = () => {
    navigate("/parking");
  };

  const handleExploreFeatures = () => {
    document
      .querySelector(".features-section")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="status-dot"></span>
            Smart Parking • Live Availability
          </div>

          <h1>
            Parking made
            <span> simple.</span>
          </h1>

          <p>
            Find available parking slots, book your space,
            and manage your vehicle — all from one smart platform.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="primary-btn"
              onClick={handleFindParking}
            >
              Find Parking
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={handleExploreFeatures}
            >
              Explore Features
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <strong>24/7</strong>
              <span>Availability</span>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
              <strong>3+</strong>
              <span>Vehicle Types</span>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
              <strong>Smart</strong>
              <span>Booking</span>
            </div>
          </div>
        </div>

        {/* Parking Visual */}
        <div className="hero-visual">
          <div className="parking-panel">
            <div className="parking-panel-header">
              <div>
                <span>Parking Overview</span>
                <h3>City Parking Hub</h3>
              </div>

              <div className="live-indicator">
                <span></span>
                Live
              </div>
            </div>

            <div className="parking-summary">
              <div className="summary-card">
                <span>Available</span>
                <strong>18</strong>
                <small>slots</small>
              </div>

              <div className="summary-card occupied">
                <span>Occupied</span>
                <strong>07</strong>
                <small>slots</small>
              </div>
            </div>

            <div className="parking-slots">
              <div className="slot available">
                <span>A1</span>
                <small>Available</small>
              </div>

              <div className="slot occupied-slot">
                <span>A2</span>
                <small>Occupied</small>
              </div>

              <div className="slot available">
                <span>A3</span>
                <small>Available</small>
              </div>

              <div className="slot available">
                <span>A4</span>
                <small>Available</small>
              </div>

              <div className="slot occupied-slot">
                <span>B1</span>
                <small>Occupied</small>
              </div>

              <div className="slot available">
                <span>B2</span>
                <small>Available</small>
              </div>
            </div>

            <div className="parking-motion" aria-hidden="true">
              <div className="parking-motion-label">
                <span></span>
                Guiding to an open space
              </div>

              <div className="parking-lane">
                <div className="parking-bay">
                  <span>OPEN</span>
                </div>

                <span className="parking-car">🚗</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="vehicle-section">
        <div className="section-heading">
          <span>FLEXIBLE PARKING</span>

          <h2>
            One platform.
            <br />
            Every vehicle.
          </h2>

          <p>
            Choose the parking option that fits your vehicle.
          </p>
        </div>

        <div className="vehicle-grid">
          <div className="vehicle-card">
            <div className="vehicle-icon">
              🏍️
            </div>

            <div className="vehicle-info">
              <span>01</span>
              <h3>Bike</h3>
              <p>Quick & convenient parking</p>
            </div>

            <strong className="vehicle-price">
              ₹20
              <small>/hr</small>
            </strong>
          </div>

          <div className="vehicle-card featured">
            <div className="vehicle-icon">
              🚗
            </div>

            <div className="vehicle-info">
              <span>02</span>
              <h3>Car</h3>
              <p>Secure parking for your car</p>
            </div>

            <strong className="vehicle-price">
              ₹50
              <small>/hr</small>
            </strong>
          </div>

          <div className="vehicle-card">
            <div className="vehicle-icon">
              🛺
            </div>

            <div className="vehicle-info">
              <span>03</span>
              <h3>Auto</h3>
              <p>Easy parking for auto rickshaws</p>
            </div>

            <strong className="vehicle-price">
              ₹30
              <small>/hr</small>
            </strong>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-heading">
          <span>WHY SMART PARKING</span>

          <h2>
            Parking without
            <br />
            the hassle.
          </h2>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-number">
              01
            </div>

            <h3>
              Real-time Availability
            </h3>

            <p>
              See available and occupied parking slots
              before you arrive.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-number">
              02
            </div>

            <h3>
              Easy Booking
            </h3>

            <p>
              Enter your vehicle details and let the
              system automatically assign an available slot.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-number">
              03
            </div>

            <h3>
              Secure Parking
            </h3>

            <p>
              Keep your vehicle details and parking
              information organized in one place.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import About from "./About";

/* ================= HOME ================= */

function Home() {

  const parkingTypes = [
    {
      title: "Bike Parking",
      icon: "🏍️",
      slots: "120 Slots Available",
      fee: "₹20 / Hour",
    },
    {
      title: "Car Parking",
      icon: "🚗",
      slots: "250 Slots Available",
      fee: "₹50 / Hour",
    },
    {
      title: "Auto Parking",
      icon: "🛺",
      slots: "80 Slots Available",
      fee: "₹30 / Hour",
    },
  ];

  return (
    <div className="app">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <h1>Smart Vehicle Parking System</h1>
        <p>Manage Bike, Car and Auto Parking Easily</p>
      </section>

      {/* Parking Cards */}
      <section className="parking-section">
        <div className="parking-grid">

          {parkingTypes.map((item, index) => (
            <div className="parking-card" key={index}>

              {/* Icon */}
              <div className="parking-icon">
                {item.icon}
              </div>

              {/* Title */}
              <h2>{item.title}</h2>

              {/* Slots */}
              <p className="slots">{item.slots}</p>

              {/* Fee */}
              <div className="fee-box">
                Parking Fee: {item.fee}
              </div>

              {/* Button */}
              <button className="primary-btn">
                View Parking
              </button>

            </div>
          ))}

        </div>
      </section>

    </div>
  );
}

/* ================= APP ROUTING ================= */

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
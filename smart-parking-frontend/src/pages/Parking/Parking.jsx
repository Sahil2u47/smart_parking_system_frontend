import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { VEHICLE_TYPES } from "../../utils/constants";
import { parkingService } from "../../services/parkingService";
import "./Parking.css";

function Parking() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  const [formData, setFormData] = useState({
    slotNumber: "",
    slotType: VEHICLE_TYPES.CAR,
  });

  const loadSlots = async () => {
    try {
      setLoading(true);

      const response = await parkingService.getAllSlots();

      setSlots(response || []);
    } catch (error) {
      console.error("Failed to load parking slots:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSlots();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!formData.slotNumber.trim()) {
      alert("Please enter slot number.");
      return;
    }

    try {
      setRegistering(true);

      await parkingService.registerSlot({
        slotNumber: formData.slotNumber.trim().toUpperCase(),
        slotType: formData.slotType,
      });

      alert("Parking slot registered successfully.");

      setFormData({
        slotNumber: "",
        slotType: VEHICLE_TYPES.CAR,
      });

      await loadSlots();
    } catch (error) {
      console.error("Failed to register slot:", error);
      alert(error.message);
    } finally {
      setRegistering(false);
    }
  };

  const availableSlots = slots.filter(
    (slot) => slot.status?.toUpperCase() === "AVAILABLE"
  ).length;

  const occupiedSlots = slots.filter(
    (slot) => slot.status?.toUpperCase() === "OCCUPIED"
  ).length;

  const getVehicleIcon = (type) => {
    switch (type?.toUpperCase()) {
      case "BIKE":
        return "🏍️";
      case "AUTO":
        return "🛺";
      case "CAR":
      default:
        return "🚗";
    }
  };

  const getSlotStatus = (status) => {
    const normalized = status?.toUpperCase();

    if (normalized === "AVAILABLE") {
      return {
        label: "Available",
        className: "available",
      };
    }

    if (normalized === "OCCUPIED") {
      return {
        label: "Occupied",
        className: "occupied",
      };
    }

    return {
      label: status || "Unknown",
      className: "unknown",
    };
  };

  return (
    <main className="parking-page">

      {/* HERO */}
      <section className="parking-hero">
        <div className="parking-hero-content">
          <div className="parking-eyebrow">
            <span className="parking-live-dot"></span>
            PARKING MANAGEMENT
          </div>

          <h1>
            Manage
            <span>parking.</span>
          </h1>

          <p>
            Monitor parking capacity, check live slot availability,
            and manage vehicle-specific parking spaces from one place.
          </p>
        </div>

        <div className="parking-live-card">
          <span className="parking-live-card-dot"></span>
          <div>
            <strong>Live Parking</strong>
            <small>System is connected</small>
          </div>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="parking-summary">

        <div className="parking-summary-card total">
          <div className="summary-icon">P</div>

          <div className="summary-content">
            <span>Total Slots</span>
            <strong>{slots.length}</strong>
            <small>Registered parking spaces</small>
          </div>
        </div>

        <div className="parking-summary-card available">
          <div className="summary-icon">✓</div>

          <div className="summary-content">
            <span>Available</span>
            <strong>{availableSlots}</strong>
            <small>Ready for booking</small>
          </div>
        </div>

        <div className="parking-summary-card occupied">
          <div className="summary-icon">●</div>

          <div className="summary-content">
            <span>Occupied</span>
            <strong>{occupiedSlots}</strong>
            <small>Currently in use</small>
          </div>
        </div>

      </section>

      {/* ADMIN REGISTER */}
      <section className="parking-register">

        <div className="register-info">
          <div className="register-icon">+</div>

          <div>
            <span className="section-eyebrow">ADMIN ACTION</span>

            <h2>Register a parking slot</h2>

            <p>
              Add a new parking space and assign it to a specific
              vehicle type.
            </p>
          </div>
        </div>

        <form className="parking-register-form" onSubmit={handleRegister}>

          <div className="parking-form-field">
            <label htmlFor="slotNumber">Slot Number</label>

            <input
              id="slotNumber"
              name="slotNumber"
              value={formData.slotNumber}
              onChange={handleChange}
              placeholder="Example: A-01"
              autoComplete="off"
            />
          </div>

          <div className="parking-form-field">
            <label htmlFor="slotType">Vehicle Type</label>

            <select
              id="slotType"
              name="slotType"
              value={formData.slotType}
              onChange={handleChange}
            >
              <option value={VEHICLE_TYPES.CAR}>CAR</option>
              <option value={VEHICLE_TYPES.BIKE}>BIKE</option>
              <option value={VEHICLE_TYPES.AUTO}>AUTO</option>
            </select>
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={registering}
          >
            {registering ? "Registering..." : "Register Slot"}
          </Button>

        </form>
      </section>

      {/* LIVE PARKING */}
      <section className="parking-section">

        <div className="parking-section-header">

          <div>
            <span className="section-eyebrow">LIVE PARKING</span>

            <h2>All Parking Slots</h2>

            <p>
              View the current status of every registered parking space.
            </p>
          </div>

          <button
            type="button"
            className="parking-refresh-btn"
            onClick={loadSlots}
            disabled={loading}
          >
            <span className={loading ? "refresh-icon spinning" : "refresh-icon"}>
              ↻
            </span>

            {loading ? "Refreshing..." : "Refresh"}
          </button>

        </div>

        {/* LEGEND */}
        <div className="parking-legend">
          <span>
            <i className="legend-dot available-dot"></i>
            Available
          </span>

          <span>
            <i className="legend-dot occupied-dot"></i>
            Occupied
          </span>
        </div>

        {loading ? (
          <div className="parking-loading">
            <div className="loading-spinner"></div>
            <p>Loading parking slots...</p>
          </div>
        ) : slots.length === 0 ? (
          <div className="parking-empty">

            <div className="empty-icon">P</div>

            <h3>No parking slots yet</h3>

            <p>
              Register your first parking slot above to start
              managing the parking area.
            </p>

          </div>
        ) : (
          <div className="parking-slot-grid">

            {slots.map((slot) => {
              const status = getSlotStatus(slot.status);

              return (
                <div
                  className={`parking-slot-card ${status.className}`}
                  key={slot.id}
                >

                  <div className="slot-card-top">
                    <span className="slot-label">PARKING SLOT</span>

                    <span className={`parking-status ${status.className}`}>
                      <i></i>
                      {status.label}
                    </span>
                  </div>

                  <div className="slot-number">
                    {slot.slotNumber}
                  </div>

                  <div className="slot-card-bottom">

                    <div className="slot-vehicle">
                      <span className="vehicle-icon">
                        {getVehicleIcon(slot.slotType)}
                      </span>

                      <div>
                        <small>Vehicle Type</small>
                        <strong>{slot.slotType}</strong>
                      </div>
                    </div>

                    <span className="slot-arrow">↗</span>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </section>

    </main>
  );
}

export default Parking;
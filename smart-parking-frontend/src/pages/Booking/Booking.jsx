import { useState } from "react";

import Button from "../../components/Button/Button";

import { VEHICLE_TYPES } from "../../utils/constants";
import { bookingService } from "../../services/bookingService";

import "./Booking.css";

function Booking() {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleType: VEHICLE_TYPES.CAR,
    brand: "",
    color: "",
  });

  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await bookingService.bookParking({
        vehicleNumber: formData.vehicleNumber.toUpperCase(),
        vehicleType: formData.vehicleType,
        brand: formData.brand,
        color: formData.color,
      });

      console.log("Booking response:", response);

      setBooking(response);

      alert(
        `Parking booked successfully. Slot: ${response.slotNumber}`
      );
    } catch (error) {
      console.error("Booking failed:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="booking-page">
      <section className="booking-header">
        <div>
          <span className="booking-badge">SMART BOOKING</span>

          <h1>
            Book your
            <span> parking.</span>
          </h1>

          <p>
            Enter your vehicle details and the system will
            automatically assign an available parking slot.
          </p>
        </div>
      </section>

      <section className="booking-container">
        <div className="booking-form-card">
          <div className="booking-card-header">
            <span>01</span>

            <div>
              <h2>Vehicle Details</h2>
              <p>Enter your vehicle information</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="vehicleNumber">
                Vehicle Number
              </label>

              <input
                id="vehicleNumber"
                name="vehicleNumber"
                type="text"
                placeholder="DL01AB1234"
                value={formData.vehicleNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="vehicleType">
                Vehicle Type
              </label>

              <select
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                required
              >
                <option value={VEHICLE_TYPES.BIKE}>
                  Bike
                </option>

                <option value={VEHICLE_TYPES.CAR}>
                  Car
                </option>

                <option value={VEHICLE_TYPES.AUTO}>
                  Auto
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="brand">Brand</label>

              <input
                id="brand"
                name="brand"
                type="text"
                placeholder="Hyundai"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="color">Color</label>

              <input
                id="color"
                name="color"
                type="text"
                placeholder="White"
                value={formData.color}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </Button>
          </form>
        </div>

        <aside className="booking-summary-card">
          <div className="booking-summary-header">
            <span>02</span>

            <div>
              <h2>Booking Summary</h2>
              <p>Your current booking details</p>
            </div>
          </div>

          <div className="booking-summary-details">
            <div>
              <span>VEHICLE NUMBER</span>
              <strong>
                {formData.vehicleNumber || "-"}
              </strong>
            </div>

            <div>
              <span>VEHICLE TYPE</span>
              <strong>{formData.vehicleType}</strong>
            </div>

            <div>
              <span>BRAND</span>
              <strong>{formData.brand || "-"}</strong>
            </div>

            <div>
              <span>COLOR</span>
              <strong>{formData.color || "-"}</strong>
            </div>
          </div>

          {booking && (
            <div className="booking-total">
              <span>ASSIGNED SLOT</span>

              <strong>{booking.slotNumber}</strong>
            </div>
          )}

          <div className="booking-assignment-info">
            <span>✓</span>

            <p>
              You don't need to select a slot. The backend
              automatically assigns the first available slot
              matching your vehicle type.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Booking;
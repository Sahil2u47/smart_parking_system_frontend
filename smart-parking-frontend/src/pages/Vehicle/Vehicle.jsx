import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { VEHICLE_TYPES } from "../../utils/constants";
import { vehicleService } from "../../services/vehicleService";
import "./Vehicle.css";

function Vehicle() {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleType: VEHICLE_TYPES.CAR,
    brand: "",
    color: "",
  });

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vehiclesLoading, setVehiclesLoading] = useState(true);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setVehiclesLoading(true);

        const response = await vehicleService.getMyVehicles();

        console.log("My vehicles:", response);

        setVehicles(response);
      } catch (error) {
        console.error("Failed to load vehicles:", error);
        alert(error.message);
      } finally {
        setVehiclesLoading(false);
      }
    };

    loadVehicles();
  }, []);

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

      const response = await vehicleService.saveVehicle({
        vehicleNumber: formData.vehicleNumber,
        vehicleType: formData.vehicleType,
        brand: formData.brand,
        color: formData.color,
      });

      console.log("Vehicle saved:", response);

      // Fetch fresh data from database
      const updatedVehicles = await vehicleService.getMyVehicles();

      setVehicles(updatedVehicles);

      setFormData({
        vehicleNumber: "",
        vehicleType: VEHICLE_TYPES.CAR,
        brand: "",
        color: "",
      });

      alert("Vehicle registered successfully.");
    } catch (error) {
      console.error("Vehicle save failed:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="vehicle-page">
      <section className="vehicle-header">
        <div>
          <span className="section-label">MY VEHICLES</span>

          <h1>Manage Your Vehicles</h1>

          <p>
            Register your vehicle to make parking faster and easier.
          </p>
        </div>
      </section>

      <section className="vehicle-content">
        <div className="vehicle-form-card">
          <div className="card-header">
            <h2>Register Vehicle</h2>

            <p>
              Add your vehicle details below.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="vehicleNumber">
                Vehicle Number
              </label>

              <input
                id="vehicleNumber"
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                placeholder="DL01AB1234"
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
                <option value={VEHICLE_TYPES.CAR}>
                  Car
                </option>

                <option value={VEHICLE_TYPES.BIKE}>
                  Bike
                </option>

                <option value={VEHICLE_TYPES.AUTO}>
                  Auto
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="brand">
                Brand
              </label>

              <input
                id="brand"
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Hyundai"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="color">
                Color
              </label>

              <input
                id="color"
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="White"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register Vehicle"}
            </Button>
          </form>
        </div>

        <div className="vehicle-list-section">
          <div className="card-header">
            <h2>Registered Vehicles</h2>

            <p>
              Your vehicles stored in the parking system.
            </p>
          </div>

          {vehiclesLoading ? (
            <p>Loading vehicles...</p>
          ) : vehicles.length === 0 ? (
            <div className="empty-state">
              <h3>No vehicles registered</h3>

              <p>
                Register your first vehicle to get started.
              </p>
            </div>
          ) : (
            <div className="vehicle-list">
              {vehicles.map((vehicle) => (
                <div
                  className="vehicle-card"
                  key={vehicle.id}
                >
                  <div className="vehicle-card-header">
                    <h3>
                      {vehicle.vehicleNumber}
                    </h3>

                    <span>
                      {vehicle.vehicleType}
                    </span>
                  </div>

                  <div className="vehicle-details">
                    <div>
                      <span>Brand</span>
                      <strong>
                        {vehicle.brand}
                      </strong>
                    </div>

                    <div>
                      <span>Color</span>
                      <strong>
                        {vehicle.color}
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Vehicle;
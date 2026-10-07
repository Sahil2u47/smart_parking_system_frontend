import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { parkingService } from "../../services/parkingService";
import { vehicleService } from "../../services/vehicleService";
import { bookingService } from "../../services/bookingService";

import "./UserDashboard.css";

function UserDashboard() {
  const [slots, setSlots] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [totalBookings, setTotalBookings] = useState(0);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const [slotResponse, vehicleResponse, bookingResponse] =
        await Promise.all([
          parkingService.getAllSlots(),
          vehicleService.getMyVehicles(),
          bookingService.getMyBookings(0, 10),
        ]);

      console.log("Dashboard slots:", slotResponse);
      console.log("Dashboard vehicles:", vehicleResponse);
      console.log("Dashboard bookings:", bookingResponse);

      setSlots(slotResponse || []);
      setVehicles(vehicleResponse || []);
      setBookings(bookingResponse?.content || []);

      setTotalBookings(
        bookingResponse?.totalElements || 0
      );
    } catch (error) {
      console.error("Failed to load dashboard:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const availableSlots = slots.filter(
    (slot) =>
      slot.status?.toUpperCase() === "AVAILABLE"
  ).length;

  const activeBookings = bookings.filter(
    (booking) => booking.status === "ACTIVE"
  );

  const activeBooking = activeBookings[0];

  const formatDate = (dateTime) => {
    if (!dateTime) {
      return "-";
    }

    return new Date(dateTime).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateTime) => {
    if (!dateTime) {
      return "-";
    }

    return new Date(dateTime).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleExit = async () => {
    if (!activeBooking) {
      return;
    }

    const confirmed = window.confirm(
      `Exit parking for ${activeBooking.vehicleNumber}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(true);

      const response = await bookingService.exitParking({
        vehicleNumber: activeBooking.vehicleNumber,
      });

      console.log("Exit response:", response);

      alert(
        `Parking exited successfully.\nTotal Amount: ₹${response.totalAmount}`
      );

      await loadDashboardData();
    } catch (error) {
      console.error("Exit parking failed:", error);
      alert(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <main className="dashboard-page">
      <section className="dashboard-header">
        <div>
          <span className="dashboard-badge">
            USER DASHBOARD
          </span>

          <h1>
            Welcome back,
            <span> Driver.</span>
          </h1>

          <p>
            Manage your vehicles, find parking and keep track
            of your bookings from one place.
          </p>
        </div>

        <div className="dashboard-status">
          <span className="status-dot"></span>
          System Online
        </div>
      </section>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          <section className="dashboard-stats">
            <div className="stat-card">
              <span className="stat-label">
                Available Slots
              </span>

              <strong>{availableSlots}</strong>

              <small>Right now</small>
            </div>

            <div className="stat-card">
              <span className="stat-label">
                My Vehicles
              </span>

              <strong>{vehicles.length}</strong>

              <small>Registered vehicles</small>
            </div>

            <div className="stat-card">
              <span className="stat-label">
                Active Booking
              </span>

              <strong>
                {activeBookings.length
                  .toString()
                  .padStart(2, "0")}
              </strong>

              <small>Currently parked</small>
            </div>

            <div className="stat-card">
              <span className="stat-label">
                Total Bookings
              </span>

              <strong>{totalBookings}</strong>

              <small>All time</small>
            </div>
          </section>

          <section className="dashboard-grid">
            <div className="dashboard-panel">
              <div className="panel-header">
                <div>
                  <span>QUICK ACTION</span>

                  <h2>Find a parking slot</h2>
                </div>
              </div>

              <p>
                Check available parking slots and choose the
                best option for your vehicle.
              </p>

              <Link
                to="/parking"
                className="dashboard-primary-btn"
              >
                Find Parking →
              </Link>
            </div>

            <div className="dashboard-panel">
              <div className="panel-header">
                <div>
                  <span>ACTIVE BOOKING</span>

                  <h2>
                    {activeBooking
                      ? `Parking ${activeBooking.slotNumber}`
                      : "No Active Booking"}
                  </h2>
                </div>

                {activeBooking && (
                  <span className="booking-active">
                    ACTIVE
                  </span>
                )}
              </div>

              {activeBooking ? (
                <>
                  <div className="booking-details">
                    <div>
                      <span>Vehicle</span>

                      <strong>
                        {activeBooking.vehicleNumber}
                      </strong>
                    </div>

                    <div>
                      <span>Parking Slot</span>

                      <strong>
                        {activeBooking.slotNumber}
                      </strong>
                    </div>

                    <div>
                      <span>Entry Time</span>

                      <strong>
                        {formatTime(
                          activeBooking.startTime
                        )}
                      </strong>
                    </div>
                  </div>

                  <div className="dashboard-booking-actions">
                    <button
                      type="button"
                      className="dashboard-secondary-btn"
                      onClick={handleExit}
                      disabled={actionLoading}
                    >
                      {actionLoading
                        ? "Processing..."
                        : "Exit Parking"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    You don't have any active parking
                    booking right now.
                  </p>

                  <Link
                    to="/booking"
                    className="dashboard-secondary-btn"
                  >
                    Book Parking
                  </Link>
                </>
              )}
            </div>
          </section>

          <section className="recent-section">
            <div className="recent-header">
              <div>
                <span>RECENT ACTIVITY</span>

                <h2>Recent bookings</h2>
              </div>

              <Link
                to="/booking-history"
                className="view-all-btn"
              >
                View All →
              </Link>
            </div>

            <div className="booking-table">
              <div className="booking-row booking-heading">
                <span>Vehicle</span>
                <span>Slot</span>
                <span>Date</span>
                <span>Status</span>
              </div>

              {bookings.length === 0 ? (
                <div className="booking-row">
                  <span>No bookings found.</span>
                  <span>-</span>
                  <span>-</span>
                  <span>-</span>
                </div>
              ) : (
                bookings.slice(0, 3).map((booking) => (
                  <div
                    className="booking-row"
                    key={booking.bookingId}
                  >
                    <span>
                      {booking.vehicleNumber || "-"}
                    </span>

                    <span>
                      {booking.slotNumber || "-"}
                    </span>

                    <span>
                      {formatDate(booking.startTime)}
                    </span>

                    <strong className="completed">
                      {booking.status}
                    </strong>
                  </div>
                ))
              )}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default UserDashboard;

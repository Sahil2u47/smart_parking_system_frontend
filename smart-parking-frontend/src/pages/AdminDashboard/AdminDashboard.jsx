import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../../components/Button/Button";
import { parkingService } from "../../services/parkingService";

import "./AdminDashboard.css";

function AdminDashboard() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAdminDashboard = async () => {
    try {
      setLoading(true);

      const response = await parkingService.getAllSlots();

      console.log("Admin dashboard slots:", response);

      setSlots(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Failed to load admin dashboard:", error);
      alert(error?.message || "Failed to load parking data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminDashboard();
  }, []);

  const totalSlots = slots.length;

  const availableSlots = slots.filter(
    (slot) => slot.status?.toUpperCase() === "AVAILABLE"
  ).length;

  const occupiedSlots = slots.filter(
    (slot) => slot.status?.toUpperCase() === "OCCUPIED"
  ).length;

  const slotTypes = [
    {
      type: "CAR",
      label: "Cars",
      icon: "🚗",
    },
    {
      type: "BIKE",
      label: "Bikes",
      icon: "🏍️",
    },
    {
      type: "AUTO",
      label: "Autos",
      icon: "🛺",
    },
  ];

  const slotBreakdown = slotTypes.map((item) => {
    const typeSlots = slots.filter(
      (slot) => slot.slotType?.toUpperCase() === item.type
    );

    const available = typeSlots.filter(
      (slot) => slot.status?.toUpperCase() === "AVAILABLE"
    ).length;

    const occupied = typeSlots.filter(
      (slot) => slot.status?.toUpperCase() === "OCCUPIED"
    ).length;

    return {
      ...item,
      total: typeSlots.length,
      available,
      occupied,
    };
  });

  const stats = [
    {
      label: "TOTAL SLOTS",
      value: totalSlots,
      detail: "Parking capacity",
    },
    {
      label: "AVAILABLE",
      value: availableSlots,
      detail: "Currently free",
    },
    {
      label: "OCCUPIED",
      value: occupiedSlots,
      detail: "Currently occupied",
    },
    {
      label: "OCCUPANCY",
      value:
        totalSlots > 0
          ? `${Math.round((occupiedSlots / totalSlots) * 100)}%`
          : "0%",
      detail: "Current utilization",
    },
  ];

  return (
    <main className="admin-page">
      {/* HEADER */}
      <section className="admin-header">
        <div>
          <span className="admin-badge">ADMIN CONTROL CENTER</span>

          <h1>
            Parking<span> management.</span>
          </h1>

          <p>
            Manage parking capacity, create parking slots and monitor
            real-time occupancy from one place.
          </p>
        </div>

        <div className="admin-live">
          <span></span>
          System Online
        </div>
      </section>

      {loading ? (
        <div className="admin-loading">
          Loading parking data...
        </div>
      ) : (
        <>
          {/* STATISTICS */}
          <section className="admin-stats">
            {stats.map((stat) => (
              <div className="admin-stat-card" key={stat.label}>
                <span>{stat.label}</span>

                <strong>{stat.value}</strong>

                <small>{stat.detail}</small>
              </div>
            ))}
          </section>

          {/* VEHICLE TYPE BREAKDOWN */}
          <section className="admin-breakdown">
            <div className="admin-card-header">
              <div>
                <span>SLOT BREAKDOWN</span>
                <h2>Parking by Vehicle Type</h2>
              </div>
            </div>

            <div className="admin-breakdown-grid">
              {slotBreakdown.map((item) => (
                <div
                  className="admin-breakdown-card"
                  key={item.type}
                >
                  <div className="breakdown-top">
                    <div className="breakdown-icon">
                      {item.icon}
                    </div>

                    <div>
                      <strong>{item.label}</strong>
                      <span>{item.type} parking slots</span>
                    </div>
                  </div>

                  <div className="breakdown-total">
                    <strong>{item.total}</strong>
                    <span>Total slots</span>
                  </div>

                  <div className="breakdown-status">
                    <div className="breakdown-status-item available">
                      <span></span>
                      <div>
                        <strong>{item.available}</strong>
                        <small>Available</small>
                      </div>
                    </div>

                    <div className="breakdown-status-item occupied">
                      <span></span>
                      <div>
                        <strong>{item.occupied}</strong>
                        <small>Occupied</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* MAIN CONTENT */}
          <section className="admin-content">
            {/* CURRENT SLOTS */}
            <div className="admin-bookings-card">
              <div className="admin-card-header">
                <div>
                  <span>PARKING STATUS</span>
                  <h2>Current Slot Overview</h2>
                </div>

                <Link to="/parking">View All</Link>
              </div>

              <div className="admin-booking-list">
                {slots.length === 0 ? (
                  <div className="admin-empty-state">
                    <div className="empty-icon">🅿️</div>

                    <strong>No parking slots found</strong>

                    <span>
                      Create parking slots to start managing
                      your parking area.
                    </span>

                    <Link to="/parking">
                      Manage Parking Slots
                    </Link>
                  </div>
                ) : (
                  slots.slice(0, 10).map((slot) => (
                    <div
                      className="admin-booking-item"
                      key={slot.id}
                    >
                      <div className="admin-booking-main">
                        <div className="admin-booking-icon">
                          {slot.slotType === "CAR" && "🚗"}
                          {slot.slotType === "BIKE" && "🏍️"}
                          {slot.slotType === "AUTO" && "🛺"}

                          {!["CAR", "BIKE", "AUTO"].includes(
                            slot.slotType
                          ) && "🅿️"}
                        </div>

                        <div>
                          <strong>
                            Slot {slot.slotNumber}
                          </strong>

                          <span>
                            {slot.slotType || "Unknown type"}
                          </span>
                        </div>
                      </div>

                      <div className="admin-booking-status">
                        <span
                          className={slot.status?.toLowerCase()}
                        >
                          {slot.status || "UNKNOWN"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* MANAGEMENT */}
            <aside className="admin-actions-card">
              <div className="admin-card-header">
                <div>
                  <span>MANAGEMENT</span>
                  <h2>Parking Management</h2>
                </div>
              </div>

              <div className="admin-actions">
                <Link to="/parking">
                  <Button variant="primary">
                    Manage Parking Slots
                  </Button>
                </Link>
              </div>

              <div className="admin-management-note">
                <span className="note-icon">ℹ</span>

                <div>
                  <strong>Admin responsibility</strong>

                  <p>
                    Create and manage parking slots and monitor
                    their availability. Parking bookings are
                    handled by users.
                  </p>
                </div>
              </div>

              <div className="admin-system-info">
                <span>System Status</span>

                <div>
                  <i></i>

                  <strong>All systems operational</strong>
                </div>
              </div>
            </aside>
          </section>
        </>
      )}
    </main>
  );
}

export default AdminDashboard;
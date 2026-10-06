import { useEffect, useState } from "react";

import { bookingService } from "../../services/bookingService";

import "./BookingHistory.css";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(null);
  const [exitLoading, setExitLoading] = useState(null);

  const loadBookings = async () => {
    try {
      setLoading(true);

      const response = await bookingService.getMyBookings(
        pageNumber,
        pageSize
      );

      console.log("My bookings:", response);

      setBookings(response.content || []);
      setTotalPages(response.totalPages || 0);
    } catch (error) {
      console.error("Failed to load bookings:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [pageNumber, pageSize]);

  const formatDateTime = (dateTime) => {
    if (!dateTime) {
      return "-";
    }

    return new Date(dateTime).toLocaleString("en-IN");
  };

  const handlePrevious = () => {
    if (pageNumber > 0) {
      setPageNumber((previous) => previous - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber < totalPages - 1) {
      setPageNumber((previous) => previous + 1);
    }
  };

  const handleCancel = async (vehicleNumber) => {
    const confirmed = window.confirm(
      `Cancel booking for ${vehicleNumber}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancelLoading(vehicleNumber);

      await bookingService.cancelBooking(vehicleNumber);

      alert("Booking cancelled successfully.");

      await loadBookings();
    } catch (error) {
      console.error("Cancel booking failed:", error);
      alert(error.message);
    } finally {
      setCancelLoading(null);
    }
  };

  const handleExit = async (vehicleNumber) => {
    const confirmed = window.confirm(
      `Exit parking for ${vehicleNumber}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setExitLoading(vehicleNumber);

      const response = await bookingService.exitParking({
        vehicleNumber,
      });

      console.log("Exit response:", response);

      alert(
        `Parking exited successfully.\nTotal Amount: ₹${response.totalAmount}`
      );

      await loadBookings();
    } catch (error) {
      console.error("Exit parking failed:", error);
      alert(error.message);
    } finally {
      setExitLoading(null);
    }
  };

  return (
    <main className="booking-history-page">
      <section className="booking-history-header">
        <div>
          <span>BOOKING HISTORY</span>

          <h1>Your Parking History</h1>

          <p>
            View your active and completed parking bookings.
          </p>
        </div>
      </section>

      <section className="booking-history-section">
        {loading ? (
          <p>Loading booking history...</p>
        ) : bookings.length === 0 ? (
          <div className="empty-state">
            <h2>No bookings found</h2>

            <p>
              Your parking bookings will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="booking-history-list">
              {bookings.map((booking) => (
                <div
                  className="booking-history-card"
                  key={booking.bookingId}
                >
                  <div className="booking-history-card-header">
                    <div>
                      <span>BOOKING ID</span>

                      <h3>
                        #{booking.bookingId}
                      </h3>
                    </div>

                    <span className="booking-status">
                      {booking.status}
                    </span>
                  </div>

                  <div className="booking-history-details">
                    <div>
                      <span>VEHICLE</span>

                      <strong>
                        {booking.vehicleNumber || "-"}
                      </strong>
                    </div>

                    <div>
                      <span>PARKING SLOT</span>

                      <strong>
                        {booking.slotNumber || "-"}
                      </strong>
                    </div>

                    <div>
                      <span>START TIME</span>

                      <strong>
                        {formatDateTime(booking.startTime)}
                      </strong>
                    </div>

                    <div>
                      <span>END TIME</span>

                      <strong>
                        {formatDateTime(booking.endTime)}
                      </strong>
                    </div>

                    <div>
                      <span>TOTAL HOURS</span>

                      <strong>
                        {booking.totalHours != null
                          ? `${booking.totalHours} hour${
                              booking.totalHours !== 1
                                ? "s"
                                : ""
                            }`
                          : "-"}
                      </strong>
                    </div>

                    <div>
                      <span>TOTAL AMOUNT</span>

                      <strong>
                        {booking.totalAmount != null
                          ? `₹${booking.totalAmount}`
                          : "-"}
                      </strong>
                    </div>
                  </div>

                  {booking.status === "ACTIVE" && (
                    <div className="booking-actions">
                      <button
                        type="button"
                        onClick={() =>
                          handleExit(
                            booking.vehicleNumber
                          )
                        }
                        disabled={
                          exitLoading ===
                            booking.vehicleNumber ||
                          cancelLoading ===
                            booking.vehicleNumber
                        }
                      >
                        {exitLoading ===
                        booking.vehicleNumber
                          ? "Processing..."
                          : "Exit Parking"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleCancel(
                            booking.vehicleNumber
                          )
                        }
                        disabled={
                          cancelLoading ===
                            booking.vehicleNumber ||
                          exitLoading ===
                            booking.vehicleNumber
                        }
                      >
                        {cancelLoading ===
                        booking.vehicleNumber
                          ? "Cancelling..."
                          : "Cancel Booking"}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="booking-pagination">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={
                    pageNumber === 0 || loading
                  }
                >
                  Previous
                </button>

                <span>
                  Page {pageNumber + 1} of {totalPages}
                </span>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    pageNumber >= totalPages - 1 ||
                    loading
                  }
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default BookingHistory;
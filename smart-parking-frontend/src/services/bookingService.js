import { api } from "./api";

export const bookingService = {
  bookParking(bookingData) {
    return api.post("/booking/book", bookingData);
  },

  exitParking(exitData) {
    return api.put("/booking/exit", exitData);
  },

  getMyBookings(page = 0, size = 10) {
    return api.get(`/booking/my-bookings?page=${page}&size=${size}`);
  },

  cancelBooking(vehicleNumber) {
    return api.put("/booking/cancel", {
      vehicleNumber,
    });
  },
};
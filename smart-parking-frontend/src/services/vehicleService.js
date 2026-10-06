import { api } from "./api";

export const vehicleService = {
  saveVehicle(vehicleData) {
    return api.post("/vehicle/saveVehicle", vehicleData);
  },

  getMyVehicles() {
    return api.get("/vehicle/my-vehicles");
  },
};
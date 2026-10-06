import { api } from "./api";

export const parkingService = {
  registerSlot(slotData) {
    return api.post("/parkingslot/register", slotData);
  },

  getAllSlots() {
    return api.get("/parkingslot");
  },
};
import { create } from "zustand";

export const useAlertStore = create((set) => ({
  alert: {
    success: false,
    message: "",
    showAlert: false,
  },
  setAlert: (alert) => set({ alert }),
}));

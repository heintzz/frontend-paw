import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  showSidebar: false,
  setShowSidebar: (show) => set({ showSidebar: !show }),
}));

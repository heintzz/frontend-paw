import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  showSidebar: true,
  setShowSidebar: (show) => set({ showSidebar: !show }),
}));

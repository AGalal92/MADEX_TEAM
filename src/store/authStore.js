// store/authStore.js
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  setAuth: (status) => set({ isAuthenticated: status }),
}));
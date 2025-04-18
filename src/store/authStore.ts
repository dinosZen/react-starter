import { getCookieValue } from "@/lib/cookies";
import { create } from "zustand";

interface TwoFactorState {
  secret: string | null;
  setSecret: (value: string) => void;
  clearSecret: () => void;
}

export const useTwoFactorStore = create<TwoFactorState>((set) => ({
  secret: null,
  setSecret: (value) => set({ secret: value }),
  clearSecret: () => set({ secret: null }),
}));

interface AuthState {
  isAuthenticated: boolean;
  checkAuth: () => void;
  isLoggingIn: boolean;
  checkLoggingIn: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!getCookieValue("access_token"),
  checkAuth: () => {
    const token = getCookieValue("access_token");
    set({ isAuthenticated: !!token });
  },
  isLoggingIn: !!getCookieValue("partial_token"),
  checkLoggingIn: () => {
    const token = getCookieValue("partial_token");
    set({ isLoggingIn: !!token });
  },
}));

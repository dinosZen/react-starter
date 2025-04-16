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

import { create } from "zustand";

interface HeaderState {
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  isVisible: true,
  setVisible: (visible) => set({ isVisible: visible }),
}));

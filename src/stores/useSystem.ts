import { create } from "zustand";



interface SystemState {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: () => void;
}

export const useSystemStore = create<SystemState>((set, get) => ({
    mobileMenuOpen: false,
    setMobileMenuOpen: () => set({ mobileMenuOpen: !get().mobileMenuOpen }),
}));

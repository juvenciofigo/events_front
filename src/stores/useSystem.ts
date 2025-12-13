import { create } from "zustand";



interface SystemState {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: () => void;
    hideLabelSidebar: boolean;
    setHideLabelSidebar: () => void;
}

export const useSystemStore = create<SystemState>((set, get) => ({
    mobileMenuOpen: false,
    setMobileMenuOpen: () => set({ mobileMenuOpen: !get().mobileMenuOpen }),
    hideLabelSidebar: true,
    setHideLabelSidebar: () => set({ hideLabelSidebar: !get().hideLabelSidebar }),
}));

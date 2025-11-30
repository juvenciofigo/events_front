import { create } from "zustand";

export interface organizerProfile {
    id: string;
    companyName: string;
    profilePicture: string;
    description: string;
    user?: {
        id: string;
        name: string;
        email: string;
        roles: string[];
    };
}

export interface supplierProfile {
    id: string;
    companyName: string;
    profilePicture: string;
    logo: string;
    description: string;
    location: string;
    user?: {
        id: string;
        name: string;
        email: string;
        roles: string[];
    };
}

export interface profileStore {
    organizerProfile?: organizerProfile;
    supplierProfile?: supplierProfile;

    setOrganizerProfile: (profile: organizerProfile) => void;
    setSupplierProfile: (profile: supplierProfile) => void;
    getOrganizerProfile: () => organizerProfile | undefined;
    getSupplierProfile: () => supplierProfile | undefined;
}

export const useProfileStore = create<profileStore>((set, get) => ({
    organizerProfile: undefined,
    supplierProfile: undefined,

    setOrganizerProfile: (profile: organizerProfile) => set({ organizerProfile: profile }),
    setSupplierProfile: (profile: supplierProfile) => set({ supplierProfile: profile }),
    getOrganizerProfile: () => get().organizerProfile,
    getSupplierProfile: () => get().supplierProfile,
}));

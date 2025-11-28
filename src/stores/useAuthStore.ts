import { create } from "zustand";

/* ============================================
   TYPES
============================================ */

export type Role = "organizer" | "supplier";

export type SelectedProfile = {
    id: string;
    role: Role;
};

export interface Profiles {
    organizer: string | null;
    supplier: string | null;
}

export interface LoginDataDTO {
    id: string;
    email: string;
    name: string;
    roles: string[];
    token: string;
    profiles: Profiles | null;
}

interface AuthState {
    user: { id: string; name: string; email: string; roles: string[] } | null;
    profiles: Profiles | null;
    token: string | null;
    selectedProfile: SelectedProfile | null;

    // actions:
    login: (data: LoginDataDTO) => void;
    setToken: (token: string | null) => void;
    logout: () => void;
    setSelectedProfile: (profile: SelectedProfile | null) => void;

    addProfile: (role: Role, id: string) => void;
}

/* ============================================
   LOCAL STORAGE INITIALIZER
============================================ */

function readInitial() {
    try {
        const user = JSON.parse(localStorage.getItem("auth_user") || "null");
        const profiles = JSON.parse(localStorage.getItem("auth_profiles") || "null");
        const token = localStorage.getItem("auth_token") || null;
        const selectedProfile = JSON.parse(localStorage.getItem("selectedProfile") || "null");

        return { user, profiles, token, selectedProfile };
    } catch {
        return { user: null, profiles: null, token: null, selectedProfile: null };
    }
}

const initial = readInitial();

/* ============================================
   ZUSTAND STORE
============================================ */

export const useAuthStore = create<AuthState>((set, get) => ({
    user: initial.user,
    profiles: initial.profiles,
    token: initial.token,
    selectedProfile: initial.selectedProfile,

    /* ================================
       LOGIN
    ================================ */
    login: (data) => {
        const finalUser = {
            id: data.id,
            name: data.name,
            email: data.email,
            roles: data.roles,
        };

        const finalProfiles = data.profiles ?? null;

        set({
            user: finalUser,
            profiles: finalProfiles,
            token: data.token,
        });

        try {
            localStorage.setItem("auth_user", JSON.stringify(finalUser));

            if (finalProfiles) {
                localStorage.setItem("auth_profiles", JSON.stringify(finalProfiles));
            }

            localStorage.setItem("auth_token", data.token);
        } catch { }
    },

    /* ================================
       UPDATE TOKEN
    ================================ */
    setToken: (token) => {
        set({ token });

        try {
            if (token) localStorage.setItem("auth_token", token);
            else localStorage.removeItem("auth_token");
        } catch { }
    },

    /* ================================
       LOGOUT
    ================================ */
    logout: () => {
        set({
            user: null,
            profiles: null,
            token: null,
            selectedProfile: null,
        });

        try {
            localStorage.removeItem("auth_user");
            localStorage.removeItem("auth_profiles");
            localStorage.removeItem("auth_token");
            localStorage.removeItem("selectedProfile");
        } catch { }
    },

    /* ================================
       SELECT PROFILE
    ================================ */
    setSelectedProfile: (profile) => {
        set({ selectedProfile: profile });

        try {
            if (profile) {
                localStorage.setItem("selectedProfile", JSON.stringify(profile));
            } else {
                localStorage.removeItem("selectedProfile");
            }
        } catch { }
    },

    addProfile: (role, id) => {
        const prevProfiles = get().profiles || { organizer: null, supplier: null };

        const updated = {
            ...prevProfiles,
            [role]: id,
        };

        set({ profiles: updated });

        try {
            localStorage.setItem("auth_profiles", JSON.stringify(updated));
        } catch { }
    },

}));

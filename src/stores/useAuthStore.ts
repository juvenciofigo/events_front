import create from "zustand";

export type Profile = "organizer" | "supplier";

export type SelectedProfile = {
    id: string;
    profile: Profile;
};

export interface loginDataDTO {
    id: string;
    email: string;
    name: string;
    roles: string[];
    token: string;
    profiles: Profiles | null;
}

interface Profiles {
    organizer: string | null;
    supplier: string | null;
}

interface AuthState {
    user: { id: string; name: string; email: string; roles: string[] } | null;
    profiles: { organizer: string | null; supplier: string | null } | null;
    token: string | null;
    selectedProfile: SelectedProfile | null;
    login: (data: loginDataDTO) => void;
    setToken: (token: string | null) => void;
    logout: () => void;
    setProfile: (profile: SelectedProfile) => void;
}

// load initial state from localStorage so role/user persist across reloads during development
function readInitial() {
    try {
        const rawUser = localStorage.getItem("auth_user");
        const rawRole = localStorage.getItem("auth_profiles");
        const rawToken = localStorage.getItem("auth_token");
        const rawSelectedProfile = localStorage.getItem("selectedProfile");
        const user = rawUser ? JSON.parse(rawUser) : null;
        const profiles = rawRole ? JSON.parse(rawRole) : null;
        const token = rawToken ?? null;
        const selectedProfile = rawSelectedProfile ? JSON.parse(rawSelectedProfile) : null;
        return { user, profiles, token, selectedProfile };
    } catch {
        return { user: null, profiles: null, token: null, selectedProfile: null };
    }
}

const initial = readInitial();

export const useAuthStore = create<AuthState>((set, get) => ({
    user: initial.user,
    profiles: initial.profiles,
    token: initial.token,
    selectedProfile: initial.selectedProfile,
    login: (data: loginDataDTO) => {
        const finalProfiles = data.profiles ?? null;
        const finalUser = { id: data.id, name: data.name, email: data.email, roles: data.roles };
        set({ user: finalUser, profiles: finalProfiles, token: data.token });
        try {
            localStorage.setItem("auth_user", JSON.stringify(finalUser));
            if (finalProfiles) {
                localStorage.setItem("auth_profiles", JSON.stringify(finalProfiles));
            }
            if (data.token) {
                localStorage.setItem("auth_token", data.token);
            }
        } catch { }
    },
    setToken: (token) => {
        set({ token });
        try {
            if (token) localStorage.setItem("auth_token", token);
            else localStorage.removeItem("auth_token");
        } catch { }
    },
    logout: () => {
        set({ user: null, token: null, profiles: null });
        try {
            localStorage.removeItem("auth_user");
            localStorage.removeItem("auth_profiles");
            localStorage.removeItem("auth_token");
            localStorage.removeItem("selectedProfile");
        } catch { }
    },
    setProfile: (profile) => {
        set({ selectedProfile: profile });
        try {
            if (profile) {
                localStorage.setItem("selectedProfile", JSON.stringify(profile));
            } else {
                localStorage.removeItem("selectedProfile");
            }
        } catch { }
    },


}));

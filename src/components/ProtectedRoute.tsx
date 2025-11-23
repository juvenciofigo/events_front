import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore, Profile } from "../stores/useAuthStore";

interface Props {
    children: React.ReactElement;
    allowedProfile?: Array<Profile>;
}

export default function ProtectedRoute({ children, allowedProfile }: Props) {
    const user = useAuthStore((s: any) => s.user);
    const selectedProfile = useAuthStore((s: any) => s.selectedProfile);

    if (!user) {
        return (
            <Navigate
                to="/auth/login"
                replace
            />
        );
    }

    if (allowedProfile && !allowedProfile.includes(selectedProfile.profile)) {
        return (
            <Navigate
                to="/auth/role"
                replace
            />
        );
    }

    return children;
}

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore, SelectedProfile } from "../stores/useAuthStore";

interface Props {
    children: React.ReactElement;
    allowedProfile?: Array<SelectedProfile["role"]>;
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

    if (allowedProfile && !allowedProfile.includes(selectedProfile.role)) {
        return (
            <Navigate
                to="/auth/role"
                replace
            />
        );
    }

    return children;
}

import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "./components/Sidebar";
import { useGetOrganizerProfile, useGetSupplierProfile, usePresenceProfile } from "@/hooks/useProfile"
import { useToast } from "@/contexts/ToastContext";
import { organizerProfile, supplierProfile } from "@/stores/useProfileStore";
import Loading from "@/components/Loading";

export interface OutletContext {
    profile: organizerProfile | supplierProfile;
    role: "organizer" | "supplier";
}

export default function LayoutDashboard() {
    const toast = useToast();
    const location = useLocation();
    const navigate = useNavigate()
    const { status } = usePresenceProfile();
    console.log(status);

    let profileData;
    let isLoading;
    let error;
    let role;

    if (location.pathname.includes("/dashboard/organizers")) {
        const userOrganizer = useGetOrganizerProfile()
        profileData = userOrganizer.data;
        isLoading = userOrganizer.isLoading;
        error = userOrganizer.error;
        role = "organizer";
    } else if (location.pathname.includes("/dashboard/suppliers")) {
        const userSupplier = useGetSupplierProfile()
        profileData = userSupplier.data;
        isLoading = userSupplier.isLoading;
        error = userSupplier.error;
        role = "supplier";
    } else {
        navigate("/auth/role")
    }

    if (isLoading) {
        return <Loading text="Carregando perfil..." fullScreen />;
    }

    return (
        <div className="h-screen flex flex-col bg-background text-text font-sans selection:bg-primary selection:text-white">
            <Navbar />
            <div className="flex-1 flex overflow-hidden">
                <Outlet context={{ profile: profileData, role: role }} />
            </div>
        </div>
    );
}

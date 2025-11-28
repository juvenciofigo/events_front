import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useGetOrganizerProfile, useGetSupplierProfile } from "@/hooks/useProfile"
import { useToast } from "@/contexts/ToastContext";



export default function LayoutDashboard() {
    const toast = useToast();
    const location = useLocation();
    const navigate = useNavigate()

    let profileData;
    let isLoading;
    let error;
    let role;

    if (location.pathname === "/dashboard/organizers") {
        const userOrganizer = useGetOrganizerProfile()
        profileData = userOrganizer.data;
        isLoading = userOrganizer.isLoading;
        error = userOrganizer.error;
        role = "organizer";
    } else if (location.pathname === "/dashboard/suppliers") {
        const userSupplier = useGetSupplierProfile()
        profileData = userSupplier.data;
        isLoading = userSupplier.isLoading;
        error = userSupplier.error;
        role = "supplier";
    } else {
        navigate("/auth/role")
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background text-text p-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted">Carregando perfil...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        toast.error(error?.response?.data?.message)
        navigate("/auth/role")
        return null
    }


    return (
        <div className="min-h-screen flex bg-background text-text font-sans selection:bg-primary selection:text-white">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar />
                <main className="flex-1 p-4 overflow-y-auto">
                    <Outlet context={{ profile: profileData, role: role }} />
                </main>
            </div>
        </div>
    );
}

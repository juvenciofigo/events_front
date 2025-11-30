import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { organizerProfile } from "@/stores/useProfileStore";

interface OutletContext {
    profile: organizerProfile;
    role: "organizer";
}

export default function OrganizerDashboard() {

    const { profile: organizer } = useOutletContext<OutletContext>();
    return (
        <>
            <Sidebar />
            {/* Main content shifts when sidebar is visible on desktop */}
            <main className="flex-1 overflow-y-auto p-2 md:p-4">
                <Outlet context={{ profile: organizer, role: "organizer" }} />
            </main>
        </>
    );
}






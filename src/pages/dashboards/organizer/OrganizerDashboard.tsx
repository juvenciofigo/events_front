import Sidebar from "@/pages/dashboards/components/Sidebar";
import { Outlet } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { organizerProfile } from "@/stores/useProfileStore";
import {
    CalendarIcon,
    PlusCircleIcon,
    ShoppingBagIcon,
    BriefcaseIcon,
    ChatBubbleLeftRightIcon,
    CreditCardIcon,
    EnvelopeIcon,
    Squares2X2Icon
} from "@heroicons/react/24/outline";

export interface OutletContext {
    profile: organizerProfile;
    role: "organizer";
}

export default function OrganizerDashboard() {
    const { profile: organizer, role } = useOutletContext<OutletContext>();
    const navItems = [
        { path: `/dashboard/${role}s`, label: "Dashboard", icon: Squares2X2Icon },
        { path: `/dashboard/${role}s/events`, label: "Meus Eventos", icon: CalendarIcon },
        // { path: `/dashboard/${role}s/events/create`, label: "Criar Evento", icon: PlusCircleIcon },
        { path: `/marketplace`, label: "Marketplace", icon: ShoppingBagIcon },
        { path: `/dashboard/${role}s/marketplace/requests`, label: "Oportunidades", icon: BriefcaseIcon },
        { path: `/dashboard/${role}s/chat`, label: "Mensagens", icon: ChatBubbleLeftRightIcon },
        { path: "/plans", label: "Planos", icon: CreditCardIcon },
        { path: "/invitations", label: "Convites", icon: EnvelopeIcon },
    ];

    return (
        <>
            <Sidebar navItems={navItems} />
            {/* Main content shifts when sidebar is visible on desktop */}
            <main className="flex-1 overflow-y-auto">
                <Outlet context={{ profile: organizer, role: "organizer" }} />
            </main>
        </>
    );
}






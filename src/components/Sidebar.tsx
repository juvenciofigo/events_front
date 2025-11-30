import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    HomeIcon,
    CalendarIcon,
    PlusCircleIcon,
    ShoppingBagIcon,
    BriefcaseIcon,
    ChatBubbleLeftRightIcon,
    CreditCardIcon,
    EnvelopeIcon,
    Squares2X2Icon
} from "@heroicons/react/24/outline";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSystemStore } from "@/stores/useSystem";


export default function Sidebar({ className }: { className?: string }) {
    const { mobileMenuOpen } = useSystemStore();
    const location = useLocation();
    const selectedProfile = useAuthStore((s) => s.selectedProfile);

    const isActive = (path: string) => {
        if (path === `/dashboard/${selectedProfile?.role}s`) {
            return location.pathname === path;
        }
        return location.pathname === path || location.pathname.startsWith(path + "/");
    };

    const navItems = [
        { path: `/dashboard/${selectedProfile?.role}s`, label: "Dashboard", icon: Squares2X2Icon },
        { path: `/dashboard/${selectedProfile?.role}s/events`, label: "Meus Eventos", icon: CalendarIcon },
        { path: `/dashboard/${selectedProfile?.role}s/events/create`, label: "Criar Evento", icon: PlusCircleIcon },
        { path: `/dashboard/${selectedProfile?.role}s/marketplace`, label: "Marketplace", icon: ShoppingBagIcon },
        { path: `/dashboard/${selectedProfile?.role}s/marketplace/requests`, label: "Oportunidades", icon: BriefcaseIcon },
        { path: `/dashboard/${selectedProfile?.role}s/chat`, label: "Mensagens", icon: ChatBubbleLeftRightIcon },
        { path: "/plans", label: "Planos", icon: CreditCardIcon },
        { path: "/invitations", label: "Convites", icon: EnvelopeIcon },
    ];

    return (
        <aside className={`w-56 fixed  md:relative inset-y-0 left-0 top-[58px] md:top-0 z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 bg-surface-light dark:bg-surface border-r border-white/5 flex flex-col justify-between  ${className} ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} `}>
            <nav className="flex-1 overflow-y-auto p-2 space-y-1">
                {/* px-3 py-2 font-medium text-text-secondary hover:text-secondary hover:bg-white/5 rounded */}
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center px-3 py-2 rounded text-sm transition-all group ${isActive(item.path)
                            ? "bg-primary text-white font-semibold"
                            : "text-text-secondary hover:bg-white/5 hover:text-secondary"
                            }`}
                    >
                        <item.icon className={`w-4 h-4 mr-2 ${isActive(item.path) ? "text-white " : "text-text-secondary group-hover:text-secondary"
                            }`} />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="p-3 border-t text-text border-white/5">
                <div className="bg-gradient-to-br from-surface-hover to-surface rounded p-3 border border-white/5">
                    <h4 className="text-xs font-bold  mb-1">Precisa de ajuda?</h4>
                    <p className="text-[10px] text-text-muted mb-2">Confira nossa documentação ou fale com o suporte.</p>
                    <button className="w-full py-1.5 bg-white/5 hover:bg-white/10 text-[10px] font-bold rounded transition-colors">
                        Suporte
                    </button>
                </div>
            </div>
        </aside>
    );
}

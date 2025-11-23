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

export default function Sidebar() {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(path + "/");
    };

    const navItems = [
        { path: "/organizer", label: "Dashboard", icon: Squares2X2Icon },
        { path: "/events", label: "Meus Eventos", icon: CalendarIcon },
        { path: "/events/create", label: "Criar Evento", icon: PlusCircleIcon },
        { path: "/marketplace", label: "Marketplace", icon: ShoppingBagIcon },
        { path: "/marketplace/requests", label: "Oportunidades", icon: BriefcaseIcon },
        { path: "/chat", label: "Mensagens", icon: ChatBubbleLeftRightIcon },
        { path: "/plans", label: "Planos", icon: CreditCardIcon },
        { path: "/invitations", label: "Convites", icon: EnvelopeIcon },
    ];

    return (
        <aside className="w-56 bg-slate-900 border-r border-white/5 hidden md:flex flex-col">
            <div className="p-4 flex items-center justify-center border-b border-white/5">
                <Link to="/" className="text-lg font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-cyan-500">
                    EVENTS.IO
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center px-3 py-2 rounded-lg text-sm transition-all group ${isActive(item.path)
                            ? "bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-900/20 font-semibold"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <item.icon className={`w-4 h-4 mr-2 ${isActive(item.path) ? "text-white" : "text-slate-500 group-hover:text-white"
                            }`} />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="p-3 border-t border-white/5">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-3 border border-white/5">
                    <h4 className="text-xs font-bold text-white mb-1">Precisa de ajuda?</h4>
                    <p className="text-[10px] text-slate-400 mb-2">Confira nossa documentação ou fale com o suporte.</p>
                    <button className="w-full py-1.5 bg-white/5 hover:bg-white/10 text-[10px] font-bold text-white rounded-md transition-colors">
                        Suporte
                    </button>
                </div>
            </div>
        </aside>
    );
}

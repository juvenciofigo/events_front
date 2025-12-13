import React from "react";
import { Link, useLocation } from "react-router-dom";

import { useAuthStore } from "@/stores/useAuthStore";
import { useSystemStore } from "@/stores/useSystem";

export interface SidebarProps {
    className?: string;
    navItems: {
        path: string;
        label: string;
        icon: React.ComponentType<{ className?: string }>;
    }[];
}

export default function Sidebar({ className, navItems }: SidebarProps) {
    const { mobileMenuOpen, hideLabelSidebar } = useSystemStore();
    const location = useLocation();
    const selectedProfile = useAuthStore((s) => s.selectedProfile);

    const isActive = (path: string) => {
        if (path === `/dashboard/${selectedProfile?.role}s`) {
            return location.pathname === path;
        }
        return location.pathname === path || location.pathname.startsWith(path + "/");
    };

    return (
        <aside className={`fixed lg:relative ${hideLabelSidebar && !mobileMenuOpen ? "w-16" : "w-56"} inset-y-0 left-0 top-[60px] lg:top-0 z-50 transform transition-all duration-300 ease-in-out lg:translate-x-0  bg-surface border border-borderColor flex flex-col justify-between  ${className} ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <nav className="flex-1 overflow-y-auto p-2 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center px-3 py-2 rounded text-sm transition-all group ${isActive(item.path)
                            ? "bg-primary text-white font-semibold"
                            : "text-text-secondary hover:bg-white/5 hover:text-secondary"
                            }`}
                    >
                        <item.icon className={` ${hideLabelSidebar && !mobileMenuOpen ? "w-6 h-6" : "w-4 h-4"} ${isActive(item.path) ? "text-white " : "text-text-secondary group-hover:text-secondary"
                            }`} />
                        <span className={`${hideLabelSidebar ? "hidden" : ""} ml-2 whitespace-nowrap`}>{item.label}</span>
                    </Link>
                ))}
            </nav>

            {!hideLabelSidebar && !mobileMenuOpen && <div className="p-3 border-t text-text border-white/5">
                <div className="bg-gradient-to-br from-surface-hover to-surface rounded p-3 border border-white/5">
                    <h4 className="text-xs font-bold  mb-1">Precisa de ajuda?</h4>
                    <p className="text-[10px] text-text-muted mb-2">Confira nossa documentação ou fale com o suporte.</p>
                    <button className="w-full py-1.5 bg-white/5 hover:bg-white/10 text-[10px] font-bold rounded transition-colors">
                        Suporte
                    </button>
                </div>
            </div>}
        </aside>
    );
}

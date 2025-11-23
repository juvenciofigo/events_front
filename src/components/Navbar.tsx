import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useTheme } from "../hooks/useTheme";
import {
    BellIcon,
    MagnifyingGlassIcon,
    ChevronDownIcon,
    SunIcon,
    MoonIcon
} from "@heroicons/react/24/outline";
import Button from "./Form/Button";
import NotificationList from "./NotificationList";
import ToggleTheme from "./ToggleTheme";

export default function Navbar() {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const { theme, toggleTheme } = useTheme();
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="w-full bg-surface/50 backdrop-blur-md border-b border transition-colors p-3 flex items-center justify-between sticky top-0 z-40">

            {/* Search Bar (Optional/Placeholder) */}
            <div className="hidden md:flex items-center bg-background/50 border rounded-full px-3 py-1.5 w-80 focus-within:border-primary/50 transition-colors">
                <MagnifyingGlassIcon className="w-4 h-4 text-muted mr-2" />
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="bg-transparent border-none text-xs text-text placeholder-text-muted focus:ring-0 w-full"
                />
            </div>

            <div className="flex items-center gap-4 ml-auto">
                {/* Theme Toggle */}
                <ToggleTheme />

                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`relative text-muted hover:text-text transition-colors p-1.5 rounded-lg ${showNotifications ? 'bg-surface-hover text-text' : ''}`}
                    >
                        <BellIcon className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 top-full mt-2 z-50 w-80 md:w-96">
                            <NotificationList />
                        </div>
                    )}
                </div>

                {/* User Profile */}
                {user ? (
                    <div className="flex items-center gap-2 pl-4 border-l border">
                        <div className="text-right hidden md:block">
                            <div className="text-xs font-bold text-text">{user.name}</div>
                            <div className="text-[10px] text-muted capitalize">{user.roles?.[0] || "User"}</div>
                        </div>
                        <button className="flex items-center gap-1.5 group">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white text-sm font-bold border-2 border-surface group-hover:border-primary transition-colors">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <ChevronDownIcon className="w-3 h-3 text-muted group-hover:text-text transition-colors" />
                        </button>
                        <Button
                            fullWidth={false}
                            size="sm"
                            variant="danger"
                            onClick={logout}
                        >
                            Sair
                        </Button>
                    </div>
                ) : (
                    <span className="text-xs text-muted">Não autenticado</span>
                )}
            </div>
        </header>
    );
}

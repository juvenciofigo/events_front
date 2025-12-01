import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useTheme } from "../hooks/useTheme";
import {
    BellIcon,
    MagnifyingGlassIcon,
    ChevronDownIcon,
    SunIcon,
    MoonIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    Cog6ToothIcon,
    SwatchIcon
} from "@heroicons/react/24/outline";
import Button from "./Form/Button";
import NotificationList from "./NotificationList";
import ToggleTheme from "./ToggleTheme";
import Logo from "./Logo";
import PathMorphing, { MENU_PATHS } from "./transitions/PathMorphing";
import { useSystemStore } from "../stores/useSystem";
import { useProfileStore } from "../stores/useProfileStore";

export default function Navbar() {
    const { setMobileMenuOpen } = useSystemStore();
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const { theme, toggleTheme } = useTheme();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const selectedProfile = useAuthStore((s) => s.selectedProfile);
    const profile = useProfileStore((s) => s.getProfile());
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setShowProfileMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (

        <header className="w-full bg-surface/50 backdrop-blur-md border-b border-borderColor transition-colors p-2 flex items-center justify-between sticky top-0 z-40">

            <div className="flex gap-2">
                <PathMorphing aria-label="Toggle menu" onClick={() => setMobileMenuOpen()} paths={MENU_PATHS} className="flex md:hidden" />
                <Logo />
            </div>

            <div className="flex items-center">
                {/* Theme Toggle */}
                <ToggleTheme />

                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`relative text-muted hover:text-text mr-1 hover:bg-surface-hover transition-colors p-2 rounded-lg ${showNotifications ? 'bg-surface-hover text-text' : ''}`}
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
                {user && selectedProfile ? (
                    <div className="relative" ref={profileMenuRef}>
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className={`flex items-center gap-2 p-2 rounded hover:bg-surface-hover  transition-colors ${showProfileMenu ? 'bg-surface-hover text-text' : ''}`}
                        >
                            <div className="text-right hidden md:block">
                                <div className="text-xs font-bold text-text">{profile?.companyName}</div>
                                <div className="text-[10px] text-muted capitalize">{selectedProfile.role === "organizer" ? "Organizador" : "Fornecedor"}</div>
                            </div>
                            <div className="flex sm:hidden items-center gap-1.5 group">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-text text-sm font-bold border-2 border-borderColore group-hover:border-primary transition-colors">
                                    {profile?.companyName.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <ChevronDownIcon className={`w-3 h-3 text-muted transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {showProfileMenu && (
                            <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-borderColor rounded shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                                <div className="p-2 border-b border-borderColor mb-1">
                                    <p className="text-sm font-bold text-text">{profile?.companyName}</p>
                                    <p className="text-xs text-muted truncate">{user?.email}</p>
                                </div>

                                <div className="px-1">
                                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text hover:bg-surface-hover rounded transition-colors">
                                        <UserCircleIcon className="w-4 h-4 text-muted" />
                                        Meu Perfil
                                    </button>
                                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text hover:bg-surface-hover rounded transition-colors">
                                        <SwatchIcon className="w-4 h-4 text-muted" />
                                        Aparência
                                    </button>
                                    <button
                                        onClick={() => window.location.href = '/auth/role'}
                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text hover:bg-surface-hover rounded transition-colors"
                                    >
                                        <ArrowRightOnRectangleIcon className="w-4 h-4 text-muted" />
                                        Trocar Perfil
                                    </button>
                                </div>

                                <div className="border-t border-borderColor mt-1 pt-1 px-1">
                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-error/10 rounded transition-colors"
                                    >
                                        <Cog6ToothIcon className="w-4 h-4" />
                                        Sair
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <span className="text-xs text-muted">Não autenticado</span>
                )}
            </div>
        </header>
    );
}

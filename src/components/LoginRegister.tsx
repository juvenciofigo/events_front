import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import Button from "./Form/Button";

interface LoginRegisterProps {
    onClose?: () => void;
    mobile?: boolean;
}

export default function LoginRegister({ onClose, mobile = false }: LoginRegisterProps) {
    const user = useAuthStore((s) => s.user);
    const selectedProfile = useAuthStore((s) => s.selectedProfile);
    const logout = useAuthStore((s) => s.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
        if (onClose) onClose();
    };

    const handleLinkClick = () => {
        if (onClose) onClose();
    };

    if (user) {
        return (
            <div className={`flex ${mobile ? 'flex-col items-stretch gap-2' : 'items-center gap-4'}`}>
                <Link
                    to={selectedProfile ?
                        selectedProfile.role === "organizer" ? `/dashboard/organizers` : '/dashboard/suppliers' : '/auth/role'}
                    className={`hover:text-secondary hover:bg-white/5 transition-all ${mobile ? 'px-3 py-2' : 'px-3 py-2'}`}
                    onClick={handleLinkClick}
                >
                    Dashboard
                </Link>

                <Button
                    className={mobile ? `rounded-none` : `rounded-none`}
                    fullWidth={mobile}
                    size="sm"
                    variant="danger"
                    onClick={handleLogout}
                >
                    Sair
                </Button>
            </div>
        );
    }

    return (
        <div className={`flex ${mobile ? 'flex-col items-stretch gap-2' : 'items-center gap-2'}`}>
            <Link
                to="/auth/login"
                className={`font-bold dark:bg-white/10 bg-surface-light hover:bg-white/20 border border-white/10 rounded backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-[0_0_15px_rgba(192,38,211,0.3)] ${mobile ? 'px-3 py-2 text-center' : 'px-2 py-1'}`}
                onClick={handleLinkClick}
            >
                Login
            </Link>
            <Link
                to="/auth/register"
                className={`font-bold dark:bg-white/10 bg-surface-light hover:bg-white/20 border border-white/10 rounded backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-[0_0_15px_rgba(192,38,211,0.3)] ${mobile ? 'px-3 py-2 text-center' : 'px-2 py-1'}`}
                onClick={handleLinkClick}
            >
                Começar Agora
            </Link>
        </div>
    );
}
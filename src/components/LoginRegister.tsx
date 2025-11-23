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
                    to="/auth/role"
                    className={`text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all ${mobile ? 'px-3 py-2' : 'px-3 py-2'}`}
                    onClick={handleLinkClick}
                >
                    Dashboard
                </Link>

                <Button
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
                className={`text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded backdrop-blur-sm transition-all hover:border-fuchsia-500/50 hover:shadow-[0_0_15px_rgba(217,70,239,0.3)] ${mobile ? 'px-3 py-2 text-center' : 'px-2 py-1'}`}
                onClick={handleLinkClick}
            >
                Login
            </Link>
            <Link
                to="/auth/register"
                className={`text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded backdrop-blur-sm transition-all hover:border-fuchsia-500/50 hover:shadow-[0_0_15px_rgba(217,70,239,0.3)] ${mobile ? 'px-3 py-2 text-center' : 'px-2 py-1'}`}
                onClick={handleLinkClick}
            >
                Começar Agora
            </Link>
        </div>
    );
}
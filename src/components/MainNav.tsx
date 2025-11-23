import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, MoonIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "./Logo";
import LoginRegister from "./LoginRegister";
import ToggleTheme from "./ToggleTheme";

export default function MainNav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-surface/50 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Logo />

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    <ToggleTheme />
                    <Link
                        to="/explore"
                        className="text-xs font-medium text-text-secondary hover:text-secondary transition-colors"
                    >
                        Explorar Eventos
                    </Link>
                    <Link
                        to="/features"
                        className="text-xs font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                    >
                        Recursos
                    </Link>
                    <Link
                        to="/plans"
                        className="text-xs font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                    >
                        Preços
                    </Link>
                    <Link
                        to="/blog"
                        className="text-xs font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                    >
                        Blog
                    </Link>
                    <LoginRegister />
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <XMarkIcon className="w-5 h-5" />
                    ) : (
                        <Bars3Icon className="w-5 h-5" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10">
                    <nav className="flex flex-col space-y-0.5 px-4 py-3">
                        <Link
                            to="/explore"
                            className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Explorar Eventos
                        </Link>
                        <Link
                            to="/features"
                            className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Recursos
                        </Link>
                        <Link
                            to="/plans"
                            className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Preços
                        </Link>
                        <Link
                            to="/blog"
                            className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Blog
                        </Link>
                        <div className="border-t border-white/10 my-1.5"></div>

                        <LoginRegister mobile onClose={() => setMobileMenuOpen(false)} />
                    </nav>
                </div>
            )}
        </header>
    );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "./Logo";
import LoginRegister from "./LoginRegister";
import ToggleTheme from "./ToggleTheme";
import PathMorphing, { MENU_PATHS } from "./transitions/PathMorphing";

interface Props {
    children?: React.ReactNode;
}

const buttons = [
    {
        label: "Explorar Eventos",
        link: "/explore"
    },
    {
        label: "Recursos",
        link: "/features"
    },
    {
        label: "Preços",
        link: "/plans"
    },
    {
        label: "Blog",
        link: "/blog"
    },
]

export default function MainNav({ children }: Props) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="relative backdrop-blur-lg bg-surface/50 border-b border-borderColor-light text-xs dark:border-white/20 text-black dark:text-white">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center font-semibold">
                    {/* Logo */}
                    <Logo />

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <ToggleTheme />
                        {buttons.map((item) =>
                            <Link
                                to={item.link}
                                className="text-text-secondary hover:text-secondary transition-colors"
                            >{item.label}</Link>
                        )}
                        <LoginRegister />
                    </nav>

                    {/* Mobile Menu Button */}

                    <div className="flex items-center space-x-1 md:hidden">
                        <ToggleTheme />
                        <PathMorphing aria-label="Toggle menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} paths={MENU_PATHS} className="" />
                    </div>

                </div>
            </div>

            {children}

            {/* Mobile Menu - Fixed to appear above everything */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed top-15 left-0 right-0 z-50 bg-background backdrop-blur-xl border-b border-colorBorder-light">
                    <nav className="flex flex-col space-y-0.5 px-4 py-3 text-xs">
                        {buttons.map((item) =>
                            <Link
                                onClick={() => setMobileMenuOpen(false)}
                                to={item.link}
                                className="px-3 py-2 font-medium text-text-secondary hover:text-secondary hover:bg-white/5 rounded transition-all"
                            >{item.label}</Link>
                        )}

                        <div className="border-t border-white/10 my-1.5"></div>

                        <LoginRegister mobile onClose={() => setMobileMenuOpen(false)} />
                    </nav>
                </div>
            )}
        </header>
    );
}

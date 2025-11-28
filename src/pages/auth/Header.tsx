import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Logo from "@/components/Logo";

interface HeaderProps {
    p: string;
    h: string;
    back?: {
        backLink: string;
        backTitle: string

    }
}


export default function Header({ p, h, back }: HeaderProps) {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-col gap-5 items-center text-center mt-1">
                <Link
                    to={back?.backLink || "/"}
                    className="text-sm self-start text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                    ← {back?.backTitle || "Página Principal"}
                </Link>
                {/* Back Link */}

                <Logo />

            </div >
            <div className="text-center mt-4">
                <h2 className="text-xl md:text-2xl font-black tracking-tight">{h}</h2>
                <p className="text-xs md:text-base text-text-muted">{p}</p>
            </div>
        </>
    );
}
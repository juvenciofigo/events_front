import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Logo from "@/components/Logo";

export default function Header({ p, h }: { p: string, h: string }) {
    return (
        <>
            <div className="flex flex-col gap-5 items-center text-center mt-1">
                <Link
                    to="/"
                    className="inline-flex self-start items-center gap-2 text-muted hover:text-text transition-colors "
                >
                    <ArrowLeftIcon className="w-2 h-2" />
                    <span className="text-xs">Voltar</span>
                </Link>

                <Logo />

            </div >
            <div className="text-center mt-4">
                <h2 className="text-xl font-black tracking-tight">{h}</h2>
                <p className="text-xs text-text-muted">{p}</p>
            </div>
        </>
    );
}
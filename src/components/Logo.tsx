import { SparklesIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

export default function Logo({ className }: { className?: string }) {
    return (

        <Link to="/" className="flex items-center text-center gap-2 group">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-tr from-primary to-secondary rounded-md flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <SparklesIcon className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-center font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-text via-primary to-text animate-gradient-x-slow text-xs md:text-xl">
                PROVIDENCES
            </span>
        </Link>

    );
}

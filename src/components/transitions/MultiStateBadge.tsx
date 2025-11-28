import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export type BadgeState = "idle" | "loading" | "success" | "error";

interface MultiStateBadgeProps {
    state: BadgeState;
    labels?: Record<BadgeState, string>;
    className?: string;
}

const variants = {
    initial: { y: -20, opacity: 0, filter: "blur(4px)" },
    animate: { y: 0, opacity: 1, filter: "blur(0px)" },
    exit: { y: 20, opacity: 0, filter: "blur(4px)" },
};

const colorMap: Record<BadgeState, string> = {
    idle: "bg-surface-light text-text-muted border-borderColor",
    loading: "bg-blue-100 text-blue-600 border-blue-200",
    success: "bg-green-100 text-green-600 border-green-200",
    error: "bg-red-100 text-red-600 border-red-200",
};

export default function MultiStateBadge({
    state,
    labels = {
        idle: "Aguardando",
        loading: "Processando...",
        success: "Concluído",
        error: "Erro",
    },
    className = "",
}: MultiStateBadgeProps) {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-300 ${colorMap[state]} ${className}`}>
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={state}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                    className="flex items-center gap-1"
                >
                    {state === "loading" && (
                        <svg className="animate-spin h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                    {labels[state]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}

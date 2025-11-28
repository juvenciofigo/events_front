import React, { useState } from "react";
import { motion } from "framer-motion";

interface PathMorphingProps {
    paths: string[];
    className?: string;
    width?: number;
    height?: number;
    color?: string;
    onClick?: () => void;
}

export default function PathMorphing({
    paths,
    className = "",
    width = 24,
    height = 24,
    color = "currentColor",
    onClick,
    ...rest
}: PathMorphingProps) {
    const [index, setIndex] = useState(0);

    const handleClick = () => {
        setIndex((prev) => (prev + 1) % paths.length);
        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            {...rest}
            onClick={handleClick}
            className={`inline-flex items-center justify-center hover:bg-white/10 transition-colors ${className}`}
            title="Click to morph"
        >
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                    d={paths[index]}
                    stroke={color}
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={false}
                    animate={{ d: paths[index] }}
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                        // Morphing requires matching number of points for best results, 
                        // but framer-motion handles simple morphs well.
                    }}
                />
            </svg>
        </button>
    );
}

// Example paths (Menu <-> Close)
export const MENU_PATHS = [
    "M4 6h16M4 12h16M4 18h16", // Menu (Hamburger)
    "M6 18L18 6M6 6l12 12"     // Close (X)
];

// Example paths (Check <-> Arrow)
export const CHECK_ARROW_PATHS = [
    "M5 12l5 5l10 -10", // Check
    "M5 12h14M12 5l7 7l-7 7" // Arrow Right (approx) - needs single path for best morph
];

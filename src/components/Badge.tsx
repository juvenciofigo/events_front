import React from "react";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "outline" | "default";
    className?: string;
}

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors";

    const variants = {
        default: "bg-blue-100 text-blue-800",
        primary: "bg-primary/10 text-primary border border-primary/20",
        secondary: "bg-secondary/10 text-secondary border border-secondary/20",
        outline: "bg-transparent border border-borderColor text-text-muted"
    };

    const variantClasses = variants[variant] || variants.default;

    return (
        <span className={`${baseClasses} ${variantClasses} ${className}`}>
            {children}
        </span>
    );
}

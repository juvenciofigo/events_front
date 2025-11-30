import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    fullWidth?: boolean;
    label?: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
    (
        {
            variant = "primary",
            size = "md",
            isLoading = false,
            fullWidth = false,
            label="",
            children,
            className = "",
            disabled,
            onClick,
            ...rest
        },
        ref
    ) => {
        const baseStyles = "font-bold rounded transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

        const variantStyles = {
            primary: "bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white shadow-lg shadow-primary/20 focus:ring-primary",
            secondary: "bg-white/5 hover:bg-white/10 border border-white/10 text-white focus:ring-white/20",
            danger: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-900/20 focus:ring-red-500",
            ghost: "bg-transparent hover:bg-white/5 text-white focus:ring-white/20",
        };

        const sizeStyles = {
            sm: "px-2 py-1 text-xs",
            md: "px-3 py-1 text-sm",
            lg: "px-4 py-2 text-base",
        };

        const widthStyle = fullWidth ? "w-full" : "w-fit";

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
                disabled={disabled || isLoading}
                onClick={onClick}
                {...rest}
            >
                {isLoading && (
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {children} {label}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;

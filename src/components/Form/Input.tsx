import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    errors?: any;
    className?: string;
    icon?: React.ReactNode;
    InputClassName?: string;
    isRequired?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
    ({ label, errors, className, icon, InputClassName, isRequired, ...rest }, ref) => {
        return (
            <div className={`${className}`}>
                {label && <div className="mb-2 text-xs font-medium text-text dark:text-text-secondary">{label} {isRequired && <span className="text-red-600">*</span>}</div>}
                <div className="relative">
                    {icon && (
                        <div className="absolute top-1 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`w-full  bg-slate-900/10  border-black/20  dark:bg-background/80 border dark:border-white/10 rounded text-xs md:text-sm  dark:text-white dark:placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all ${InputClassName}`}
                        {...rest}
                    />
                    {errors && <div className="text-xs text-red-400 mt-1">{errors.message}</div>}
                </div>
            </div>
        );
    }
);
Input.displayName = "Input";

export default Input;

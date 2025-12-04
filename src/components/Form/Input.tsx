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
                {label && <div className="mb-2 text-xs font-medium text-text">{label} {isRequired && <span className="text-red-600">*</span>}</div>}
                <div className="relative">
                    {icon && (
                        <div className="absolute top-1 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`w-full mb-1 md:py-2 py-1 bg-background border border-borderColor rounded text-xs md:text-sm  text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all ${InputClassName}`}
                        {...rest}
                    />
                    {errors && <div className="absolute text-xs text-red-400">{errors.message}</div>}
                </div>
            </div>
        );
    }
);
Input.displayName = "Input";

export default Input;

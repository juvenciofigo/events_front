import React from "react";

interface SelectProps {
    options: { value: string; label: string }[];
    value: string;
    label?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    icon?: React.ReactNode;
    selectClassName?: string;
    isRequired?: boolean;
}

export default function Select({ options, value, label, onChange, className = "", icon, selectClassName = "", isRequired = false }: SelectProps) {
    return (
        <div className={`${className} relative flex flex-col`}>
            {label && <div className="mb-2 text-xs font-medium  text-text dark:text-text-secondary">{label} {isRequired && <span className="text-red-600">*</span>}</div>}
            <div className="relative">
                {icon && (
                    <div className="absolute top-0 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <select
                    value={value}
                    onChange={onChange}
                    className={`w-full bg-slate-900/10 border-black/20  dark:bg-background/80 border dark:border-white/10 rounded text-xs md:text-sm  dark:text-white dark:placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all  ${selectClassName}`}
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

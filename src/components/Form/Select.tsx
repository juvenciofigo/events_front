import React from "react";
export interface SelectOption {
    value: string,
    label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[];
    label?: string;
    errors?: any;
    className?: string;
    icon?: React.ReactNode;
    selectClassName?: string;
    isRequired?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ options, label, errors, className = "", icon, selectClassName = "", isRequired = false, ...rest }, ref) => {
        return (
            <div className={`${className} relative flex flex-col`}>
                {label && <div className="mb-2 text-xs font-medium  text-text">{label} {isRequired && <span className="text-red-600">*</span>}</div>}
                <div className="relative">
                    {icon && (
                        <div className="absolute top-0 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {icon}
                        </div>
                    )}
                    <select
                        ref={ref}
                        className={`w-full border border-borderColor bg-background rounded text-xs md:text-sm  text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all  ${selectClassName} bg-surface`}
                        {...rest}
                    >
                        {options.map(opt => (
                            <option key={opt.value} value={opt.value} className="">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {errors && <div className="absolute text-xs text-red-400 mt-1">{errors.message}</div>}
                </div>
            </div>
        );
    }
);

Select.displayName = "Select";

export default Select;

import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    errors?: any;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
    ({ label, errors, ...rest }, ref) => {
        return (
            <div className="">
                {label && <div className="mb-2 text-xs font-medium text-slate-300">{label}</div>}
                <input
                    ref={ref}
                    className="w-full px-3 py-2 text-sm bg-slate-950/50 border border-white/10 rounded text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all"
                    {...rest}
                />
                {errors && <div className="text-xs text-red-400 mt-1">{errors.message}</div>}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;

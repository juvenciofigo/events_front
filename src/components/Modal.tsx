import React from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 z-10 w-full max-w-2xl shadow-2xl shadow-fuchsia-900/20">
                {title && <h3 className="text-xl font-bold text-white mb-4">{title}</h3>}
                <div className="text-slate-300">{children}</div>
                <div className="mt-6 text-right">
                    <button
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors font-medium"
                        onClick={onClose}>
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}

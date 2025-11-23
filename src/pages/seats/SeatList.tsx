import React from "react";

export default function SeatList({ seats }: { seats?: Array<{ id: string; name: string; x: number; y: number }> }) {
    return (
        <div className="bg-surface/50 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-text mb-4">Lista de Assentos</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {(!seats || seats.length === 0) && (
                    <div className="p-4 bg-white/5 rounded-xl text-muted text-center border border-white/5 border-dashed">
                        Nenhum assento criado
                    </div>
                )}
                {seats?.map((s) => (
                    <div
                        key={s.id}
                        className="p-4 bg-surface border border-white/5 rounded-xl flex justify-between items-center hover:border-primary/30 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary-light flex items-center justify-center text-xs font-bold border border-primary/30">
                                {s.name}
                            </div>
                            <div>
                                <div className="font-bold text-text">{s.name}</div>
                                <div className="text-xs text-muted">
                                    x: {s.x} • y: {s.y}
                                </div>
                            </div>
                        </div>
                        <div className="text-xs text-text-disabled font-mono group-hover:text-muted transition-colors">#{s.id.slice(-4)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

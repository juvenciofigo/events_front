import React, { useState } from "react";

type Seat = {
    id: string;
    name: string;
    x: number;
    y: number;
};

export default function SeatMap({ initial = [] as Seat[], onChange }: { initial?: Seat[]; onChange?: (seats: Seat[]) => void }) {
    const [seats, setSeats] = useState<Seat[]>(initial);

    function addSeat(e: React.MouseEvent<HTMLDivElement>) {
        const rect = (e.target as HTMLDivElement).getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);
        const seat: Seat = { id: String(Date.now()), name: `S${seats.length + 1}`, x, y };
        const next = [...seats, seat];
        setSeats(next);
        onChange?.(next);
    }

    return (
        <div
            className="w-full h-96 bg-slate-950 border border-white/10 rounded-2xl relative overflow-hidden cursor-crosshair"
            onClick={addSeat}>
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            {seats.map((s) => (
                <div
                    key={s.id}
                    style={{ left: s.x - 12, top: s.y - 12 }}
                    className="absolute w-8 h-8 rounded-full bg-fuchsia-600 border-2 border-white/20 text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-fuchsia-900/50 hover:scale-110 transition-transform cursor-pointer">
                    {s.name}
                </div>
            ))}
            {seats.length === 0 && (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 pointer-events-none">
                    <p className="mb-2">Clique no mapa para adicionar assentos</p>
                    <span className="text-xs opacity-50">Arraste para mover (em breve)</span>
                </div>
            )}
        </div>
    );
}

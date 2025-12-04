import { Seat } from "@/types/seat";
import React, { useState } from "react";

export default function SeatMap({ initial = [] as Seat[], onChange }: { initial?: Seat[]; onChange?: (seats: Seat[]) => void }) {
    const [seats, setSeats] = useState<Seat[]>(initial);
    const [draggingSeat, setDraggingSeat] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    // Atualiza quando os assentos externos mudam
    React.useEffect(() => {
        setSeats(initial);
    }, [initial]);

    function handleMouseDown(e: React.MouseEvent, seatId: string) {
        e.stopPropagation();
        const seat = seats.find(s => s.id === seatId);
        if (!seat) return;

        const rect = e.currentTarget.parentElement!.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - seat.layoutPositionX;
        const offsetY = e.clientY - rect.top - seat.layoutPositionY;

        setDraggingSeat(seatId);
        setDragOffset({ x: offsetX, y: offsetY });
    }

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!draggingSeat) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left - dragOffset.x));
        const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top - dragOffset.y));

        const updatedSeats = seats.map(s =>
            s.id === draggingSeat
                ? { ...s, layoutPositionX: Math.round(x), layoutPositionY: Math.round(y) }
                : s
        );

        setSeats(updatedSeats);
    }

    function handleMouseUp() {
        if (draggingSeat) {
            setDraggingSeat(null);
            onChange?.(seats);
        }
    }

    return (
        <div
            className="w-full h-96 bg-surface-light border border-white/10 rounded relative overflow-hidden select-none"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            {seats.map((s) => (
                <div
                    key={s.id}
                    style={{
                        left: s.layoutPositionX - 16,
                        top: s.layoutPositionY - 16,
                        cursor: draggingSeat === s.id ? 'grabbing' : 'grab'
                    }}
                    className={`absolute w-8 h-8 rounded-full bg-primary border-2 border-white/20 text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-primary/50 hover:scale-110 transition-transform ${draggingSeat === s.id ? 'scale-110 z-50' : ''
                        }`}
                    onMouseDown={(e) => handleMouseDown(e, s.id)}
                >
                    {s.name}
                </div>
            ))}
            {seats.length === 0 && (
                <div className="w-full h-full flex flex-col items-center justify-center text-text-muted pointer-events-none">
                    <p className="mb-2">Nenhum assento criado ainda</p>
                    <span className="text-xs opacity-50">Crie assentos usando o formulário</span>
                </div>
            )}
        </div>
    );
}

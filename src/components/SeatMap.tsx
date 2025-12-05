import { Seat } from "@/types/seat";
import React, { useEffect, useState } from "react";
import { useUpdateSeat } from "@/hooks/useSeats";
import { useToast } from "@/contexts/ToastContext";
import Loading from "./Loading";

interface SeatMapProps {
    initial?: Seat[];
    onChange?: (seats: Seat[]) => void;
    eventId?: string;
}

export default function SeatMap({ initial = [] as Seat[], onChange, eventId }: SeatMapProps) {
    const [seats, setSeats] = useState<Seat[]>(initial);
    const [draggingSeat, setDraggingSeat] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const toast = useToast();
    const updateSeat = useUpdateSeat();
    const [loading, setLoading] = useState(false);

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

    async function handleMouseUp() {
        if (draggingSeat) {
            const updatedSeat = seats.find(s => s.id === draggingSeat);

            if (updatedSeat && eventId) {
                setLoading(true);
                updateSeat.mutate({ data: updatedSeat }, {
                    onSuccess: () => {
                        toast.success("Assento atualizado com sucesso.");
                        setLoading(false);
                        setDraggingSeat(null);
                        onChange?.(seats);
                    },
                    onError: (error: any) => {
                        toast.error(error?.response?.data?.message || "Erro ao atualizar assento.");
                        setLoading(false);
                        setDraggingSeat(null);
                    },
                });
            } else {
                setDraggingSeat(null);
                onChange?.(seats);
            }
        }
    }

    if (loading) {
        return (
            <div className="w-full h-96 flex items-center justify-center">
                <Loading />
            </div>
        )
    }
    return (
        <div className="w-full">
            {/* Mobile scroll hint */}
            <div className="md:hidden mb-2 text-center text-xs text-text-muted bg-surface-light/50 rounded">
                💡 Dica: Deslize para ver todo o mapa
            </div>

            {/* Seat map container with scroll support */}
            <div className="w-full overflow-auto relative rounded border border-white/10" style={{ scrollbarWidth: 'thin' }}>
                {/* Scroll indicator - right edge */}
                <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-background/80 to-transparent pointer-events-none z-10 md:hidden"></div>
                {/* Scroll indicator - bottom edge */}
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-background/80 to-transparent pointer-events-none z-10 md:hidden"></div>

                <div
                    className="bg-surface-light rounded relative overflow-hidden select-none w-[800px] h-96"
                    style={{
                        touchAction: 'none'
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchMove={(e) => {
                        const touch = e.touches[0];
                        const mouseEvent = new MouseEvent('mousemove', {
                            clientX: touch.clientX,
                            clientY: touch.clientY,
                            bubbles: true
                        });
                        e.currentTarget.dispatchEvent(mouseEvent);
                    }}
                    onTouchEnd={handleMouseUp}
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
                            className={`absolute w-min whitespace-nowrap p-1 rounded bg-primary border-2 border-white/20 text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-primary/50 hover:scale-110 transition-transform ${draggingSeat === s.id ? 'scale-110 z-50' : ''
                                }`}
                            onMouseDown={(e) => handleMouseDown(e, s.id)}
                            onTouchStart={(e) => {
                                const touch = e.touches[0];
                                const mouseEvent = new MouseEvent('mousedown', {
                                    clientX: touch.clientX,
                                    clientY: touch.clientY,
                                    bubbles: true
                                }) as any;
                                handleMouseDown(mouseEvent, s.id);
                            }}
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
            </div>
        </div>
    );
}

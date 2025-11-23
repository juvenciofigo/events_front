import React, { useState } from "react";
import SeatMap from "../../components/SeatMap";
import SeatForm from "../seats/SeatForm";
import SeatList from "../seats/SeatList";
import Modal from "../../components/Modal";
import { PlusIcon } from "@heroicons/react/24/outline";

type Seat = { id: string; name: string; x: number; y: number };

export default function EventSeats() {
    const [seats, setSeats] = useState<Seat[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: List & Actions */}
            <div className="space-y-6">
                <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Gerenciar Assentos</h3>
                    <p className="text-slate-400 text-sm mb-6">
                        Crie e organize o mapa de assentos do seu evento. Clique no mapa para adicionar ou use o botão abaixo.
                    </p>
                    <button
                        className="w-full px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-xl shadow-lg shadow-fuchsia-900/20 transition-all flex items-center justify-center font-bold"
                        onClick={() => setModalOpen(true)}>
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Novo Assento
                    </button>
                </div>

                <SeatList seats={seats} />
            </div>

            {/* Right Column: Map */}
            <div className="lg:col-span-2">
                <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Mapa do Evento</h3>
                        <div className="flex gap-4 text-sm">
                            <div className="flex items-center text-slate-400">
                                <span className="w-3 h-3 rounded-full bg-fuchsia-600 mr-2"></span>
                                Ocupado
                            </div>
                            <div className="flex items-center text-slate-400">
                                <span className="w-3 h-3 rounded-full bg-slate-700 mr-2"></span>
                                Livre
                            </div>
                        </div>
                    </div>

                    <SeatMap
                        initial={seats}
                        onChange={(next: Seat[]) => setSeats(next)}
                    />
                </div>
            </div>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Criar Novo Assento">
                <SeatForm
                    onSave={(data) => {
                        const s = {
                            id: String(Date.now()),
                            name: data.name || `S${seats.length + 1}`,
                            x: data.posX || 50,
                            y: data.posY || 50
                        };
                        const next = [...seats, s];
                        setSeats(next);
                        setModalOpen(false);
                    }}
                />
            </Modal>
        </div>
    );
}

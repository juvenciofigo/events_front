import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SeatMap from "../../components/SeatMap";
import SeatForm from "../seats/SeatForm";
import SeatList from "../seats/SeatList";
import Modal from "../../components/Modal";

type Seat = { id: string; name: string; x: number; y: number };

export default function SeatsConfig() {
    const { id } = useParams();
    const [seats, setSeats] = useState<Seat[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <h2 className="text-2xl mb-4">Configurar Assentos - Evento {id}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="mb-0">Assentos</h3>
                        <div>
                            <button
                                className="px-3 py-1 bg-blue-600 text-white rounded"
                                onClick={() => setModalOpen(true)}>
                                Novo seat
                            </button>
                        </div>
                    </div>
                    <SeatList seats={seats} />
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                    <h3 className="mb-2">Mapa de assentos</h3>
                    <SeatMap
                        initial={seats}
                        onChange={(next: Seat[]) => setSeats(next)}
                    />
                </div>
            </div>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Criar seat">
                <SeatForm
                    onSave={(data) => {
                        const s = { id: String(Date.now()), name: data.name || `S${seats.length + 1}`, x: data.posX || 50, y: data.posY || 50 };
                        const next = [...seats, s];
                        setSeats(next);
                        setModalOpen(false);
                    }}
                />
            </Modal>
        </div>
    );
}

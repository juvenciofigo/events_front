import React, { useState } from "react";
import {
    UserPlusIcon,
    MagnifyingGlassIcon,
    TrashIcon,
    PencilSquareIcon,
    CheckCircleIcon,
    XCircleIcon
} from "@heroicons/react/24/outline";
import Modal from "../../components/Modal";

// Mock Data
const MOCK_GUESTS = [
    { id: 1, name: "João Silva", email: "joao@email.com", seat: "A1", status: "confirmed" },
    { id: 2, name: "Maria Souza", email: "maria@email.com", seat: "A2", status: "pending" },
    { id: 3, name: "Pedro Santos", email: "pedro@email.com", seat: null, status: "confirmed" },
    { id: 4, name: "Ana Oliveira", email: "ana@email.com", seat: "B1", status: "declined" },
];

const MOCK_SEATS = [
    { id: "1", name: "A1" },
    { id: "2", name: "A2" },
    { id: "3", name: "B1" },
    { id: "4", name: "B2" },
];

export default function GuestList() {
    const [guests, setGuests] = useState(MOCK_GUESTS);
    const [searchQuery, setSearchQuery] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [newGuest, setNewGuest] = useState({ name: "", email: "", seat: "" });

    const filteredGuests = guests.filter(guest =>
        guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guest.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddGuest = (e: React.FormEvent) => {
        e.preventDefault();
        const guest = {
            id: Date.now(),
            name: newGuest.name,
            email: newGuest.email,
            seat: newGuest.seat || null,
            status: "pending"
        };
        setGuests([...guests, guest]);
        setModalOpen(false);
        setNewGuest({ name: "", email: "", seat: "" });
    };

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar participantes..."
                        className="w-full bg-surface border border-white/10 rounded-xl pl-12 pr-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button
                    onClick={() => setModalOpen(true)}
                    className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center font-bold"
                >
                    <UserPlusIcon className="w-5 h-5 mr-2" />
                    Adicionar Participante
                </button>
            </div>

            {/* Guest List */}
            <div className="bg-surface/50 border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="px-6 py-4 text-sm font-bold text-muted">Nome</th>
                                <th className="px-6 py-4 text-sm font-bold text-muted">Email</th>
                                <th className="px-6 py-4 text-sm font-bold text-muted">Assento</th>
                                <th className="px-6 py-4 text-sm font-bold text-muted">Status</th>
                                <th className="px-6 py-4 text-sm font-bold text-muted text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredGuests.map((guest) => (
                                <tr key={guest.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-text">{guest.name}</div>
                                    </td>
                                    <td className="px-6 py-4 text-muted">{guest.email}</td>
                                    <td className="px-6 py-4">
                                        {guest.seat ? (
                                            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-light border border-primary/30 text-xs font-bold">
                                                {guest.seat}
                                            </span>
                                        ) : (
                                            <span className="text-muted text-sm italic">Não atribuído</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {guest.status === 'confirmed' && (
                                            <span className="flex items-center text-green-400 text-sm font-medium">
                                                <CheckCircleIcon className="w-4 h-4 mr-1" /> Confirmado
                                            </span>
                                        )}
                                        {guest.status === 'pending' && (
                                            <span className="flex items-center text-yellow-400 text-sm font-medium">
                                                <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2 animate-pulse"></span> Pendente
                                            </span>
                                        )}
                                        {guest.status === 'declined' && (
                                            <span className="flex items-center text-red-400 text-sm font-medium">
                                                <XCircleIcon className="w-4 h-4 mr-1" /> Recusado
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-muted hover:text-text transition-colors">
                                                <PencilSquareIcon className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-red-500/20 rounded-lg text-muted hover:text-red-400 transition-colors">
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Guest Modal */}
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Adicionar Novo Participante"
            >
                <form onSubmit={handleAddGuest} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Nome Completo</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="Ex: João Silva"
                            value={newGuest.name}
                            onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="Ex: joao@email.com"
                            value={newGuest.email}
                            onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Assento (Opcional)</label>
                        <select
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                            value={newGuest.seat}
                            onChange={(e) => setNewGuest({ ...newGuest, seat: e.target.value })}
                        >
                            <option value="">Selecione um assento</option>
                            {MOCK_SEATS.map(seat => (
                                <option key={seat.id} value={seat.name}>{seat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-lg shadow-primary/20 transition-all font-bold"
                        >
                            Salvar Participante
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

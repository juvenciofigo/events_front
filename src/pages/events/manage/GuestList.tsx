import React, { useState } from "react";
import {
    UserPlusIcon,
    MagnifyingGlassIcon,
    TrashIcon,
    PencilSquareIcon,
    CheckCircleIcon,
    XCircleIcon,
    FunnelIcon,
    ArrowDownTrayIcon,
    EnvelopeIcon,
    QrCodeIcon,
    UserGroupIcon,
    ClockIcon,
    CheckBadgeIcon
} from "@heroicons/react/24/outline";
import Modal from "../../../components/Modal";

// Mock Data
const MOCK_GUESTS = [
    { id: 1, name: "João Silva", email: "joao@email.com", seat: "A1", status: "confirmed", ticketType: "VIP", checkedIn: true, purchaseDate: "2024-11-15" },
    { id: 2, name: "Maria Souza", email: "maria@email.com", seat: "A2", status: "pending", ticketType: "Pista", checkedIn: false, purchaseDate: "2024-11-20" },
    { id: 3, name: "Pedro Santos", email: "pedro@email.com", seat: "B1", status: "confirmed", ticketType: "Pista Premium", checkedIn: true, purchaseDate: "2024-11-18" },
    { id: 4, name: "Ana Oliveira", email: "ana@email.com", seat: "B2", status: "declined", ticketType: "VIP", checkedIn: false, purchaseDate: "2024-11-10" },
    { id: 5, name: "Carlos Mendes", email: "carlos@email.com", seat: "C1", status: "confirmed", ticketType: "Early Bird", checkedIn: false, purchaseDate: "2024-10-25" },
    { id: 6, name: "Juliana Costa", email: "juliana@email.com", seat: "C2", status: "confirmed", ticketType: "VIP", checkedIn: true, purchaseDate: "2024-11-22" },
    { id: 7, name: "Roberto Lima", email: "roberto@email.com", seat: null, status: "pending", ticketType: "Pista", checkedIn: false, purchaseDate: "2024-11-28" },
    { id: 8, name: "Fernanda Alves", email: "fernanda@email.com", seat: "D1", status: "confirmed", ticketType: "Pista Premium", checkedIn: false, purchaseDate: "2024-11-12" },
];

const MOCK_SEATS = [
    { id: "1", name: "A1" },
    { id: "2", name: "A2" },
    { id: "3", name: "B1" },
    { id: "4", name: "B2" },
    { id: "5", name: "C1" },
    { id: "6", name: "C2" },
    { id: "7", name: "D1" },
];

export default function GuestList() {
    const [guests, setGuests] = useState(MOCK_GUESTS);
    const [searchQuery, setSearchQuery] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [newGuest, setNewGuest] = useState({ name: "", email: "", seat: "", ticketType: "Pista" });
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterTicketType, setFilterTicketType] = useState("all");
    const [filterCheckedIn, setFilterCheckedIn] = useState("all");
    const [selectedGuests, setSelectedGuests] = useState<number[]>([]);

    // Calculate statistics
    const totalGuests = guests.length;
    const confirmedGuests = guests.filter(g => g.status === "confirmed").length;
    const pendingGuests = guests.filter(g => g.status === "pending").length;
    const checkedInGuests = guests.filter(g => g.checkedIn).length;

    // Filter guests
    const filteredGuests = guests.filter(guest => {
        const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guest.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === "all" || guest.status === filterStatus;
        const matchesTicketType = filterTicketType === "all" || guest.ticketType === filterTicketType;
        const matchesCheckedIn = filterCheckedIn === "all" ||
            (filterCheckedIn === "yes" && guest.checkedIn) ||
            (filterCheckedIn === "no" && !guest.checkedIn);
        return matchesSearch && matchesStatus && matchesTicketType && matchesCheckedIn;
    });

    const handleAddGuest = (e: React.FormEvent) => {
        e.preventDefault();
        const guest = {
            id: Date.now(),
            name: newGuest.name,
            email: newGuest.email,
            seat: newGuest.seat || null,
            status: "pending" as const,
            ticketType: newGuest.ticketType,
            checkedIn: false,
            purchaseDate: new Date().toISOString().split('T')[0]
        };
        setGuests([...guests, guest]);
        setModalOpen(false);
        setNewGuest({ name: "", email: "", seat: "", ticketType: "Pista" });
    };

    const toggleSelectGuest = (id: number) => {
        setSelectedGuests(prev =>
            prev.includes(id) ? prev.filter(gid => gid !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedGuests.length === filteredGuests.length) {
            setSelectedGuests([]);
        } else {
            setSelectedGuests(filteredGuests.map(g => g.id));
        }
    };

    const handleBulkCheckIn = () => {
        setGuests(guests.map(g =>
            selectedGuests.includes(g.id) ? { ...g, checkedIn: true } : g
        ));
        setSelectedGuests([]);
    };

    const getTicketTypeColor = (type: string) => {
        switch (type) {
            case "VIP": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
            case "Pista Premium": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
            case "Early Bird": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            default: return "bg-green-500/20 text-green-400 border-green-500/30";
        }
    };

    return (
        <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-blue-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Total Participantes</div>
                        <UserGroupIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-3xl font-black text-text">{totalGuests}</div>
                    <div className="text-xs text-text-muted mt-1">Registrados no evento</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-green-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Confirmados</div>
                        <CheckCircleIcon className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-3xl font-black text-text">{confirmedGuests}</div>
                    <div className="text-xs text-green-400 mt-1">{Math.round((confirmedGuests / totalGuests) * 100)}% do total</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-yellow-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Pendentes</div>
                        <ClockIcon className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="text-3xl font-black text-text">{pendingGuests}</div>
                    <div className="text-xs text-yellow-400 mt-1">Aguardando confirmação</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-purple-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Check-in Feito</div>
                        <CheckBadgeIcon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-3xl font-black text-text">{checkedInGuests}</div>
                    <div className="text-xs text-purple-400 mt-1">{Math.round((checkedInGuests / totalGuests) * 100)}% presentes</div>
                </div>
            </div>

            {/* Filters & Actions */}
            <div className="border border-borderColor rounded p-6">
                <div className="flex items-center gap-3 mb-4">
                    <FunnelIcon className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-text">Filtros e Ações</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="text-sm text-muted mb-2 block">Status</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full bg-surface border border-borderColor rounded p-2 text-text">
                            <option value="all">Todos</option>
                            <option value="confirmed">Confirmados</option>
                            <option value="pending">Pendentes</option>
                            <option value="declined">Recusados</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-muted mb-2 block">Tipo de Ingresso</label>
                        <select
                            value={filterTicketType}
                            onChange={(e) => setFilterTicketType(e.target.value)}
                            className="w-full bg-surface border border-borderColor rounded p-2 text-text">
                            <option value="all">Todos</option>
                            <option value="VIP">VIP</option>
                            <option value="Pista Premium">Pista Premium</option>
                            <option value="Pista">Pista</option>
                            <option value="Early Bird">Early Bird</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-muted mb-2 block">Check-in</label>
                        <select
                            value={filterCheckedIn}
                            onChange={(e) => setFilterCheckedIn(e.target.value)}
                            className="w-full bg-surface border border-borderColor rounded p-2 text-text">
                            <option value="all">Todos</option>
                            <option value="yes">Feito</option>
                            <option value="no">Pendente</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-muted mb-2 block">Ações em Massa</label>
                        <div className="flex gap-2">
                            <button
                                disabled={selectedGuests.length === 0}
                                onClick={handleBulkCheckIn}
                                className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded text-sm font-semibold transition-colors">
                                Check-in
                            </button>
                            <button
                                disabled={selectedGuests.length === 0}
                                className="px-3 py-2 border border-borderColor hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed text-text rounded text-sm transition-colors">
                                <EnvelopeIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header Actions */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou email..."
                        className="w-full bg-surface border border-borderColor rounded pl-12 pr-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-3 border border-borderColor hover:bg-white/5 text-text rounded font-semibold transition-all flex items-center gap-2">
                        <ArrowDownTrayIcon className="w-5 h-5" />
                        Exportar
                    </button>
                    <button className="px-4 py-3 border border-borderColor hover:bg-white/5 text-text rounded font-semibold transition-all flex items-center gap-2">
                        <QrCodeIcon className="w-5 h-5" />
                        Scanner
                    </button>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded shadow-lg shadow-primary/20 transition-all flex items-center justify-center font-bold">
                        <UserPlusIcon className="w-5 h-5 mr-2" />
                        Adicionar
                    </button>
                </div>
            </div>

            {/* Guest List Table */}
            <div className="border border-borderColor rounded overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-borderColor bg-white/5">
                                <th className="px-4 py-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedGuests.length === filteredGuests.length && filteredGuests.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 rounded border-borderColor bg-surface"
                                    />
                                </th>
                                <th className="px-6 py-4 text-sm font-bold text-muted">Nome</th>
                                <th className="px-6 py-4 text-sm font-bold text-muted">Email</th>
                                <th className="px-6 py-4 text-sm font-bold text-muted">Tipo</th>
                                <th className="px-6 py-4 text-sm font-bold text-muted">Assento</th>
                                <th className="px-6 py-4 text-sm font-bold text-muted">Status</th>
                                <th className="px-6 py-4 text-sm font-bold text-muted">Check-in</th>
                                <th className="px-6 py-4 text-sm font-bold text-muted">Compra</th>
                                <th className="px-6 py-4 text-sm font-bold text-muted text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-borderColor">
                            {filteredGuests.map((guest) => (
                                <tr key={guest.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedGuests.includes(guest.id)}
                                            onChange={() => toggleSelectGuest(guest.id)}
                                            className="w-4 h-4 rounded border-borderColor bg-surface"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-text">{guest.name}</div>
                                    </td>
                                    <td className="px-6 py-4 text-muted text-sm">{guest.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full border text-xs font-bold ${getTicketTypeColor(guest.ticketType)}`}>
                                            {guest.ticketType}
                                        </span>
                                    </td>
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
                                    <td className="px-6 py-4">
                                        {guest.checkedIn ? (
                                            <span className="flex items-center text-green-400 text-sm font-medium">
                                                <CheckBadgeIcon className="w-4 h-4 mr-1" /> Feito
                                            </span>
                                        ) : (
                                            <span className="text-muted text-sm">Pendente</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-text-muted text-sm">
                                        {new Date(guest.purchaseDate).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 hover:bg-white/10 rounded text-muted hover:text-text transition-colors">
                                                <PencilSquareIcon className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-red-500/20 rounded text-muted hover:text-red-400 transition-colors">
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredGuests.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <UserGroupIcon className="w-16 h-16 text-text-muted mb-4" />
                        <h4 className="text-lg font-bold text-text mb-2">Nenhum participante encontrado</h4>
                        <p className="text-text-muted text-sm max-w-md">
                            {searchQuery || filterStatus !== "all" || filterTicketType !== "all" || filterCheckedIn !== "all"
                                ? "Tente ajustar os filtros de busca."
                                : "Adicione participantes ao evento para começar."}
                        </p>
                    </div>
                )}
            </div>

            {/* Results Summary */}
            {filteredGuests.length > 0 && (
                <div className="flex justify-between items-center text-sm text-text-muted">
                    <div>
                        Mostrando <span className="font-bold text-text">{filteredGuests.length}</span> de <span className="font-bold text-text">{totalGuests}</span> participantes
                    </div>
                    {selectedGuests.length > 0 && (
                        <div className="text-primary font-semibold">
                            {selectedGuests.length} selecionado(s)
                        </div>
                    )}
                </div>
            )}

            {/* Add Guest Modal */}
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Adicionar Novo Participante">
                <form onSubmit={handleAddGuest} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Nome Completo</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
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
                            className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="Ex: joao@email.com"
                            value={newGuest.email}
                            onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Tipo de Ingresso</label>
                        <select
                            className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            value={newGuest.ticketType}
                            onChange={(e) => setNewGuest({ ...newGuest, ticketType: e.target.value })}>
                            <option value="Pista">Pista</option>
                            <option value="Pista Premium">Pista Premium</option>
                            <option value="VIP">VIP</option>
                            <option value="Early Bird">Early Bird</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Assento (Opcional)</label>
                        <select
                            className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            value={newGuest.seat}
                            onChange={(e) => setNewGuest({ ...newGuest, seat: e.target.value })}>
                            <option value="">Selecione um assento</option>
                            {MOCK_SEATS.map(seat => (
                                <option key={seat.id} value={seat.name}>{seat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setModalOpen(false)}
                            className="px-6 py-3 border border-borderColor hover:bg-white/5 text-text rounded font-semibold transition-all">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded shadow-lg shadow-primary/20 transition-all font-bold">
                            Salvar Participante
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

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
    CheckBadgeIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from "@heroicons/react/24/outline";
import Modal from "../../../components/Modal";
import { useParams } from "react-router-dom";
import { useGuests, useCreateGuest, useUpdateGuest, useDeleteGuest } from "@/hooks/useGuests";
import { useToast } from "@/contexts/ToastContext";
import CreateGuest from "./CreateGuest";

// Mock Data for Seats (keep for now as we don't have a seats hook ready/integrated here yet)

export default function GuestList() {
    const { eventId } = useParams();
    const { showToast, success, error: errorToast } = useToast();

    // Pagination & Filters State
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterTicketType, setFilterTicketType] = useState("all");
    const [filterCheckedIn, setFilterCheckedIn] = useState("all");

    // Data Fetching
    const { data, isLoading, error } = useGuests(eventId || "", limit, page);

  
    const updateGuest = useUpdateGuest();
    const deleteGuest = useDeleteGuest();

    // UI State
    const [modalOpen, setModalOpen] = useState(false);

    const [selectedGuests, setSelectedGuests] = useState<string[]>([]);

    // Derived Data
    const guests = data?.items || [];
    const totalGuests = data?.totalItems || 0;
    const totalPages = data?.totalPages || 1;

    // Statistics (Mocked for now based on current page, ideally should come from a stats endpoint)
    const confirmedGuests = guests.filter((g) => g.ticket.ticketStatus === "CONFIRMED").length;
    const pendingGuests = guests.filter((g) => g.ticket.ticketStatus === "PENDING").length;
    const checkedInGuests = guests.filter((g) => g.ticket.ticketStatus === "VALIDATED").length;

  
    const toggleSelectGuest = (id: string) => {
        setSelectedGuests(prev =>
            prev.includes(id) ? prev.filter(gid => gid !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedGuests.length === guests.length) {
            setSelectedGuests([]);
        } else {
            setSelectedGuests(guests.map((g) => g.id));
        }
    };

    const handleBulkCheckIn = async () => {
        if (!eventId) return;
        // Implement bulk check-in logic here (e.g., loop through selectedGuests and call updateGuest)
        // For now, just a placeholder toast
        success("Check-in em massa iniciado (implementação pendente)");
        setSelectedGuests([]);
    };

    const handleDeleteGuest = async (guestId: string) => {
        if (!eventId || !confirm("Tem certeza que deseja remover este participante?")) return;
        try {
            await deleteGuest.mutateAsync({ eventId, guestId });
            success("Participante removido.");
        } catch (err) {
            errorToast("Erro ao remover participante.");
        }
    };

    const getTicketTypeColor = (type: string) => {
        switch (type) {
            case "VIP": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
            case "Pista Premium": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
            case "Early Bird": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            default: return "bg-green-500/20 text-green-400 border-green-500/30";
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-red-400">Erro ao carregar lista de participantes.</p>
            </div>
        );
    }

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
                    <div className="text-xs text-green-400 mt-1">Na página atual</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-yellow-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Pendentes</div>
                        <ClockIcon className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="text-3xl font-black text-text">{pendingGuests}</div>
                    <div className="text-xs text-yellow-400 mt-1">Na página atual</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-purple-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Check-in Feito</div>
                        <CheckBadgeIcon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-3xl font-black text-text">{checkedInGuests}</div>
                    <div className="text-xs text-purple-400 mt-1">Na página atual</div>
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
                    <table className="w-full text-center">
                        <thead>
                            <tr className="border-b border-borderColor bg-white/5">
                                <th className="p-2 border-r border-borderColor">
                                    <input
                                        type="checkbox"
                                        checked={selectedGuests.length === guests.length && guests.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 rounded border-borderColor bg-surface"
                                    />
                                </th>
                                <th className="p-2 text-sm font-bold text-muted border-r border-borderColor">Nome</th>
                                <th className="p-2 text-sm font-bold text-muted border-r border-borderColor">Assento</th>
                                <th className="p-2 text-sm font-bold text-muted border-r border-borderColor">Status</th>
                                <th className="p-2 text-sm font-bold text-muted border-r border-borderColor">Check-in</th>
                                <th className="p-2 text-sm font-bold text-muted border-r border-borderColor">Emitido</th>
                                <th className="p-2 text-sm font-bold text-muted border-r border-borderColor">Respondido</th>
                                <th className="p-2 text-sm font-bold text-muted w-0">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-borderColor">
                            {guests.map((guest) => (
                                <tr key={guest.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-2 border-r border-borderColor">
                                        <input
                                            type="checkbox"
                                            checked={selectedGuests.includes(guest.id)}
                                            onChange={() => toggleSelectGuest(guest.id)}
                                            className="w-4 h-4 rounded border-borderColor bg-surface"
                                        />
                                    </td>
                                    <td className="p-2 border-r border-borderColor">
                                        <div className="font-bold text-text">{guest.name}</div>
                                    </td>
                                    <td className="p-2 border-r border-borderColor">
                                        {guest.ticket.seat ? (
                                            <span className="px-3 whitespace-nowrap py-1 bg-primary/20 text-primary-light text-sm font-bold">
                                                {guest.ticket.seat.name}
                                            </span>
                                        ) : (
                                            <span className="text-muted text-sm italic">Não atribuído</span>
                                        )}
                                    </td>
                                    <td className="p-2 border-r border-borderColor">
                                        {guest.ticket.ticketStatus === 'CONFIRMED' && (
                                            <span className="flex justify-center items-center text-green-400 text-sm font-medium">
                                                <CheckCircleIcon className="w-4 h-4 mr-1" /> Confirmado
                                            </span>
                                        )}
                                        {guest.ticket.ticketStatus === 'PENDING' && (
                                            <span className="flex  justify-center items-center text-yellow-400 text-sm font-medium">
                                                <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2 animate-pulse"></span> Pendente
                                            </span>
                                        )}
                                        {guest.ticket.ticketStatus === 'DECLINED' && (
                                            <span className="flex justify-center items-center text-red-400 text-sm font-medium">
                                                <XCircleIcon className="w-4 h-4 mr-1" /> Recusado
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-2 border-r border-borderColor">
                                        {guest.ticket.ticketStatus === "VALIDATED" ? (
                                            <span className="flex items-center text-green-400 text-sm font-medium">
                                                <CheckBadgeIcon className="w-4 h-4 mr-1" /> Feito
                                            </span>
                                        ) : (
                                            <span className="text-muted text-sm">Pendente</span>
                                        )}
                                    </td>
                                    <td className="p-2 text-text-muted text-sm border-r border-borderColor">
                                        {new Date(guest.ticket.createdAt).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="p-2 text-text-muted text-sm border-r border-borderColor">
                                        {guest.ticket.respondedAt ? new Date(guest.ticket.respondedAt).toLocaleDateString('pt-BR') : "-"}
                                    </td>
                                    <td className="p-2">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 hover:bg-white/10 rounded text-muted hover:text-text transition-colors">
                                                <PencilSquareIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteGuest(guest.id)}
                                                className="p-2 hover:bg-red-500/20 rounded text-muted hover:text-red-400 transition-colors">
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
                {guests.length === 0 && (
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="flex items-center px-4 py-2 border border-borderColor rounded text-sm font-medium text-text hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeftIcon className="w-4 h-4 mr-2" />
                        Anterior
                    </button>
                    <span className="text-text-muted text-sm">
                        Página <span className="text-text font-bold">{page}</span> de <span className="text-text font-bold">{totalPages}</span>
                    </span>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="flex items-center px-4 py-2 border border-borderColor rounded text-sm font-medium text-text hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Próximo
                        <ChevronRightIcon className="w-4 h-4 ml-2" />
                    </button>
                </div>
            )}

            {/* Results Summary */}
            {guests.length > 0 && (
                <div className="flex justify-between items-center text-sm text-text-muted">
                    <div>
                        Mostrando <span className="font-bold text-text">{guests.length}</span> participantes
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
                <CreateGuest eventId={eventId} setModalOpen={setModalOpen}/>
            </Modal>
        </div>
    );
}

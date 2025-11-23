import React, { useState } from "react";
import {
    PaperAirplaneIcon,
    UserPlusIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    LinkIcon,
    QrCodeIcon
} from "@heroicons/react/24/outline";

interface Guest {
    id: number;
    name: string;
    phone: string;
    email: string;
    status: 'pending' | 'confirmed' | 'declined';
    sentAt?: string;
    respondedAt?: string;
}

export default function Invitations() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'declined'>('all');
    const [showAddGuest, setShowAddGuest] = useState(false);
    const [newGuest, setNewGuest] = useState({ name: "", phone: "", email: "" });

    // Mock data
    const [guests, setGuests] = useState<Guest[]>([
        { id: 1, name: "João Silva", phone: "+55 11 98765-4321", email: "joao@email.com", status: "confirmed", sentAt: "2024-11-20", respondedAt: "2024-11-21" },
        { id: 2, name: "Maria Santos", phone: "+55 11 98765-4322", email: "maria@email.com", status: "pending", sentAt: "2024-11-20" },
        { id: 3, name: "Pedro Costa", phone: "+55 11 98765-4323", email: "pedro@email.com", status: "declined", sentAt: "2024-11-20", respondedAt: "2024-11-21" },
        { id: 4, name: "Ana Oliveira", phone: "+55 11 98765-4324", email: "ana@email.com", status: "confirmed", sentAt: "2024-11-19", respondedAt: "2024-11-20" },
        { id: 5, name: "Carlos Mendes", phone: "+55 11 98765-4325", email: "carlos@email.com", status: "pending", sentAt: "2024-11-21" },
    ]);

    const eventLink = `${window.location.origin}/invitation/123`;

    const filteredGuests = guests.filter(guest => {
        const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guest.phone.includes(searchTerm) ||
            guest.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || guest.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: guests.length,
        confirmed: guests.filter(g => g.status === 'confirmed').length,
        pending: guests.filter(g => g.status === 'pending').length,
        declined: guests.filter(g => g.status === 'declined').length,
    };

    const handleAddGuest = () => {
        if (newGuest.name && newGuest.phone) {
            const guest: Guest = {
                id: guests.length + 1,
                ...newGuest,
                status: 'pending'
            };
            setGuests([...guests, guest]);
            setNewGuest({ name: "", phone: "", email: "" });
            setShowAddGuest(false);
        }
    };

    const handleSendWhatsApp = (guest: Guest) => {
        const message = `Olá ${guest.name}! Você está convidado para nosso evento. Acesse o convite: ${eventLink}`;
        const whatsappUrl = `https://wa.me/${guest.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const copyLink = () => {
        navigator.clipboard.writeText(eventLink);
        alert('Link copiado!');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text">Convites</h1>
                    <p className="text-sm text-muted mt-1">Gerencie e envie convites para seu evento</p>
                </div>
                <button
                    onClick={() => setShowAddGuest(true)}
                    className="px-4 py-2 text-sm bg-primary hover:bg-primary-hover text-white rounded-lg font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                >
                    <UserPlusIcon className="w-4 h-4" />
                    Adicionar Convidado
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted">Total</p>
                            <p className="text-2xl font-bold text-text mt-1">{stats.total}</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <UserPlusIcon className="w-5 h-5 text-blue-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted">Confirmados</p>
                            <p className="text-2xl font-bold text-green-400 mt-1">{stats.confirmed}</p>
                        </div>
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <CheckCircleIcon className="w-5 h-5 text-green-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted">Pendentes</p>
                            <p className="text-2xl font-bold text-yellow-400 mt-1">{stats.pending}</p>
                        </div>
                        <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                            <ClockIcon className="w-5 h-5 text-yellow-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted">Recusados</p>
                            <p className="text-2xl font-bold text-red-400 mt-1">{stats.declined}</p>
                        </div>
                        <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                            <XCircleIcon className="w-5 h-5 text-red-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Link do Convite */}
            <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <h3 className="text-base font-bold text-text mb-4">Link do Convite</h3>
                <div className="flex gap-2">
                    <div className="flex-1 bg-background/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-text-secondary font-mono">
                        {eventLink}
                    </div>
                    <button
                        onClick={copyLink}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-text rounded-lg transition-all flex items-center gap-2"
                    >
                        <LinkIcon className="w-4 h-4" />
                        Copiar
                    </button>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-text rounded-lg transition-all flex items-center gap-2">
                        <QrCodeIcon className="w-4 h-4" />
                        QR Code
                    </button>
                </div>
            </div>

            {/* Filtros e Busca */}
            <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Busca */}
                    <div className="flex-1 relative">
                        <MagnifyingGlassIcon className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Buscar por nome, telefone ou email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm bg-background/50 border border-white/10 rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                        />
                    </div>

                    {/* Filtro de Status */}
                    <div className="flex items-center gap-2">
                        <FunnelIcon className="w-4 h-4 text-muted" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as any)}
                            className="px-3 py-2 text-sm bg-background/50 border border-white/10 rounded-lg text-text focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                        >
                            <option value="all">Todos</option>
                            <option value="confirmed">Confirmados</option>
                            <option value="pending">Pendentes</option>
                            <option value="declined">Recusados</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Lista de Convidados */}
            <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-background/50 border-b border-white/10">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Nome</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Telefone</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Email</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Enviado</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-muted">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredGuests.map((guest) => (
                                <tr key={guest.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-3 text-sm font-medium text-text">{guest.name}</td>
                                    <td className="px-4 py-3 text-sm text-text-secondary">{guest.phone}</td>
                                    <td className="px-4 py-3 text-sm text-text-secondary">{guest.email}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${guest.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                                            guest.status === 'declined' ? 'bg-red-500/20 text-red-400' :
                                                'bg-yellow-500/20 text-yellow-400'
                                            }`}>
                                            {guest.status === 'confirmed' && <CheckCircleIcon className="w-3 h-3" />}
                                            {guest.status === 'declined' && <XCircleIcon className="w-3 h-3" />}
                                            {guest.status === 'pending' && <ClockIcon className="w-3 h-3" />}
                                            {guest.status === 'confirmed' ? 'Confirmado' :
                                                guest.status === 'declined' ? 'Recusado' : 'Pendente'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-muted">
                                        {guest.sentAt || '-'}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button
                                            onClick={() => handleSendWhatsApp(guest)}
                                            className="px-3 py-1.5 text-xs bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg transition-all flex items-center gap-1 ml-auto"
                                        >
                                            <PaperAirplaneIcon className="w-3 h-3" />
                                            WhatsApp
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredGuests.length === 0 && (
                    <div className="p-8 text-center">
                        <p className="text-muted">Nenhum convidado encontrado</p>
                    </div>
                )}
            </div>

            {/* Modal Adicionar Convidado */}
            {showAddGuest && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-surface border border-white/10 rounded-2xl p-6 max-w-md w-full">
                        <h3 className="text-xl font-bold text-text mb-4">Adicionar Convidado</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-muted mb-1">Nome *</label>
                                <input
                                    type="text"
                                    value={newGuest.name}
                                    onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                                    placeholder="Nome completo"
                                    className="w-full px-3 py-2 text-sm bg-background/50 border border-white/10 rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-muted mb-1">Telefone *</label>
                                <input
                                    type="tel"
                                    value={newGuest.phone}
                                    onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                                    placeholder="+55 11 98765-4321"
                                    className="w-full px-3 py-2 text-sm bg-background/50 border border-white/10 rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-muted mb-1">Email</label>
                                <input
                                    type="email"
                                    value={newGuest.email}
                                    onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                                    placeholder="email@exemplo.com"
                                    className="w-full px-3 py-2 text-sm bg-background/50 border border-white/10 rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 mt-6">
                            <button
                                onClick={() => setShowAddGuest(false)}
                                className="flex-1 px-4 py-2 text-sm bg-white/5 hover:bg-white/10 border border-white/10 text-text rounded-lg transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleAddGuest}
                                className="flex-1 px-4 py-2 text-sm bg-primary hover:bg-primary-hover text-white rounded-lg font-bold shadow-lg shadow-primary/20 transition-all"
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

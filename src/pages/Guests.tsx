import React, { useState } from "react";
import {
    UserGroupIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    PlusIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/Form/Button";

export default function Guests() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    // Mock data
    const guests = [
        { id: 1, name: "Ana Costa", email: "ana@email.com", phone: "(11) 98765-4321", event: "Casamento Silva & Souza", status: "confirmed", checkedIn: false },
        { id: 2, name: "Carlos Lima", email: "carlos@email.com", phone: "(11) 91234-5678", event: "Casamento Silva & Souza", status: "pending", checkedIn: false },
        { id: 3, name: "Beatriz Alves", email: "beatriz@email.com", phone: "(11) 99876-5432", event: "Aniversário 50 anos", status: "confirmed", checkedIn: true },
        { id: 4, name: "João Silva", email: "joao@email.com", phone: "(11) 92345-6789", event: "Festival de Verão", status: "confirmed", checkedIn: false },
        { id: 5, name: "Maria Santos", email: "maria@email.com", phone: "(11) 93456-7890", event: "Tech Summit", status: "declined", checkedIn: false },
    ];

    const stats = {
        total: guests.length,
        confirmed: guests.filter(g => g.status === 'confirmed').length,
        pending: guests.filter(g => g.status === 'pending').length,
        declined: guests.filter(g => g.status === 'declined').length,
        checkedIn: guests.filter(g => g.checkedIn).length,
    };

    const filteredGuests = guests.filter(guest => {
        const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guest.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || guest.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-background text-text p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-text mb-2">
                            Convidados
                        </h1>
                        <p className="text-muted">Gerencie todos os convidados dos seus eventos</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="ghost">
                            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                            Exportar
                        </Button>
                        <Button>
                            <PlusIcon className="w-5 h-5 mr-2" />
                            Adicionar Convidado
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-text">{stats.total}</div>
                        <div className="text-xs text-muted">Total</div>
                    </div>
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-success">{stats.confirmed}</div>
                        <div className="text-xs text-muted">Confirmados</div>
                    </div>
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-warning">{stats.pending}</div>
                        <div className="text-xs text-muted">Pendentes</div>
                    </div>
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-error">{stats.declined}</div>
                        <div className="text-xs text-muted">Recusados</div>
                    </div>
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-primary">{stats.checkedIn}</div>
                        <div className="text-xs text-muted">Check-in</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <MagnifyingGlassIcon className="w-5 h-5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Buscar por nome ou email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-background border border-white/10 rounded-sm text-text placeholder-muted focus:outline-none focus:border-primary/50"
                            />
                        </div>

                        {/* Filter */}
                        <div className="flex items-center gap-2">
                            <FunnelIcon className="w-5 h-5 text-muted" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2 bg-background border border-white/10 rounded-sm text-text focus:outline-none focus:border-primary/50"
                            >
                                <option value="all">Todos</option>
                                <option value="confirmed">Confirmados</option>
                                <option value="pending">Pendentes</option>
                                <option value="declined">Recusados</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Guests List */}
                <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-muted uppercase">Nome</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-muted uppercase">Contato</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-muted uppercase">Evento</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-muted uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-muted uppercase">Check-in</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-muted uppercase">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {filteredGuests.map((guest) => (
                                    <tr key={guest.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-text font-bold text-sm">
                                                    {guest.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                </div>
                                                <div className="font-bold text-text">{guest.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-text">{guest.email}</div>
                                            <div className="text-xs text-muted">{guest.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-text">{guest.event}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-sm text-xs font-bold ${guest.status === 'confirmed' ? 'bg-success/20 text-success' :
                                                guest.status === 'pending' ? 'bg-warning/20 text-warning' :
                                                    'bg-error/20 text-error'
                                                }`}>
                                                {guest.status === 'confirmed' ? <CheckCircleIcon className="w-3 h-3" /> :
                                                    guest.status === 'pending' ? <ClockIcon className="w-3 h-3" /> :
                                                        <XCircleIcon className="w-3 h-3" />}
                                                {guest.status === 'confirmed' ? 'Confirmado' :
                                                    guest.status === 'pending' ? 'Pendente' :
                                                        'Recusado'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {guest.checkedIn ? (
                                                <span className="text-xs font-bold text-success">✓ Feito</span>
                                            ) : (
                                                <span className="text-xs text-muted">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-xs font-bold text-primary hover:text-primary-light transition-colors">
                                                Ver detalhes
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {filteredGuests.length === 0 && (
                    <div className="text-center py-12">
                        <UserGroupIcon className="w-16 h-16 text-muted mx-auto mb-4" />
                        <p className="text-muted">Nenhum convidado encontrado</p>
                    </div>
                )}
            </div>
        </div>
    );
}

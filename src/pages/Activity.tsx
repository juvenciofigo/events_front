import React, { useState } from "react";
import {
    ClockIcon,
    FunnelIcon,
    TicketIcon,
    UserPlusIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency } from "@/utils";

export default function Activity() {
    const [filter, setFilter] = useState("all");

    const activities = [
        { id: 1, type: "sale", name: "João da Silva", action: "Comprou 2x VIP", event: "Festival de Verão", amount: 450, time: "Há 2 min", timestamp: "2025-01-26 14:30" },
        { id: 2, type: "confirmation", name: "Ana Costa", action: "Confirmou presença", event: "Casamento Silva & Souza", time: "Há 5 min", timestamp: "2025-01-26 14:27" },
        { id: 3, type: "sale", name: "Maria Santos", action: "Comprou 1x Premium", event: "Tech Summit", amount: 280, time: "Há 15 min", timestamp: "2025-01-26 14:17" },
        { id: 4, type: "confirmation", name: "Carlos Lima", action: "Confirmou presença", event: "Casamento Silva & Souza", time: "Há 30 min", timestamp: "2025-01-26 14:02" },
        { id: 5, type: "added", name: "Beatriz Alves", action: "Adicionada à lista", event: "Aniversário 50 anos", time: "Há 1h", timestamp: "2025-01-26 13:30" },
        { id: 6, type: "sale", name: "Pedro Costa", action: "Comprou 3x Standard", event: "Workshop Design", amount: 150, time: "Há 2h", timestamp: "2025-01-26 12:30" },
        { id: 7, type: "declined", name: "Juliana Lima", action: "Recusou convite", event: "Casamento Silva & Souza", time: "Há 3h", timestamp: "2025-01-26 11:30" },
    ];

    const filteredActivities = filter === "all"
        ? activities
        : activities.filter(a => a.type === filter);

    const stats = {
        total: activities.length,
        sales: activities.filter(a => a.type === 'sale').length,
        confirmations: activities.filter(a => a.type === 'confirmation').length,
        additions: activities.filter(a => a.type === 'added').length,
    };

    return (
        <div className="min-h-screen bg-background text-text p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-black tracking-tight text-text mb-2">
                        Histórico de Atividades
                    </h1>
                    <p className="text-muted">Todas as atividades dos seus eventos em ordem cronológica</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-text">{stats.total}</div>
                        <div className="text-xs text-muted">Total</div>
                    </div>
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-success">{stats.sales}</div>
                        <div className="text-xs text-muted">Vendas</div>
                    </div>
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-primary">{stats.confirmations}</div>
                        <div className="text-xs text-muted">Confirmações</div>
                    </div>
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-info">{stats.additions}</div>
                        <div className="text-xs text-muted">Adições</div>
                    </div>
                </div>

                {/* Filter */}
                <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4 mb-8">
                    <div className="flex items-center gap-4">
                        <FunnelIcon className="w-5 h-5 text-muted" />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="px-4 py-2 bg-background border border-white/10 rounded-sm text-text focus:outline-none focus:border-primary/50"
                        >
                            <option value="all">Todas as atividades</option>
                            <option value="sale">Apenas vendas</option>
                            <option value="confirmation">Apenas confirmações</option>
                            <option value="added">Apenas adições</option>
                            <option value="declined">Apenas recusas</option>
                        </select>
                    </div>
                </div>

                {/* Activity List */}
                <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6">
                    <div className="space-y-4">
                        {filteredActivities.map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between p-4 bg-white/5 rounded-sm border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-sm ${activity.type === 'sale' ? 'bg-success/10 border border-success/20' :
                                        activity.type === 'confirmation' ? 'bg-primary/10 border border-primary/20' :
                                            activity.type === 'added' ? 'bg-info/10 border border-info/20' :
                                                'bg-error/10 border border-error/20'
                                        }`}>
                                        {activity.type === 'sale' ? (
                                            <TicketIcon className="w-5 h-5 text-success" />
                                        ) : activity.type === 'confirmation' ? (
                                            <CheckCircleIcon className="w-5 h-5 text-primary" />
                                        ) : activity.type === 'added' ? (
                                            <UserPlusIcon className="w-5 h-5 text-info" />
                                        ) : (
                                            <XCircleIcon className="w-5 h-5 text-error" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-bold text-text">{activity.name}</div>
                                        <div className="text-xs text-muted">{activity.action} • {activity.event}</div>
                                        <div className="text-xs text-text-disabled mt-1 flex items-center gap-1">
                                            <ClockIcon className="w-3 h-3" />
                                            {activity.timestamp}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    {activity.type === 'sale' ? (
                                        <>
                                            <div className="font-bold text-success">+ {formatCurrency(activity.amount || 0)}</div>
                                            <div className="text-xs text-muted">{activity.time}</div>
                                        </>
                                    ) : (
                                        <div className="text-xs text-muted">{activity.time}</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from "react";
import {
    ListBulletIcon,
    BellIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/Form/Button";

export default function Waitlist() {
    const waitlist = [
        { id: 1, name: "Roberto Santos", email: "roberto@email.com", phone: "(11) 98765-4321", event: "Festival de Verão", position: 1, addedAt: "26/01/2025 10:30" },
        { id: 2, name: "Juliana Costa", email: "juliana@email.com", phone: "(11) 91234-5678", event: "Festival de Verão", position: 2, addedAt: "26/01/2025 11:15" },
        { id: 3, name: "Fernando Alves", email: "fernando@email.com", phone: "(11) 99876-5432", event: "Tech Summit", position: 1, addedAt: "25/01/2025 14:20" },
        { id: 4, name: "Camila Lima", email: "camila@email.com", phone: "(11) 92345-6789", event: "Festival de Verão", position: 3, addedAt: "25/01/2025 16:45" },
        { id: 5, name: "Lucas Santos", email: "lucas@email.com", phone: "(11) 93456-7890", event: "Workshop Design", position: 1, addedAt: "24/01/2025 09:00" },
    ];

    const stats = {
        total: waitlist.length,
        byEvent: {
            "Festival de Verão": 3,
            "Tech Summit": 1,
            "Workshop Design": 1,
        }
    };

    const groupedByEvent = waitlist.reduce((acc, person) => {
        if (!acc[person.event]) acc[person.event] = [];
        acc[person.event].push(person);
        return acc;
    }, {} as Record<string, typeof waitlist>);

    return (
        <div className="min-h-screen bg-background text-text p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-text mb-2">
                            Lista de Espera
                        </h1>
                        <p className="text-muted">Gerencie pessoas aguardando vagas em seus eventos</p>
                    </div>
                    <Button>
                        <BellIcon className="w-5 h-5 mr-2" />
                        Notificar Todos
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-text">{stats.total}</div>
                        <div className="text-xs text-muted">Total na Fila</div>
                    </div>
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-primary">{Object.keys(groupedByEvent).length}</div>
                        <div className="text-xs text-muted">Eventos</div>
                    </div>
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-warning">{Math.max(...Object.values(stats.byEvent))}</div>
                        <div className="text-xs text-muted">Maior Fila</div>
                    </div>
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-success">{waitlist.filter(p => p.position === 1).length}</div>
                        <div className="text-xs text-muted">Primeiros da Fila</div>
                    </div>
                </div>

                {/* Waitlist by Event */}
                <div className="space-y-8">
                    {Object.entries(groupedByEvent).map(([eventName, people]) => (
                        <div key={eventName} className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <UserGroupIcon className="w-6 h-6 text-primary" />
                                    <h3 className="text-lg font-bold text-text">{eventName}</h3>
                                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-sm">
                                        {people.length} {people.length === 1 ? 'pessoa' : 'pessoas'}
                                    </span>
                                </div>
                                <button className="text-xs font-bold text-primary hover:text-primary-light transition-colors">
                                    Notificar todos
                                </button>
                            </div>

                            <div className="space-y-3">
                                {people.map((person) => (
                                    <div key={person.id} className="flex items-center justify-between p-4 bg-white/5 rounded-sm border border-white/10 hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-warning to-accent flex items-center justify-center text-text font-bold text-sm">
                                                #{person.position}
                                            </div>
                                            <div>
                                                <div className="font-bold text-text">{person.name}</div>
                                                <div className="text-xs text-muted">{person.email} • {person.phone}</div>
                                                <div className="text-xs text-text-disabled mt-1">Adicionado em {person.addedAt}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 text-xs font-bold text-success bg-success/10 border border-success/20 rounded-sm hover:bg-success/20 transition-colors">
                                                Notificar
                                            </button>
                                            <button className="px-3 py-1 text-xs font-bold text-error bg-error/10 border border-error/20 rounded-sm hover:bg-error/20 transition-colors">
                                                Remover
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

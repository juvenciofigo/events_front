import React from "react";
import {
    CalendarDaysIcon,
    TicketIcon,
    CurrencyDollarIcon,
    UserGroupIcon,
    ArrowTrendingUpIcon,
    PlusIcon
} from "@heroicons/react/24/outline";
import Button from "../../components/Form/Button";

export default function OrganizerDashboard() {
    return (
        <div className="min-h-screen bg-background text-text p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-text mb-2">
                            Dashboard do Organizador
                        </h1>
                        <p className="text-muted">
                            Visão geral dos seus eventos e performance de vendas.
                        </p>
                    </div>
                    <Button>
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Criar Novo Evento
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {/* Stat Card 1 */}
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6 hover:border-primary/30 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-primary/10 rounded-sm border border-primary/20 group-hover:bg-primary/20 transition-colors">
                                <CalendarDaysIcon className="w-6 h-6 text-primary-light" />
                            </div>
                            <span className="flex items-center text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-sm border border-success/20">
                                <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                                +12%
                            </span>
                        </div>
                        <div className="text-3xl font-black text-text mb-1">12</div>
                        <div className="text-sm text-muted">Eventos Ativos</div>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6 hover:border-secondary/30 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-secondary/10 rounded-sm border border-secondary/20 group-hover:bg-secondary/20 transition-colors">
                                <TicketIcon className="w-6 h-6 text-secondary" />
                            </div>
                            <span className="flex items-center text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-sm border border-success/20">
                                <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                                +24%
                            </span>
                        </div>
                        <div className="text-3xl font-black text-text mb-1">1,248</div>
                        <div className="text-sm text-muted">Ingressos Vendidos</div>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6 hover:border-accent/30 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-accent/10 rounded-sm border border-accent/20 group-hover:bg-accent/20 transition-colors">
                                <CurrencyDollarIcon className="w-6 h-6 text-accent" />
                            </div>
                            <span className="flex items-center text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-sm border border-success/20">
                                <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                                +8%
                            </span>
                        </div>
                        <div className="text-3xl font-black text-text mb-1">R$ 45.2k</div>
                        <div className="text-sm text-muted">Receita Total</div>
                    </div>

                    {/* Stat Card 4 */}
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6 hover:border-warning/30 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-warning/10 rounded-sm border border-warning/20 group-hover:bg-warning/20 transition-colors">
                                <UserGroupIcon className="w-6 h-6 text-warning" />
                            </div>
                            <span className="flex items-center text-xs font-bold text-disabled bg-disabled/10 px-2 py-1 rounded-sm border border-disabled/20">
                                0%
                            </span>
                        </div>
                        <div className="text-3xl font-black text-text mb-1">85%</div>
                        <div className="text-sm text-muted">Taxa de Ocupação</div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Sales / Activity */}
                    <div className="lg:col-span-2 bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-text">Vendas Recentes</h3>
                            <button className="text-sm text-primary hover:text-primary-light transition-colors">Ver todas</button>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div key={item} className="flex items-center justify-between p-4 bg-white/5 rounded-sm border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-text font-bold text-sm">
                                            JD
                                        </div>
                                        <div>
                                            <div className="font-bold text-text">João da Silva</div>
                                            <div className="text-xs text-muted">Comprou 2x VIP • Festival de Verão</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-secondary">+ R$ 450,00</div>
                                        <div className="text-xs text-disabled">Há 2 min</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions / Upcoming */}
                    <div className="space-y-8">
                        <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-8">
                            <h3 className="text-xl font-bold text-text mb-6">Próximos Eventos</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/20 rounded-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">Hoje</span>
                                        <span className="text-xs text-muted">20:00</span>
                                    </div>
                                    <h4 className="font-bold text-text mb-1">Tech Summit 2024</h4>
                                    <p className="text-xs text-muted">Centro de Convenções</p>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/5 rounded-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded">Amanhã</span>
                                        <span className="text-xs text-muted">14:00</span>
                                    </div>
                                    <h4 className="font-bold text-text mb-1">Workshop de Design</h4>
                                    <p className="text-xs text-muted">Online</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from 'react'
import {
    UserGroupIcon,
    ShareIcon,
    ArrowDownTrayIcon,
    BellIcon,
    HeartIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";
import { useEvent } from "@/hooks/useEvents";
import { useParams } from "react-router-dom";

export default function Overview() {
    const { id } = useParams<{ id: string }>();
    const { data: event, isLoading: eventLoading, error: eventError } = useEvent(id);

    console.log(eventLoading);
    console.log(eventError);
    console.log(event);

    const eventStats = {
        stats: {
            ticketsSold: 1250,
            totalTickets: 2000,
            revenue: "R$ 125k",
            views: 3245,
        },
    };
    return (
        <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="border border-borderColor rounded p-2">
                    <div className="text-muted text-sm mb-1">Ingressos Enviados</div>
                    <div className="text-3xl font-black text-text">{eventStats.stats.ticketsSold}</div>
                    <div className="text-xs text-text-muted mt-2">
                        de {eventStats.stats.totalTickets} disponíveis
                        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${(eventStats.stats.ticketsSold / eventStats.stats.totalTickets) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
                <div className="border border-borderColor rounded p-2">
                    <div className="text-muted text-sm mb-1">Receita Total</div>
                    <div className="text-3xl font-black text-text">{eventStats.stats.revenue}</div>
                    <div className="text-xs text-green-400 mt-2 flex items-center">
                        +12% essa semana
                    </div>
                </div>
                <div className="border border-borderColor rounded p-2">
                    <div className="text-muted text-sm mb-1">Visualizações da Página</div>
                    <div className="text-3xl font-black text-text">{eventStats.stats.views}</div>
                    <div className="text-xs text-text-muted mt-2">
                        Últimos 30 dias
                    </div>
                </div>
            </div>

            {/* Performance Metrics */}
            {/* <div>
                <h3 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                    <ChartPieIcon className="w-6 h-6 text-primary" />
                    Métricas de Performance
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-purple-500/5 to-transparent">
                        <div className="flex items-center justify-between mb-3">
                            <div className="text-muted text-sm">Taxa de Conversão</div>
                            <ChartBarIcon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="text-3xl font-black text-text">23.5%</div>
                        <div className="text-xs text-purple-400 mt-2">+5.2% vs mês anterior</div>
                    </div>
                    <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-blue-500/5 to-transparent">
                        <div className="flex items-center justify-between mb-3">
                            <div className="text-muted text-sm">Preço Médio Ingresso</div>
                            <CurrencyDollarIcon className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="text-3xl font-black text-text">R$ 100</div>
                        <div className="text-xs text-text-muted mt-2">Baseado em vendas</div>
                    </div>
                    <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-green-500/5 to-transparent">
                        <div className="flex items-center justify-between mb-3">
                            <div className="text-muted text-sm">Ocupação</div>
                            <UserGroupIcon className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="text-3xl font-black text-text">62.5%</div>
                        <div className="text-xs text-green-400 mt-2">Boa taxa de ocupação</div>
                    </div>
                </div>
            </div> */}

            {/* Quick Actions */}
            <div>
                <h3 className="text-xl font-bold text-text mb-4">Ações Rápidas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="border border-borderColor rounded p-4 hover:bg-white/5 transition-all hover:border-primary group text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ShareIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="font-bold text-text">Compartilhar Evento</div>
                                <div className="text-xs text-text-muted">Redes sociais e link</div>
                            </div>
                        </div>
                    </button>
                    <button className="border border-borderColor rounded p-4 hover:bg-white/5 transition-all hover:border-primary group text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ArrowDownTrayIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="font-bold text-text">Baixar Relatório</div>
                                <div className="text-xs text-text-muted">PDF ou Excel</div>
                            </div>
                        </div>
                    </button>
                    <button className="border border-borderColor rounded p-4 hover:bg-white/5 transition-all hover:border-primary group text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <BellIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="font-bold text-text">Enviar Notificação</div>
                                <div className="text-xs text-text-muted">Para participantes</div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Engagement Stats */}
            <div>
                <h3 className="text-xl font-bold text-text mb-4">Engajamento</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="border border-borderColor rounded p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <EyeIcon className="w-5 h-5 text-cyan-400" />
                            <div className="text-muted text-sm">Visualizações Únicas</div>
                        </div>
                        <div className="text-2xl font-black text-text">3,245</div>
                    </div>
                    <div className="border border-borderColor rounded p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <HeartIcon className="w-5 h-5 text-pink-400" />
                            <div className="text-muted text-sm">Favoritado</div>
                        </div>
                        <div className="text-2xl font-black text-text">892</div>
                    </div>
                    <div className="border border-borderColor rounded p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <ShareIcon className="w-5 h-5 text-blue-400" />
                            <div className="text-muted text-sm">Compartilhamentos</div>
                        </div>
                        <div className="text-2xl font-black text-text">456</div>
                    </div>
                    <div className="border border-borderColor rounded p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <UserGroupIcon className="w-5 h-5 text-green-400" />
                            <div className="text-muted text-sm">Interessados</div>
                        </div>
                        <div className="text-2xl font-black text-text">1,567</div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Placeholder */}
            <div className="border border-borderColor rounded p-2">
                <h3 className="text-xl font-bold text-text mb-4">Atividade Recente</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-borderColor last:border-0">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted">
                                    <UserGroupIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-text font-medium">Novo ingresso vendido</div>
                                    <div className="text-xs text-text-muted">João Silva comprou 2x Pista Premium</div>
                                </div>
                            </div>
                            <div className="text-xs text-text-muted">Há 2 horas</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

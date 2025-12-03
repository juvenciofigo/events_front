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
import { useFinancialStats } from "@/hooks/useFinancial";
import { useParams } from "react-router-dom";

export default function Overview() {
    const { id } = useParams<{ id: string }>();
    const { data: event, isLoading: eventLoading } = useEvent(id || "");
    const { data: financialStats, isLoading: financialLoading } = useFinancialStats(id || "");

    const isLoading = eventLoading || financialLoading;

    // Calculate derived stats
    const ticketsSold = financialStats?.revenueByTicketType.reduce((acc, curr) => acc + curr.quantity, 0) || 0;
    const totalRevenue = financialStats?.totalRevenue || 0;
    const totalCapacity = event?.estimatedGuest || 0;
    const occupancyRate = totalCapacity > 0 ? (ticketsSold / totalCapacity) * 100 : 0;

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="border flex justify-center items-center flex-col border-borderColor rounded p-2 lg:p-4 bg-surface/50">
                    <div className="text-muted text-sm mb-1">Ingressos Vendidos</div>
                    <div className="text-xl lg:text-3xl font-black text-text">{ticketsSold}</div>
                    <div className="text-xs text-text-muted mt-2 w-full">
                        de {totalCapacity} disponíveis
                        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${Math.min(occupancyRate, 100)}%` }}></div>
                        </div>
                    </div>
                </div>
                <div className="border flex justify-center items-center flex-col border-borderColor rounded p-2 lg:p-4 bg-surface/50">
                    <div className="text-muted text-sm mb-1">Receita Total</div>
                    <div className="text-xl lg:text-3xl font-black text-text">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRevenue)}
                    </div>
                    <div className="text-xs text-green-400 mt-2 flex items-center">
                        Receita bruta
                    </div>
                </div>
                <div className="b
                order flex justify-center items-center flex-col border-borderColor rounded p-2 lg:p-4 bg-surface/50">
                    <div className="text-muted text-sm mb-1">Visualizações da Página</div>
                    <div className="text-xl lg:text-3xl font-black text-text">3,245</div>
                    <div className="text-xs text-text-muted mt-2">
                        (Simulado) Últimos 30 dias
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h3 className="text-xl font-bold text-text mb-4">Ações Rápidas</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <QuickActions icon={<ShareIcon className="w-6 h-6" />} title="Compartilhar Evento" description="Redes sociais e link" />
                    <QuickActions icon={<ArrowDownTrayIcon className="w-6 h-6" />} title="Baixar Relatório" description="PDF ou Excel" />
                    <QuickActions icon={<BellIcon className="w-6 h-6" />} title="Notificar Participantes" description="Envio de e-mail" />
                </div>
            </div>

            {/* Engagement Stats */}
            <div>
                <h3 className="text-xl font-bold text-text mb-4">Engajamento (Simulado)</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <EngagementStats icon={<EyeIcon className="w-5 h-5 text-cyan-400" />} title="Visualizações Únicas" description="3,245" />
                    <EngagementStats icon={<HeartIcon className="w-5 h-5 text-pink-400" />} title="Favoritado" description="892" />
                    <EngagementStats icon={<ShareIcon className="w-5 h-5 text-blue-400" />} title="Compartilhamentos" description="456" />
                    <EngagementStats icon={<UserGroupIcon className="w-5 h-5 text-green-400" />} title="Interessados" description="1,567" />
                </div>
            </div>

            {/* Recent Activity Placeholder */}
            <div className="border border-borderColor rounded p-2">
                <h3 className="text-xl font-bold text-text mb-4">Atividade Recente (Simulado)</h3>
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

interface QuickAction {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function QuickActions({ icon, title, description }: QuickAction) {
    return (
        <button className="border border-borderColor rounded p-2 lg:p-4 hover:bg-white/5 transition-all hover:border-primary group text-left">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <div>
                    <div className="font-bold text-text">{title}</div>
                    <div className="text-xs text-text-muted">{description}</div>
                </div>
            </div>
        </button>
    )
}

interface EngagementStats {
    icon: React.ReactNode;
    title: string;
    description: string;
}
function EngagementStats({ icon, title, description }: EngagementStats) {
    return (
        <div className="border border-borderColor rounded p-2 lg:p-4">
            <div className="flex justify-center items-center gap-3 mb-2 text-center">
                {icon}
                <div className="text-muted text-sm whitespace-nowrap">{title}</div>
            </div>
            <div className="text-xl md:text-2xl font-black text-text text-center">{description}</div>
        </div>
    )
}

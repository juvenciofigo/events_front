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
import { StatisticsCards } from "@/components/StatisticsCards";

export default function Overview({ eventId }: { eventId: string }) {
    // const { id } = useParams<{ id: string }>();
    const { data: event, isLoading: eventLoading } = useEvent(eventId);
    const { data: financialStats, isLoading: financialLoading } = useFinancialStats(eventId);

    const isLoading = eventLoading || financialLoading;

    // Calculate derived stats
    const ticketsSold = financialStats?.revenueBySeat.reduce((acc, curr) => acc + curr.quantity, 0) || 0;
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
                <StatisticsCards
                    data={ticketsSold} title="Ingressos Vendidos"
                    description={
                        <div className="text-xs text-text-muted mt-2 w-full">
                            de {totalCapacity} disponíveis
                            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${Math.min(occupancyRate, 100)}%` }}></div>
                            </div>
                        </div>
                    } />
                <StatisticsCards
                    data={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRevenue)}
                    title="Receita Total" description="Receita bruta"
                />
                <StatisticsCards data={3245} description="(Simulado) Últimos 30 dias" title='Visualizações da Página' />
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
                    <StatisticsCards icon={<EyeIcon className="w-4 h-4 text-cyan-400 ml-5" />} title="Visualizações Únicas" data="3,245" />
                    <StatisticsCards icon={<HeartIcon className="w-4 h-4 text-pink-400 ml-5" />} title="Favoritado" data="892" />
                    <StatisticsCards icon={<ShareIcon className="w-4 h-4 text-blue-400 ml-5" />} title="Compartilhamentos" data="456" />
                    <StatisticsCards icon={<UserGroupIcon className="w-4 h-4 text-green-400 ml-5" />} title="Interessados" data="1,567" />
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
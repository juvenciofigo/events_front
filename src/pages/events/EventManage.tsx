import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    ChartBarIcon,
    UserGroupIcon,
    TicketIcon,
    CurrencyDollarIcon,
    Cog6ToothIcon,
    ArrowLeftIcon,
    CalendarIcon,
    MapPinIcon,
    PencilSquareIcon
} from "@heroicons/react/24/outline";
import GuestList from "./GuestList";
import EventSeats from "./EventSeats";

// Mock Data
const EVENT_DATA = {
    id: 1,
    title: "Festival de Verão 2025",
    date: "15 Jan, 2025",
    location: "Parque da Cidade, SP",
    status: "active",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80",
    stats: {
        ticketsSold: 1250,
        totalTickets: 2000,
        revenue: "R$ 125.000",
        views: 5430
    }
};

const TABS = [
    { id: "overview", label: "Visão Geral", icon: ChartBarIcon },
    { id: "guests", label: "Participantes", icon: UserGroupIcon },
    { id: "tickets", label: "Ingressos", icon: TicketIcon },
    { id: "financial", label: "Financeiro", icon: CurrencyDollarIcon },
    { id: "settings", label: "Configurações", icon: Cog6ToothIcon },
];

export default function EventManage() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("overview");
    const event = EVENT_DATA; // In real app, fetch by ID

    return (
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-white pb-20">
            {/* Header */}
            <div className="bg-surface border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <Link to="/events" className="inline-flex items-center text-muted hover:text-text transition-colors mb-6">
                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                        Voltar para Meus Eventos
                    </Link>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex items-center gap-6">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-20 h-20 rounded-2xl object-cover border-2 border-white/10"
                            />
                            <div>
                                <h1 className="text-3xl font-black text-text mb-2">{event.title}</h1>
                                <div className="flex items-center gap-4 text-muted text-sm">
                                    <span className="flex items-center">
                                        <CalendarIcon className="w-4 h-4 mr-1" />
                                        {event.date}
                                    </span>
                                    <span className="flex items-center">
                                        <MapPinIcon className="w-4 h-4 mr-1" />
                                        {event.location}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${event.status === 'active'
                                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                        : "bg-slate-500/20 text-muted border border-slate-500/30"
                                        }`}>
                                        {event.status === 'active' ? 'Ativo' : 'Rascunho'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Link
                                to={`/events/edit/${id}`}
                                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-text rounded-lg font-bold flex items-center transition-colors"
                            >
                                <PencilSquareIcon className="w-5 h-5 mr-2" />
                                Editar Evento
                            </Link>
                            <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold shadow-lg shadow-primary/20 transition-colors">
                                Divulgar Evento
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="max-w-7xl mx-auto px-6 flex overflow-x-auto no-scrollbar">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-6 py-4 border-b-2 transition-colors whitespace-nowrap font-medium ${activeTab === tab.id
                                ? "border-primary text-text"
                                : "border-transparent text-muted hover:text-text hover:border-white/10"
                                }`}
                        >
                            <tab.icon className={`w-5 h-5 mr-2 ${activeTab === tab.id ? "text-primary" : "text-text-muted"}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {activeTab === "overview" && (
                    <div className="space-y-8">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-surface/50 border border-white/10 rounded-2xl p-6">
                                <div className="text-muted text-sm mb-1">Ingressos Vendidos</div>
                                <div className="text-3xl font-black text-text">{event.stats.ticketsSold}</div>
                                <div className="text-xs text-text-muted mt-2">
                                    de {event.stats.totalTickets} disponíveis
                                    <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${(event.stats.ticketsSold / event.stats.totalTickets) * 100}%` }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-surface/50 border border-white/10 rounded-2xl p-6">
                                <div className="text-muted text-sm mb-1">Receita Total</div>
                                <div className="text-3xl font-black text-text">{event.stats.revenue}</div>
                                <div className="text-xs text-green-400 mt-2 flex items-center">
                                    +12% essa semana
                                </div>
                            </div>
                            <div className="bg-surface/50 border border-white/10 rounded-2xl p-6">
                                <div className="text-muted text-sm mb-1">Visualizações da Página</div>
                                <div className="text-3xl font-black text-text">{event.stats.views}</div>
                                <div className="text-xs text-text-muted mt-2">
                                    Últimos 30 dias
                                </div>
                            </div>
                            <div className="bg-surface/50 border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-white/5 transition-colors group">
                                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary-light flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                    <TicketIcon className="w-6 h-6" />
                                </div>
                                <div className="font-bold text-text">Configurar Ingressos</div>
                            </div>
                        </div>

                        {/* Recent Activity Placeholder */}
                        <div className="bg-surface/50 border border-white/10 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-text mb-4">Atividade Recente</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
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
                )}

                {activeTab === "guests" && <GuestList />}

                {activeTab === "seats" && <EventSeats />}

                {activeTab !== "overview" && activeTab !== "guests" && activeTab !== "seats" && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                            <Cog6ToothIcon className="w-10 h-10 text-text-muted" />
                        </div>
                        <h3 className="text-2xl font-bold text-text mb-2">Em Desenvolvimento</h3>
                        <p className="text-muted max-w-md">
                            A aba <strong>{TABS.find(t => t.id === activeTab)?.label}</strong> estará disponível em breve com funcionalidades avançadas de gestão.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

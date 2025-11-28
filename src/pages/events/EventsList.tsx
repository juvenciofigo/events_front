import React from "react";
import { Link } from "react-router-dom";
import {
    PlusIcon,
    CalendarIcon,
    MapPinIcon,
    UserGroupIcon,
    PencilSquareIcon,
    ChartBarIcon,
    EllipsisHorizontalIcon
} from "@heroicons/react/24/outline";

// Mock Data
const EVENTS = [
    {
        id: 1,
        title: "Festival de Verão 2025",
        date: "15 Jan, 2025",
        location: "Parque da Cidade, SP",
        attendees: 1500,
        status: "active",
        image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Workshop de Tecnologia",
        date: "20 Fev, 2025",
        location: "Centro de Convenções",
        attendees: 300,
        status: "draft",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Casamento Silva & Souza",
        date: "10 Mar, 2025",
        location: "Mansão dos Arcos",
        attendees: 200,
        status: "active",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
    }
];

export default function EventsList() {
    return (
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-white pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-text mb-2">
                        Meus Eventos
                    </h1>
                    <p className="text-muted">
                        Gerencie seus eventos, acompanhe vendas e edite detalhes.
                    </p>
                </div>
                <Link
                    to="/events/create"
                    className="px-6 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center font-bold transform hover:-translate-y-1"
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Criar Novo Evento
                </Link>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {EVENTS.map((event) => (
                    <div key={event.id} className="group bg-surface/50 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/10">
                        {/* Image */}
                        <div className="h-48 overflow-hidden relative">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${event.status === 'active'
                                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                    : "bg-surface/20 text-muted border border-surface/30"
                                    }`}>
                                    {event.status === 'active' ? 'Ativo' : 'Rascunho'}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-text mb-4 group-hover:text-primary-light transition-colors">
                                {event.title}
                            </h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center text-muted text-sm">
                                    <CalendarIcon className="w-4 h-4 mr-2 text-text-muted" />
                                    {event.date}
                                </div>
                                <div className="flex items-center text-muted text-sm">
                                    <MapPinIcon className="w-4 h-4 mr-2 text-text-muted" />
                                    {event.location}
                                </div>
                                <div className="flex items-center text-muted text-sm">
                                    <UserGroupIcon className="w-4 h-4 mr-2 text-text-muted" />
                                    {event.attendees} participantes estimados
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-4 border-t border-white/5">
                                <Link
                                    to={`/events/edit/${event.id}`}
                                    className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-text rounded-lg text-sm font-bold flex items-center justify-center transition-colors"
                                >
                                    <PencilSquareIcon className="w-4 h-4 mr-2" />
                                    Editar
                                </Link>
                                <Link
                                    to={`/events/${event.id}/manage`}
                                    className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-text rounded-lg text-sm font-bold flex items-center justify-center transition-colors"
                                >
                                    <ChartBarIcon className="w-4 h-4 mr-2" />
                                    Gerenciar
                                </Link>
                                <button className="p-2 bg-white/5 hover:bg-white/10 text-muted hover:text-text rounded-lg transition-colors">
                                    <EllipsisHorizontalIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

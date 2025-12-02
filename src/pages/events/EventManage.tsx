import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    ChartBarIcon,
    UserGroupIcon,
    TicketIcon,
    CurrencyDollarIcon,
    Cog6ToothIcon,
    ArrowLeftIcon,
    CalendarIcon,
    MapPinIcon,
    PlusIcon,
    ClipboardDocumentListIcon
} from "@heroicons/react/24/outline";
import GuestList from "./manage/GuestList";
import EventSeats from "./manage/EventSeats";

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
    { id: "seats", label: "Assentos", icon: UserGroupIcon },
    { id: "tickets", label: "Ingressos", icon: TicketIcon },
    { id: "financial", label: "Financeiro", icon: CurrencyDollarIcon },
    { id: "operations", label: "Operações", icon: ClipboardDocumentListIcon },
    { id: "settings", label: "Configurações", icon: Cog6ToothIcon },
];

import { useEvent } from "@/hooks/useEvents";
import Button from "@/components/Form/Button";
import Settings from "./manage/Settings";
import Tickets from "./manage/Tickets";
import Overview from "./manage/Overview";
import Financial from "./manage/Financial";
import Operations from "./manage/Operations";

export default function EventManage() {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [activeTab, setActiveTab] = useState("overview");
    const { data: eventData, isLoading, error } = useEvent(eventId);

    // Mock stats for now as they are not in the API yet
    const event = eventData ? {
        ...eventData,
        date: new Date(eventData.dateStart).toLocaleDateString(),
        image: eventData.coverImage,
        stats: {
            ticketsSold: 1250,
            totalTickets: eventData.estimatedGuest || 2000,
            revenue: "R$ 125.000",
            views: 5430
        }
    } : null;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center text-text">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Erro ao carregar evento</h2>
                    <Link to="/dashboard/organizers/events" className="text-primary hover:underline">Voltar para lista</Link>
                </div>
            </div>
        );
    }




    return (
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-white pb-20">
            {/* Header */}
            <div className="">
                <div className="p-2 md:p-4">
                    <Link
                        to="/dashboard/organizers/events"
                        className="flex items-center text-muted hover:text-text transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                        Voltar Para Eventos
                    </Link>

                    <div className="flex flex-col md:flex-row md:gap-7">
                        <div>
                            <img
                                src={event.image}
                                alt={event.title}
                                className="md:w-[650px] md:h-[400px] rounded object-cover border-2 border-borderColor"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="p-4 space-y-2">
                                <div>
                                    <h1 className="md:text-4xl text-2xl font-bold">{event.title}</h1>
                                    <p className="md:text-xl text-lg font-bold">{event.category}</p>
                                </div>
                                <div className="">
                                    <p className="md:text-xl text-lg font-bold flex items-center gap-1"> <CalendarIcon className="w-5 h-5 mr-1" /> {event.date}</p>
                                    <p className="md:text-xl text-lg font-bold flex items-center gap-1"> <MapPinIcon className="w-5 h-5 mr-1" /> {event.location}</p>
                                </div>
                                <p className="md:text-xl text-lg font-bold">{event.description}</p>
                            </div>
                            <Button
                                fullWidth
                                onClick={() => navigate(`/dashboard/organizers/events/${eventId}/edit`)}>
                                <div className="flex flex-row items-center gap-1">
                                    <PlusIcon className="md:w-5 md:h-5 w-4 h-4" />
                                    <span className="text-sm font-semibold text-nowrap">Editar Evento</span>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
                <hr className="border-t border-borderColor" />

            </div>

            {/* Content Area */}
            <div className="px-3 bg-surface mt-4 py-2">
                {/* Tabs */}
                <div className="w-full flex justify-around overflow-x-auto no-scrollbar mb-3 pb-3 border-b border-borderColor">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-6 justify-center p-2 border-b-2 transition-colors whitespace-nowrap font-medium ${activeTab === tab.id
                                ? "border-primary text-text"
                                : "border-transparent text-muted hover:text-text hover:border-text-muted"
                                }`}
                        >
                            <tab.icon className={`w-5 h-5 mr-2 ${activeTab === tab.id ? "text-primary" : "text-text-muted"}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>
                {activeTab === "overview" && (<Overview />)}

                {activeTab === "guests" && <GuestList />}

                {activeTab === "seats" && <EventSeats />}

                {activeTab === "settings" && (<Settings />)}

                {activeTab === "tickets" && (<Tickets />)}

                {activeTab === "financial" && (<Financial />)}

                {activeTab === "operations" && (<Operations />)}

                {activeTab !== "overview" && activeTab !== "guests" && activeTab !== "seats" && activeTab !== "settings" && activeTab !== "tickets" && activeTab !== "financial" && activeTab !== "operations" && (
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

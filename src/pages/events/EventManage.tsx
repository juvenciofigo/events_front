import React from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
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
import Seats from "./manage/Seats";
import { useEvent } from "@/hooks/useEvents";
import Button from "@/components/Form/Button";
import Settings from "./manage/Settings";
import Overview from "./manage/Overview";
import Financial from "./manage/Financial";
import Operations from "./manage/Operations";

const TABS = [
    { id: "overview", label: "Visão Geral", icon: ChartBarIcon },
    { id: "guests", label: "Participantes", icon: UserGroupIcon },
    { id: "seats", label: "Assentos", icon: UserGroupIcon },
    { id: "financial", label: "Financeiro", icon: CurrencyDollarIcon },
    { id: "operations", label: "Operações", icon: ClipboardDocumentListIcon },
    { id: "settings", label: "Configurações", icon: Cog6ToothIcon },
];

export default function EventManage() {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const activeTab = searchParams.get("tab") || "overview";
    const { data: eventData, isLoading, error } = useEvent(eventId);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !eventData || !eventId) {
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
                        <div className="flex-1">
                            <img
                                src={eventData.coverImage}
                                alt={eventData.title}
                                className="max-h-[400px] lg:w-full rounded object-cover"
                            />
                        </div>
                        <div className="flex-1 lg:flex-none">
                            <div className="p-4 space-y-2">
                                <div>
                                    <h1 className="md:text-4xl text-2xl font-bold">{eventData.title}</h1>
                                    <p className="md:text-xl text-lg font-bold">{eventData.category}</p>
                                </div>
                                <div className="">
                                    <p className="md:text-xl text-lg font-bold flex items-center gap-1"> <CalendarIcon className="w-5 h-5 mr-1" /> {new Date(eventData.dateStart).toLocaleDateString()}</p>
                                    <p className="md:text-xl text-lg font-bold flex items-center gap-1"> <MapPinIcon className="w-5 h-5 mr-1" /> {eventData.location}</p>
                                </div>
                                <p className="md:text-xl text-lg font-bold">{eventData.description}</p>
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
                            onClick={() => setSearchParams({ tab: tab.id })}
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
                {activeTab === "overview" && (<Overview eventId={eventId} />)}

                {activeTab === "guests" && <GuestList eventId={eventId} />}

                {activeTab === "seats" && <Seats eventId={eventId} />}

                {activeTab === "settings" && (<Settings eventId={eventId} />)}

                {activeTab === "financial" && (<Financial eventId={eventId} />)}

                {activeTab === "operations" && (<Operations eventId={eventId} />)}
            </div>
        </div>
    );
}

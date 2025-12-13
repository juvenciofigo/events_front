import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../dashboards/organizer/Header";
import { useFetchOrganizerEvents } from "@/hooks/useEvents";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContext } from "../dashboards/LayoutDashboard";
import { organizerProfile } from "@/stores/useProfileStore";
import Button from "@/components/Form/Button";
import EventCard from "@/components/EventCard";
import { CalendarIcon, ChartBarIcon, EllipsisHorizontalIcon, PencilSquareIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Event } from "@/types/events";

export default function EventsList() {
    const context = useOutletContext<OutletContext>();
    const organizer: organizerProfile = context.profile;
    const navigate = useNavigate();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("createdAt");

    // Prevent hook execution with undefined ID by using empty string and enabled flag (handled inside hook)
    const { data: data, isLoading: loading, error: error } = useFetchOrganizerEvents(organizer?.id || "", limit, page, sort);

    if (!organizer) {
        return (
            <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-white pb-20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-white px-3">
            {/* Header */}
            <Header
                name={null}
                title="Meus Eventos"
                description="Gerencia seus eventos, acompanhe vendas e edite detalhes."
                buttonLabel="Novo Evento"
                buttonLink="/dashboard/organizers/events/create"
            />

            {/* Events Grid */}
            {loading ?
                (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-error">Erro ao carregar eventos. Tente novamente.</p>
                    </div>
                ) : !data || data.items.length === 0 ? (
                    <div className="text-center py-20 bg-surface/30 rounded border border-white/5">
                        <CalendarIcon className="w-16 h-16 text-muted mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-text mb-2">Nenhum evento encontrado</h3>
                        <p className="text-muted mb-6">Comece criando seu primeiro evento agora mesmo.</p>
                        <Button onClick={() => navigate('/events/create')}>
                            <PlusIcon className="w-4 h-4" />
                            Criar Evento
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.items.map((event) => (
                            <EventCard
                                key={event.id}
                                // actions={<EventActions event={event} />}
                                event={event} />
                        ))}
                    </div>
                )}

            {/* Pagination */}
            {data && data.totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeftIcon className="w-4 h-4 mr-2" />
                        Anterior
                    </Button>
                    <span className="text-text-muted text-sm">
                        Página <span className="text-text font-medium">{data.currentPage}</span> de <span className="text-text font-medium">{data.totalPages}</span>
                    </span>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                        disabled={page === data.totalPages}
                        className="disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Próximo
                        <ChevronRightIcon className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            )}
        </div>
    );
}



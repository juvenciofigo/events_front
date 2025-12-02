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


function EventActions({ event }: { event: Event }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center gap-2 pt-4 border-t border-white/5">
            <Button
                size="md"
                onClick={() => navigate(`/dashboard/organizers/events/${event.id}/edit`)}
            >
                <PencilSquareIcon className="w-4 h-4" />
                Editar
            </Button>

            <Button
                size="md"
                onClick={() => navigate(`/dashboard/organizers/events/${event.id}/manage`)}
            >
                <ChartBarIcon className="w-4 h-4" />
                Gerenciar
            </Button>

            <Button
                size="md"
                onClick={() => navigate(`/dashboard/organizers/events/${event.id}/manage`)}
            >
                <EllipsisHorizontalIcon className="w-4 h-4" />
            </Button>
        </div>
    )
}

// Mock Data
const EVENTS = [
    {
        id: "1",
        title: "Festival de Verão 2025",
        description: "O maior festival de verão da cidade.",
        start_date: "2025-01-15T14:00:00",
        end_date: "2025-01-15T22:00:00",
        location: "Parque da Cidade, SP",
        attendees_count: 1500,
        status: "active",
        image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80",
        organizer_id: "org1",
        category_id: "cat1"
    },
    {
        id: "2",
        title: "Workshop de Tecnologia",
        description: "Aprenda as novas tecnologias do mercado.",
        start_date: "2025-02-20T09:00:00",
        end_date: "2025-02-20T17:00:00",
        location: "Centro de Convenções",
        attendees_count: 300,
        status: "draft",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
        organizer_id: "org1",
        category_id: "cat2"
    },
    {
        id: "3",
        title: "Casamento Silva & Souza",
        description: "Celebração da união de Silva e Souza.",
        start_date: "2025-03-10T16:00:00",
        end_date: "2025-03-10T23:59:00",
        location: "Mansão dos Arcos",
        attendees_count: 200,
        status: "active",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
        organizer_id: "org1",
        category_id: "cat3"
    }
];

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
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-white pb-20">
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
                            <EventCard key={event.id} actions={<EventActions event={event} />} event={event} />
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



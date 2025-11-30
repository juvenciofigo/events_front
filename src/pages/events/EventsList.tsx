import React, { useState } from "react";
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
import Header from "../dashboards/organizer/Header";
import { useGetOrganizerEvents } from "@/hooks/useEvents";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContext } from "../dashboards/LayoutDashboard";
import { organizerProfile } from "@/stores/useProfileStore";
import Button from "@/components/Form/Button";

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
    const [sort, setSort] = useState("created_at");

    // Prevent hook execution with undefined ID by using empty string and enabled flag (handled inside hook)
    const { data: data, isLoading: loading, error: error } = useGetOrganizerEvents(organizer?.id || "", limit, page, sort);

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
                buttonLink="/events/create"
            />

            {/* Events Grid */}
            {loading ?
                (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                // ) : error ? (
                //     <div className="text-center py-20">
                //         <p className="text-error">Erro ao carregar eventos. Tente novamente.</p>
                //     </div>
                // ) : !data?.items || data.items.length === 0 ? (
                //     <div className="text-center py-20 bg-surface/30 rounded border border-white/5">
                //         <CalendarIcon className="w-16 h-16 text-muted mx-auto mb-4" />
                //         <h3 className="text-xl font-bold text-text mb-2">Nenhum evento encontrado</h3>
                //         <p className="text-muted mb-6">Comece criando seu primeiro evento agora mesmo.</p>
                //         <Button onClick={() => navigate('/events/create')}>
                //             <PlusIcon className="w-4 h-4" />
                //             Criar Evento
                //         </Button>
                //     </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {EVENTS.map((event) => (
                            <div key={event.id} className="group bg-surface/50 border border-white/5 rounded overflow-hidden hover:border-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/10">
                                {/* Image */}
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={event.image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80"}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${event.status === 'active'
                                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                            : "bg-surface/20 text-muted border border-surface/30"
                                            }`}>
                                            {event.status === 'active' ? 'Ativo' : 'Rascunho'}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-text mb-4 group-hover:text-primary-light transition-colors line-clamp-1">
                                        {event.title}
                                    </h3>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-muted text-sm">
                                            <CalendarIcon className="w-4 h-4 mr-2 text-text-muted" />
                                            {new Date(event.start_date).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center text-muted text-sm">
                                            <MapPinIcon className="w-4 h-4 mr-2 text-text-muted" />
                                            {event.location}
                                        </div>
                                        <div className="flex items-center text-muted text-sm">
                                            <UserGroupIcon className="w-4 h-4 mr-2 text-text-muted" />
                                            {event.attendees_count || 0} participantes
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-center gap-2 pt-4 border-t border-white/5">
                                        <Button
                                            size="md"
                                            onClick={() => navigate(`/events/edit/${event.id}`)}
                                        >
                                            <PencilSquareIcon className="w-4 h-4" />
                                            Editar
                                        </Button>

                                        <Button
                                            size="md"
                                            onClick={() => navigate(`/events/${event.id}/manage`)}
                                        >
                                            <ChartBarIcon className="w-4 h-4" />
                                            Gerenciar
                                        </Button>

                                        <Button
                                            size="md"
                                            onClick={() => navigate(`/events/${event.id}/manage`)}
                                        >
                                            <EllipsisHorizontalIcon className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
}

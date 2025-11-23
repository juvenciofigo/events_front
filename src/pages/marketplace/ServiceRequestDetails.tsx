import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    CalendarDaysIcon,
    MapPinIcon,
    CurrencyDollarIcon,
    ChatBubbleLeftRightIcon,
    ArrowLeftIcon,
    CheckBadgeIcon,
    ClockIcon
} from "@heroicons/react/24/outline";

// Mock Data (should match List page or fetch by ID)
const REQUEST_DATA = {
    id: 1,
    title: "Buffet Completo para Casamento",
    organizer: {
        id: "org123",
        name: "Maria Silva",
        rating: 4.8,
        eventsCount: 12,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
    },
    date: "15 Dez, 2024",
    time: "18:00 - 02:00",
    location: "Mansão dos Arcos, São Paulo - SP",
    budget: "R$ 15.000 - 20.000",
    category: "Buffet",
    description: "Procuro serviço de buffet completo para casamento com 200 convidados. O estilo do evento é clássico e elegante. Necessário incluir opções veganas (aprox. 10% dos convidados) e serviço de garçom para 6 horas de festa.",
    requirements: [
        "Cardápio com 2 opções de entrada, 2 pratos principais e sobremesa",
        "Bebidas não alcoólicas inclusas",
        "Equipe de garçons uniformizada",
        "Degustação prévia obrigatória",
        "Louças e talheres finos"
    ],
    postedAt: "Há 2 horas"
};

export default function ServiceRequestDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    // In a real app, useQuery to fetch request by ID
    const request = REQUEST_DATA;

    const handleStartChat = () => {
        // Logic to start chat
        // In a real app, this would create a chat room via API and then redirect
        console.log(`Starting chat with organizer ${request.organizer.id} for request ${request.id}`);
        navigate(`/chat/new?organizer=${request.organizer.id}&request=${request.id}`);
    };

    return (
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-white pb-20">
            {/* Header / Nav */}
            <div className="pt-24 px-6 max-w-5xl mx-auto">
                <Link to="/marketplace/requests" className="inline-flex items-center text-muted hover:text-text transition-colors mb-8">
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    Voltar para Oportunidades
                </Link>

                <div className="bg-surface/50 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10"></div>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-xs font-bold uppercase tracking-wider">
                                    {request.category}
                                </span>
                                <span className="flex items-center text-muted text-sm">
                                    <ClockIcon className="w-4 h-4 mr-1" />
                                    Postado {request.postedAt}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black text-text mb-6 leading-tight">
                                {request.title}
                            </h1>

                            <div className="flex flex-wrap gap-6 text-text-secondary mb-8">
                                <div className="flex items-center">
                                    <CalendarDaysIcon className="w-5 h-5 mr-2 text-secondary" />
                                    {request.date} • {request.time}
                                </div>
                                <div className="flex items-center">
                                    <MapPinIcon className="w-5 h-5 mr-2 text-secondary" />
                                    {request.location}
                                </div>
                                <div className="flex items-center font-bold text-text">
                                    <CurrencyDollarIcon className="w-5 h-5 mr-2 text-green-400" />
                                    {request.budget}
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none mb-8">
                                <h3 className="text-xl font-bold text-text mb-3">Descrição</h3>
                                <p className="text-text-secondary leading-relaxed mb-6">
                                    {request.description}
                                </p>

                                <h3 className="text-xl font-bold text-text mb-3">Requisitos</h3>
                                <ul className="space-y-2">
                                    {request.requirements.map((req, index) => (
                                        <li key={index} className="flex items-start text-text-secondary">
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Organizer Card */}
                        <div className="w-full md:w-80 bg-surface border border-white/10 rounded-2xl p-6 flex-shrink-0">
                            <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-4">Organizador</h3>
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={request.organizer.avatar}
                                    alt={request.organizer.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
                                />
                                <div>
                                    <div className="font-bold text-text flex items-center">
                                        {request.organizer.name}
                                        <CheckBadgeIcon className="w-4 h-4 ml-1 text-secondary" />
                                    </div>
                                    <div className="text-xs text-muted">
                                        {request.organizer.eventsCount} eventos realizados
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleStartChat}
                                className="w-full py-3 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-1 flex items-center justify-center"
                            >
                                <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                                Conversar
                            </button>
                            <p className="text-xs text-center text-muted mt-3">
                                Inicie uma conversa para enviar sua proposta.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

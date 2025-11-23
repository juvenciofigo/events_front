import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    MagnifyingGlassIcon,
    CalendarDaysIcon,
    MapPinIcon,
    CurrencyDollarIcon,
    FunnelIcon,
    BriefcaseIcon
} from "@heroicons/react/24/outline";

// Mock Data for Service Requests
const REQUESTS = [
    {
        id: 1,
        title: "Buffet Completo para Casamento",
        organizer: "Maria Silva",
        date: "15 Dez, 2024",
        location: "São Paulo, SP",
        budget: "R$ 15.000 - 20.000",
        category: "Buffet",
        description: "Procuro serviço de buffet completo para casamento com 200 convidados. Necessário incluir opções veganas e serviço de garçom.",
        postedAt: "Há 2 horas"
    },
    {
        id: 2,
        title: "Fotógrafo para Evento Corporativo",
        organizer: "Tech Solutions Inc.",
        date: "20 Jan, 2025",
        location: "Campinas, SP",
        budget: "R$ 3.000 - 5.000",
        category: "Fotografia",
        description: "Cobertura fotográfica de evento corporativo de dia inteiro. Entrega das fotos editadas em até 48h.",
        postedAt: "Há 5 horas"
    },
    {
        id: 3,
        title: "DJ e Iluminação para Festa de 15 Anos",
        organizer: "Ana Paula",
        date: "10 Fev, 2025",
        location: "Santos, SP",
        budget: "R$ 4.000 - 6.000",
        category: "Música",
        description: "DJ com repertório variado e estrutura completa de som e iluminação para festa de debutante.",
        postedAt: "Ontem"
    },
    {
        id: 4,
        title: "Decoração Floral para Mini Wedding",
        organizer: "Carla Oliveira",
        date: "05 Mar, 2025",
        location: "São Paulo, SP",
        budget: "R$ 8.000 - 12.000",
        category: "Decoração",
        description: "Decoração estilo boho chic para mini wedding em restaurante. Flores naturais e arranjos de mesa.",
        postedAt: "Há 2 dias"
    },
    {
        id: 5,
        title: "Segurança para Show",
        organizer: "Festival Indie",
        date: "15 Abr, 2025",
        location: "São Paulo, SP",
        budget: "A combinar",
        category: "Segurança",
        description: "Equipe de segurança para controle de acesso e palco em show de médio porte.",
        postedAt: "Há 3 dias"
    }
];

const CATEGORIES = ["Todos", "Buffet", "Fotografia", "Música", "Decoração", "Segurança", "Outros"];

export default function ServiceRequestsList() {
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredRequests = REQUESTS.filter(req => {
        const matchesCategory = selectedCategory === "Todos" || req.category === selectedCategory;
        const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-white pb-20">
            {/* Header */}
            <div className="pt-24 pb-12 px-6 bg-gradient-to-b from-surface to-background border-b border-white/5">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text mb-4">
                        Oportunidades de Serviço
                    </h1>
                    <p className="text-xl text-muted mb-8 max-w-2xl">
                        Encontre organizadores que precisam dos seus serviços e expanda seus negócios.
                    </p>

                    {/* Search & Filter */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                            <input
                                type="text"
                                placeholder="Buscar por título, local ou palavra-chave..."
                                className="w-full bg-surface border border-white/10 rounded-xl pl-12 pr-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium flex items-center justify-center transition-all">
                            <FunnelIcon className="w-5 h-5 mr-2" />
                            Filtros Avançados
                        </button>
                    </div>

                    {/* Category Pills */}
                    <div className="flex overflow-x-auto gap-3 mt-6 pb-2 no-scrollbar">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "bg-white/5 text-muted hover:bg-white/10 hover:text-text border border-white/5"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Requests Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRequests.map((req) => (
                        <div key={req.id} className="group bg-surface/50 border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all hover:-translate-y-1 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-bold text-secondary">
                                    {req.category}
                                </div>
                                <span className="text-xs text-muted">{req.postedAt}</span>
                            </div>

                            <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary-light transition-colors">
                                {req.title}
                            </h3>

                            <div className="space-y-3 mb-6 flex-1">
                                <div className="flex items-center text-muted text-sm">
                                    <CalendarDaysIcon className="w-4 h-4 mr-2 text-text-disabled" />
                                    {req.date}
                                </div>
                                <div className="flex items-center text-muted text-sm">
                                    <MapPinIcon className="w-4 h-4 mr-2 text-text-disabled" />
                                    {req.location}
                                </div>
                                <div className="flex items-center text-muted text-sm">
                                    <CurrencyDollarIcon className="w-4 h-4 mr-2 text-text-disabled" />
                                    {req.budget}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center text-xs font-bold text-white">
                                        {req.organizer.substring(0, 2).toUpperCase()}
                                    </div>
                                    <span className="text-sm text-text-secondary">{req.organizer}</span>
                                </div>
                                <Link
                                    to={`/marketplace/requests/${req.id}`}
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-lg transition-colors"
                                >
                                    Ver Detalhes
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

// Mock Data
interface Provider {
    id: number;
    name: string;
    category: string;
    rating: number;
    reviewCount: number;
    image: string;
    description: string;
    minPrice: number;
}

const MOCK_PROVIDERS: Provider[] = [
    {
        id: 1,
        name: "Buffet Delícias Reais",
        category: "Buffet",
        rating: 4.8,
        reviewCount: 124,
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=400&q=80",
        description: "Especialistas em casamentos e eventos corporativos com cardápios personalizados.",
        minPrice: 1500
    },
    {
        id: 2,
        name: "DJ SoundMaster",
        category: "Música",
        rating: 4.9,
        reviewCount: 89,
        image: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&w=400&q=80",
        description: "A melhor experiência sonora para sua festa, com equipamentos de última geração.",
        minPrice: 800
    },
    {
        id: 3,
        name: "Lentes Mágicas Fotografia",
        category: "Fotografia",
        rating: 4.7,
        reviewCount: 56,
        image: "https://images.unsplash.com/photo-1554048612-387768052bf7?auto=format&fit=crop&w=400&q=80",
        description: "Capturando momentos inesquecíveis com um olhar artístico e sensível.",
        minPrice: 2000
    },
    {
        id: 4,
        name: "Espaço Garden",
        category: "Local",
        rating: 4.6,
        reviewCount: 210,
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=400&q=80",
        description: "Um local encantador ao ar livre para cerimônias e recepções.",
        minPrice: 5000
    },
    {
        id: 5,
        name: "Decorações Sonho Meu",
        category: "Decoração",
        rating: 4.9,
        reviewCount: 45,
        image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=400&q=80",
        description: "Transformamos ambientes com decorações florais e temáticas exclusivas.",
        minPrice: 3000
    },
    {
        id: 6,
        name: "Segurança Total",
        category: "Segurança",
        rating: 4.5,
        reviewCount: 32,
        image: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?auto=format&fit=crop&w=400&q=80",
        description: "Equipe treinada para garantir a tranquilidade do seu evento.",
        minPrice: 600
    }
];

const CATEGORIES = ["Todos", "Buffet", "Música", "Fotografia", "Local", "Decoração", "Segurança"];

export default function ProvidersList() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todos");

    const filteredProviders = useMemo(() => {
        return MOCK_PROVIDERS.filter(provider => {
            const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                provider.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "Todos" || provider.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <div className="p-6 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-text">Marketplace de Serviços</h1>
                    <p className="text-muted mt-1">Encontre os melhores fornecedores para o seu evento</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-muted" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar fornecedores..."
                            className="pl-10 pr-4 py-2 border border-border rounded-lg bg-surface text-text focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FunnelIcon className="h-5 w-5 text-muted" />
                        </div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="pl-10 pr-8 py-2 border border-border rounded-lg bg-surface text-text focus:ring-2 focus:ring-primary focus:border-transparent appearance-none w-full sm:w-48"
                        >
                            {CATEGORIES.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Categories Tabs (Optional visual enhancement) */}
            <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
                {CATEGORIES.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                            ? "bg-primary text-white"
                            : "bg-surface text-text-secondary hover:bg-surface-hover"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Providers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProviders.map(provider => (
                    <Link key={provider.id} to={`/marketplace/${provider.id}`} className="group">
                        <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-border">
                            <div className="relative h-48 -mx-4 -mt-4 mb-4 overflow-hidden">
                                <img
                                    src={provider.image}
                                    alt={provider.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-2 right-2">
                                    <Badge variant="primary" className="bg-surface/90 text-primary backdrop-blur-sm shadow-sm">
                                        {provider.category}
                                    </Badge>
                                </div>
                            </div>

                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-semibold text-text group-hover:text-primary transition-colors">
                                    {provider.name}
                                </h3>
                                <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded text-xs font-bold text-yellow-700 dark:text-yellow-500">
                                    <span>★ {provider.rating}</span>
                                    <span className="ml-1 font-normal text-muted">({provider.reviewCount})</span>
                                </div>
                            </div>

                            <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                                {provider.description}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-border">
                                <div className="text-sm text-muted">
                                    A partir de
                                </div>
                                <div className="text-lg font-bold text-primary">
                                    R$ {provider.minPrice.toLocaleString('pt-BR')}
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {filteredProviders.length === 0 && (
                <div className="text-center py-12">
                    <div className="bg-surface rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                        <MagnifyingGlassIcon className="h-8 w-8 text-muted" />
                    </div>
                    <h3 className="text-lg font-medium text-text">Nenhum fornecedor encontrado</h3>
                    <p className="text-muted mt-1">Tente ajustar seus filtros ou busca.</p>
                    <button
                        onClick={() => { setSearchQuery(""); setSelectedCategory("Todos"); }}
                        className="mt-4 text-primary hover:underline font-medium"
                    >
                        Limpar filtros
                    </button>
                </div>
            )}
        </div>
    );
}

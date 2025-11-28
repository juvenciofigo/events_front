import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import Input from "@/components/Form/Input";
import Select from "@/components/Form/Select";
import MainNav from "@/components/MainNav";

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
        <>
            {/* Navigation */}
            <MainNav>
                {/* Page Header with Search and Filters - Fixed below MainNav */}
                <div className="fixed w-full z-10 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-b border-gray-200 dark:border-gray-800">
                    <div className="max-w-7xl mx-auto px-2 py-2 md:py-4 sm:px-6 lg:px-8 sm:py-8">
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start gap-1 mb-4 md:items-center md:gap-6 md:mb-6">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                    Marketplace de Serviços
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                    Encontre os melhores fornecedores para o seu evento
                                </p>
                            </div>

                            {/* Search and Filter */}
                            <div className="flex flex-col sm:flex-row gap-1 md:gap-3 w-full md:w-auto">
                                <Input
                                    icon={<MagnifyingGlassIcon className="h-3 w-3 md:h-5 md:w-5 absolute top-[10px]" />}
                                    InputClassName="pl-10"
                                    placeholder="Buscar fornecedores..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Select
                                    selectClassName="pl-10 pr-4 md:py-2 py-1"
                                    icon={<FunnelIcon className="h-3 w-3 md:h-5 md:w-5"  />}
                                    options={CATEGORIES.map(category => ({ value: category, label: category }))}
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Categories Tabs */}
                        <div className="flex overflow-x-auto gap-2 no-scrollbar">
                            {CATEGORIES.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-2 py-1 text-xs md:px-4 md:py-2 rounded-full md:text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </MainNav>



            {/* Main Content - with padding to account for both fixed headers */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-[275px]">
                {/* Providers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProviders.map(provider => (
                        <Link key={provider.id} to={`/marketplace/${provider.id}`} className="group">
                            <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
                                <div className="relative h-48 -mx-4 -mt-4 mb-4 overflow-hidden">
                                    <img
                                        src={provider.image}
                                        alt={provider.name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 right-2">
                                        <Badge variant="primary" className="bg-white/90 dark:bg-gray-800/90 text-primary dark:text-primary-light backdrop-blur-sm shadow-sm">
                                            {provider.category}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                                        {provider.name}
                                    </h3>
                                    <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded text-xs font-bold text-yellow-700 dark:text-yellow-500">
                                        <span>★ {provider.rating}</span>
                                        <span className="ml-1 font-normal text-gray-500 dark:text-gray-400">({provider.reviewCount})</span>
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                    {provider.description}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        A partir de
                                    </div>
                                    <div className="text-lg font-bold text-primary dark:text-primary-light">
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
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                            <MagnifyingGlassIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Nenhum fornecedor encontrado</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">Tente ajustar seus filtros ou busca.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("Todos"); }}
                            className="mt-4 text-primary dark:text-primary-light hover:underline font-medium"
                        >
                            Limpar filtros
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

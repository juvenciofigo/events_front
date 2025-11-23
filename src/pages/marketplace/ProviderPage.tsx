import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    StarIcon,
    MapPinIcon,
    CheckBadgeIcon,
    PhotoIcon,
    VideoCameraIcon,
    CurrencyDollarIcon,
    ChatBubbleLeftRightIcon,
    CalendarDaysIcon,
    FolderIcon
} from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Avatar from "../../components/Avatar";
import Badge from "../../components/Badge";

import { motion, AnimatePresence } from "framer-motion";

// Mock Data for the specific provider (in a real app, fetch based on ID)
const PROVIDER_DATA = {
    id: 1,
    name: "Buffet Delícias Reais",
    category: "Buffet",
    rating: 4.9,
    reviewCount: 128,
    location: "São Paulo, SP",
    description: "Transformamos seu evento em uma experiência gastronômica inesquecível. Especialistas em alta gastronomia para casamentos, eventos corporativos e festas exclusivas. Nossos chefs utilizam apenas ingredientes selecionados para criar pratos que encantam pelo sabor e pela apresentação.",
    avatar: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80",
    features: ["Cardápio Personalizado", "Equipe de Garçons", "Louças de Luxo", "Degustação Prévia", "Opções Veganas/Gluten-Free"],
    pricing: [
        { name: "Silver", price: 150, description: "Coquetel volante + 2 opções de jantar", features: ["4h de serviço", "Bebidas não alcoólicas"] },
        { name: "Gold", price: 220, description: "Jantar completo + Ilha gastronômica", features: ["6h de serviço", "Open Bar Básico"] },
        { name: "Platinum", price: 350, description: "Experiência Chef em Casa + Premium Bar", features: ["8h de serviço", "Open Bar Premium", "Sobremesas Finas"] }
    ],
    albums: [
        {
            id: 1,
            title: "Casamentos",
            items: [
                { type: "image", url: "https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&w=800&q=80" },
                { type: "image", url: "https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&w=800&q=80" },
                { type: "image", url: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80" },
                { type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-gourmet-dish-41629-large.mp4", thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" },
            ]
        },
        {
            id: 2,
            title: "Eventos Corporativos",
            items: [
                { type: "image", url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80" },
                { type: "image", url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80" },
            ]
        },
        {
            id: 3,
            title: "Bastidores",
            items: [
                { type: "image", url: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=800&q=80" },
                { type: "image", url: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80" },
            ]
        }
    ]
};

export default function ProviderPage() {
    const { id } = useParams();
    // In a real app, useQuery to fetch provider by ID
    const provider = PROVIDER_DATA;
    const [activeAlbumId, setActiveAlbumId] = useState(provider.albums[0].id);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const activeAlbum = provider.albums.find(a => a.id === activeAlbumId) || provider.albums[0];

    return (
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-white pb-20">
            {/* Navbar Overlay (Simplified for this page) */}
            <nav className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-background/80 to-transparent">
                <Link to="/marketplace" className="flex items-center text-text/80 hover:text-text transition-colors backdrop-blur-sm bg-surface/20 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10">
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                    Voltar para Marketplace
                </Link>
            </nav>

            {/* Hero / Cover Section */}
            <div className="relative h-[50vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10"></div>
                <img
                    src={provider.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-10">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-6">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-background shadow-2xl shadow-primary/20">
                                <img src={provider.avatar} alt={provider.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-3 -right-3 bg-primary text-white p-2 rounded-full border-4 border-background">
                                <CheckBadgeIcon className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="flex-1 mb-2">
                            <div className="flex items-center gap-3 mb-2">
                                <Badge variant="primary" className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                                    {provider.category}
                                </Badge>
                                <div className="flex items-center text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
                                    <StarIcon className="w-4 h-4 mr-1" />
                                    <span className="font-bold">{provider.rating}</span>
                                    <span className="text-white/50 ml-1 text-sm">({provider.reviewCount} avaliações)</span>
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text mb-2">
                                {provider.name}
                            </h1>
                            <div className="flex items-center text-muted">
                                <MapPinIcon className="w-5 h-5 mr-1 text-primary" />
                                {provider.location}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl backdrop-blur-md transition-all flex items-center font-medium">
                                <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                                Chat
                            </button>
                            <button className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center font-bold">
                                <CalendarDaysIcon className="w-5 h-5 mr-2" />
                                Solicitar Orçamento
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Details & Album */}
                <div className="lg:col-span-2 space-y-12">

                    {/* About Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4 flex items-center">
                            <span className="w-8 h-1 bg-primary rounded-full mr-3"></span>
                            Sobre o Fornecedor
                        </h2>
                        <p className="text-text-secondary leading-relaxed text-lg">
                            {provider.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            {provider.features.map((feature, index) => (
                                <div key={index} className="px-4 py-2 bg-surface border border-white/10 rounded-lg text-text-secondary text-sm flex items-center">
                                    <CheckBadgeIcon className="w-4 h-4 text-cyan-500 mr-2" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Album Gallery */}
                    <section>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
                            <h2 className="text-2xl font-bold text-text flex items-center">
                                <span className="w-8 h-1 bg-cyan-500 rounded-full mr-3"></span>
                                Galeria
                            </h2>

                            {/* Album Tabs */}
                            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
                                {provider.albums.map((album) => (
                                    <button
                                        key={album.id}
                                        onClick={() => setActiveAlbumId(album.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeAlbumId === album.id
                                            ? "bg-secondary text-white shadow-lg shadow-secondary/25"
                                            : "bg-white/5 text-muted hover:bg-white/10 hover:text-text"
                                            } `}
                                    >
                                        {album.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {activeAlbum.items.map((item, index) => (
                                <motion.div
                                    layoutId={`card-${activeAlbum.id}-${index}`}
                                    key={`${activeAlbum.id}-${index}`}
                                    onClick={() => setSelectedId(`card-${activeAlbum.id}-${index}`)}
                                    className={`group relative rounded-xl overflow-hidden bg-surface border border-white/5 aspect-square cursor-pointer ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''} `}
                                >
                                    {item.type === 'video' ? (
                                        <>
                                            <motion.img src={item.thumbnail || item.url} alt="Gallery Item" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                                                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                                    <VideoCameraIcon className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <motion.img src={item.url} alt="Gallery Item" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <span className="text-white text-sm font-medium">Ver em tela cheia</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    <AnimatePresence>
                        {selectedId && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSelectedId(null)}
                                    className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                                />
                                <motion.div
                                    layoutId={selectedId}
                                    className="relative w-full max-w-5xl max-h-full bg-surface rounded-2xl overflow-hidden shadow-2xl z-10"
                                >
                                    {(() => {
                                        const [_, albumId, indexStr] = selectedId.split('-');
                                        const index = parseInt(indexStr);
                                        const item = activeAlbum.items[index];

                                        if (!item) return null;

                                        return (
                                            <div className="relative flex flex-col h-full">
                                                <div className="relative flex-1 overflow-hidden bg-black flex items-center justify-center">
                                                    {item.type === 'video' ? (
                                                        <video
                                                            src={item.url}
                                                            controls
                                                            autoPlay
                                                            className="max-w-full max-h-[80vh] object-contain"
                                                        />
                                                    ) : (
                                                        <motion.img
                                                            src={item.url}
                                                            alt="Gallery Item Full"
                                                            className="max-w-full max-h-[80vh] object-contain"
                                                        />
                                                    )}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedId(null);
                                                        }}
                                                        className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                                                    >
                                                        <ArrowLeftIcon className="w-6 h-6" />
                                                    </button>
                                                </div>
                                                <div className="p-6 bg-slate-900 border-t border-white/10">
                                                    <h3 className="text-xl font-bold text-text mb-2">{activeAlbum.title}</h3>
                                                    <p className="text-muted text-sm">
                                                        Item {index + 1} de {activeAlbum.items.length}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                </div>

                {/* Right Column: Pricing & Booking */}
                <div className="space-y-8">
                    <div className="sticky top-24">
                        <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl shadow-black/50">
                            <h3 className="text-xl font-bold text-text mb-6">Pacotes & Preços</h3>

                            <div className="space-y-4">
                                {provider.pricing.map((pkg, index) => (
                                    <div key={index} className="group p-4 rounded-2xl bg-background border border-white/5 hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="relative flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-text group-hover:text-primary-light transition-colors">{pkg.name}</h4>
                                                <p className="text-xs text-muted">{pkg.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-secondary">R$ {pkg.price}</div>
                                                <div className="text-[10px] text-muted">por pessoa</div>
                                            </div>
                                        </div>
                                        <ul className="mt-3 space-y-1">
                                            {pkg.features.map((feat, i) => (
                                                <li key={i} className="text-xs text-muted flex items-center">
                                                    <div className="w-1 h-1 bg-text-muted rounded-full mr-2"></div>
                                                    {feat}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10">
                                <button className="w-full py-4 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-1">
                                    Verificar Disponibilidade
                                </button>
                                <p className="text-center text-xs text-muted mt-4">
                                    Sem compromisso. Resposta em até 24h.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

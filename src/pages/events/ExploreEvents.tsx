import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    MagnifyingGlassIcon,
    MapPinIcon,
    TicketIcon,
    FunnelIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    StarIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import Button from "@/components/Form/Button";
import LoginRegister from "@/components/LoginRegister";
import Logo from "@/components/Logo";
import PageTransition from "@/components/transitions/PageTransition";
import ToggleTheme from "@/components/ToggleTheme";

// Featured Events Data
const FEATURED_EVENTS = [
    {
        id: 1,
        title: "Festival de Verão 2024",
        date: "15 Dez",
        location: "Parque Ibirapuera, SP",
        price: 150,
        category: "Música",
        description: "O maior festival de música do ano com artistas internacionais",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80",
        featured: true
    },
    {
        id: 2,
        title: "Tech Summit Global",
        date: "20 Jan",
        location: "Centro de Convenções, SP",
        price: 450,
        category: "Tecnologia",
        description: "Conferência de tecnologia com palestrantes renomados mundialmente",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
        featured: true
    },
    {
        id: 3,
        title: "Exposição Arte Moderna",
        date: "05 Fev",
        location: "MASP, SP",
        price: 80,
        category: "Arte",
        description: "Exposição exclusiva de arte moderna e contemporânea",
        image: "https://images.unsplash.com/photo-1514525253440-b393452e3383?auto=format&fit=crop&w=1600&q=80",
        featured: true
    }
];

// Mock Data
const EVENTS = [
    {
        id: 1,
        title: "Festival de Verão 2024",
        date: "15 Dez",
        location: "Parque Ibirapuera, SP",
        price: 150,
        category: "Música",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Tech Summit Global",
        date: "20 Jan",
        location: "Centro de Convenções, SP",
        price: 450,
        category: "Tecnologia",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Exposição Arte Moderna",
        date: "05 Fev",
        location: "MASP, SP",
        price: 80,
        category: "Arte",
        image: "https://images.unsplash.com/photo-1514525253440-b393452e3383?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        title: "Workshop de Gastronomia",
        date: "12 Fev",
        location: "Eataly, SP",
        price: 220,
        category: "Gastronomia",
        image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        title: "Maratona Internacional",
        date: "10 Mar",
        location: "Av. Paulista, SP",
        price: 120,
        category: "Esporte",
        image: "https://images.unsplash.com/photo-1552674605-46d536d2e609?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        title: "Conferência de Design",
        date: "25 Mar",
        location: "Teatro Municipal, SP",
        price: 300,
        category: "Design",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80"
    }
];

const CATEGORIES = ["Todos", "Música", "Tecnologia", "Arte", "Gastronomia", "Esporte", "Design"];

export default function ExploreEvents() {
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-rotate carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % FEATURED_EVENTS.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % FEATURED_EVENTS.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + FEATURED_EVENTS.length) % FEATURED_EVENTS.length);
    };

    const filteredEvents = EVENTS.filter(event => {
        const matchesCategory = selectedCategory === "Todos" || event.category === selectedCategory;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-background text-text pb-20">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex justify-between items-center bg-background/90 backdrop-blur-sm border-b border-white/5">
                <Logo />
                <div className="flex gap-4">
                    <ToggleTheme />
                    <LoginRegister />
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-32 pb-20">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-text">
                        DESCUBRA O <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            EXTRAORDINÁRIO
                        </span>
                    </h1>
                    <p className="text-xl text-muted mb-10 max-w-2xl mx-auto">
                        Explore os eventos mais exclusivos e experiências inesquecíveis acontecendo perto de você.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center bg-surface border border-white/10 rounded-sm p-2 shadow-2xl">
                            <MagnifyingGlassIcon className="w-6 h-6 text-muted ml-4" />
                            <input
                                type="text"
                                placeholder="Buscar eventos, shows, workshops..."
                                className="w-full bg-transparent border-none text-text placeholder-muted focus:ring-0 px-4 py-2 focus:outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button
                                variant="secondary"
                                size="sm"
                            >
                                <FunnelIcon className="w-4 h-4 mr-2" />
                                Filtros
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Events Carousel */}
            <div className="px-6 mb-20">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-black text-text flex items-center gap-2">
                        <StarIconSolid className="w-8 h-8 text-yellow-500" />
                        EVENTOS EM DESTAQUE
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={prevSlide}
                            className="w-10 h-10 rounded-sm bg-surface border border-white/10 hover:bg-primary hover:border-primary flex items-center justify-center transition-all"
                            aria-label="Previous slide"
                        >
                            <ChevronLeftIcon className="w-5 h-5 text-text" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-10 h-10 rounded-sm bg-surface border border-white/10 hover:bg-primary hover:border-primary flex items-center justify-center transition-all"
                            aria-label="Next slide"
                        >
                            <ChevronRightIcon className="w-5 h-5 text-text" />
                        </button>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-sm">
                    {/* Carousel Container */}
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {FEATURED_EVENTS.map((event, index) => (
                            <div
                                key={event.id}
                                className="min-w-full relative"
                            >
                                <Link
                                    to={`/guest/event/${event.id}`}
                                    className="block relative h-[500px] group"
                                >
                                    {/* Background Image */}
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>

                                    {/* Content */}
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="mx-auto px-12 w-full">
                                            <div className="max-w-2xl">
                                                {/* Category Badge */}
                                                <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 px-4 py-2 rounded-sm mb-4">
                                                    <StarIcon className="w-4 h-4 text-primary" />
                                                    <span className="text-sm font-bold text-primary uppercase">
                                                        {event.category} • Destaque
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                                                    {event.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-xl text-gray-300 mb-6">
                                                    {event.description}
                                                </p>

                                                {/* Event Info */}
                                                <div className="flex flex-wrap gap-6 mb-8">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-sm flex flex-col items-center justify-center">
                                                            <div className="text-xs text-gray-400 uppercase font-bold">
                                                                {event.date.split(' ')[1]}
                                                            </div>
                                                            <div className="text-lg font-black text-white">
                                                                {event.date.split(' ')[0]}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-gray-400 uppercase">Data</div>
                                                            <div className="text-sm font-bold text-white">{event.date}</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <MapPinIcon className="w-6 h-6 text-secondary" />
                                                        <div>
                                                            <div className="text-xs text-gray-400 uppercase">Local</div>
                                                            <div className="text-sm font-bold text-white">{event.location}</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <TicketIcon className="w-6 h-6 text-primary" />
                                                        <div>
                                                            <div className="text-xs text-gray-400 uppercase">A partir de</div>
                                                            <div className="text-sm font-bold text-white">R$ {event.price}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* CTA Button */}
                                                <Button
                                                    variant="primary"
                                                    size="lg"
                                                    className="group-hover:scale-105 transition-transform"
                                                >
                                                    <TicketIcon className="w-5 h-5 mr-2" />
                                                    Comprar Ingressos
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Slide Indicators */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {FEATURED_EVENTS.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-1 rounded-full transition-all ${index === currentSlide
                                    ? "w-8 bg-primary"
                                    : "w-4 bg-white/30 hover:bg-white/50"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="px-6 mb-12">
                <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar justify-center">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2 rounded-sm text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                                ? "bg-primary text-white shadow-lg"
                                : "bg-surface-hover text-muted hover:bg-surface-light hover:text-text border border-white/5"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Events Grid */}
            <div className="px-2 md:px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredEvents.map((event) => (
                        <Link
                            to={`/guest/event/${event.id}`}
                            key={event.id}
                            className="group relative bg-surface border border-white/5 rounded overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-2 duration-300"
                        >
                            {/* Image */}
                            <div className="h-64 relative overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80"></div>
                                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-sm text-xs font-bold text-text">
                                    {event.category}
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                    <div className="bg-background/80 backdrop-blur-md px-3 py-1 rounded-sm border border-white/10 text-center">
                                        <div className="text-xs text-muted uppercase font-bold">
                                            {event.date.split(' ')[1]}
                                        </div>
                                        <div className="text-xl font-black text-text">
                                            {event.date.split(' ')[0]}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-text group-hover:text-primary transition-colors">
                                    {event.title}
                                </h3>
                                <div className="flex items-center text-muted text-sm mb-2">
                                    <MapPinIcon className="w-4 h-4 mr-1 text-secondary" />
                                    {event.location}
                                </div>

                                <div className="flex justify-between items-center pt-1 border-t border-white/5">
                                    <div>
                                        <div className="text-xs text-disabled">A partir de</div>
                                        <div className="text-lg font-bold text-text">R$ {event.price}</div>
                                    </div>
                                    <button className="w-10 h-10 rounded-sm bg-white/5 hover:bg-primary flex items-center justify-center transition-colors">
                                        <TicketIcon className="w-5 h-5 text-text" />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

import React from "react";
import { Link } from "react-router-dom";
import MainNav from "../../components/MainNav";
import Footer from "../../components/Footer";
import { CalendarIcon, UserIcon } from "@heroicons/react/24/outline";

const BLOG_POSTS = [
    {
        id: 1,
        title: "Como Organizar um Evento Corporativo de Sucesso",
        excerpt: "Dicas essenciais para planejar e executar eventos corporativos que impressionam e geram resultados.",
        author: "Maria Silva",
        date: "15 Nov, 2024",
        category: "Dicas",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Tendências de Eventos para 2025",
        excerpt: "Descubra as principais tendências que vão dominar o mercado de eventos no próximo ano.",
        author: "João Santos",
        date: "10 Nov, 2024",
        category: "Tendências",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Maximizando Vendas de Ingressos Online",
        excerpt: "Estratégias comprovadas para aumentar suas vendas e alcançar mais público.",
        author: "Ana Costa",
        date: "5 Nov, 2024",
        category: "Marketing",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
    }
];

export default function Blog() {
    return (
        <div className="min-h-screen bg-background text-text">
            <MainNav />
            {/* Hero */}
            <div className="bg-surface border-b border-border">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
                        Blog
                    </h1>
                    <p className="text-base text-muted max-w-2xl">
                        Insights, dicas e novidades do mundo dos eventos.
                    </p>
                </div>
            </div>

            {/* Blog Posts */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {BLOG_POSTS.map((post) => (
                        <article
                            key={post.id}
                            className="bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all group"
                        >
                            <div className="h-40 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
                                        {post.category}
                                    </span>
                                    <div className="flex items-center text-[10px] text-muted">
                                        <CalendarIcon className="w-3 h-3 mr-1" />
                                        {post.date}
                                    </div>
                                </div>
                                <h2 className="text-base font-bold text-text mb-2 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-sm text-muted mb-3 line-clamp-2">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center text-xs text-muted pt-3 border-t border-border">
                                    <UserIcon className="w-3 h-3 mr-1.5" />
                                    {post.author}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

import React from "react";
import { Link } from "react-router-dom";
import MainNav from "../../components/MainNav";
import Footer from "../../components/Footer";
import { HeartIcon, RocketLaunchIcon, UsersIcon } from "@heroicons/react/24/outline";

export default function About() {
    return (
        <div className="min-h-screen bg-background text-text">
            <MainNav />
            {/* Hero */}
            <div className="relative overflow-hidden bg-gradient-to-b from-surface to-background border-b border-border">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                <div className="max-w-4xl mx-auto px-4 py-16 relative text-center">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                        Sobre Nós
                    </h1>
                    <p className="text-base text-muted">
                        Transformando a forma como eventos são criados e gerenciados.
                    </p>
                </div>
            </div>

            {/* Mission */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-surface border border-border rounded-xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <RocketLaunchIcon className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-2xl font-black text-text">Nossa Missão</h2>
                    </div>
                    <p className="text-sm text-muted leading-relaxed mb-3">
                        Acreditamos que criar eventos memoráveis não deveria ser complicado. Nossa plataforma foi desenvolvida para simplificar cada etapa do processo, desde o planejamento até a execução.
                    </p>
                    <p className="text-sm text-muted leading-relaxed">
                        Conectamos organizadores, fornecedores e participantes em um ecossistema integrado, proporcionando ferramentas poderosas e uma experiência excepcional para todos.
                    </p>
                </div>
            </div>

            {/* Values */}
            <div className="bg-surface border-y border-border">
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <h2 className="text-2xl font-black text-text text-center mb-8">Nossos Valores</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                                <HeartIcon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-base font-bold text-text mb-2">Paixão</h3>
                            <p className="text-sm text-muted">
                                Amamos o que fazemos e nos dedicamos a criar a melhor experiência possível.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center mx-auto mb-3">
                                <UsersIcon className="w-6 h-6 text-secondary" />
                            </div>
                            <h3 className="text-base font-bold text-text mb-2">Comunidade</h3>
                            <p className="text-sm text-muted">
                                Construímos juntos, ouvindo e valorizando cada membro da nossa comunidade.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-3">
                                <RocketLaunchIcon className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="text-base font-bold text-text mb-2">Inovação</h3>
                            <p className="text-sm text-muted">
                                Sempre buscando novas formas de melhorar e surpreender nossos usuários.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-black text-text mb-3">
                    Faça Parte da Nossa História
                </h2>
                <p className="text-sm text-muted mb-6">
                    Junte-se a nós e transforme a forma como você cria eventos.
                </p>
                <Link
                    to="/auth/register"
                    className="inline-block px-6 py-2.5 text-sm bg-primary hover:bg-primary-hover text-white rounded-lg font-bold shadow-lg shadow-primary transition-all"
                >
                    Começar Agora
                </Link>
            </div>
            <Footer />
        </div>
    );
}

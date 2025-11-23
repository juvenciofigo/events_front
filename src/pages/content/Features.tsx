import React from "react";
import { Link } from "react-router-dom";
import MainNav from "../../components/MainNav";
import Footer from "../../components/Footer";
import {
    SparklesIcon,
    CalendarDaysIcon,
    UserGroupIcon,
    ChartBarIcon,
    ShieldCheckIcon,
    BoltIcon
} from "@heroicons/react/24/outline";

const FEATURES = [
    {
        icon: CalendarDaysIcon,
        title: "Gestão Completa de Eventos",
        description: "Crie, gerencie e acompanhe todos os seus eventos em um só lugar. Controle total sobre ingressos, participantes e agenda."
    },
    {
        icon: UserGroupIcon,
        title: "Gestão de Participantes",
        description: "Cadastre convidados, atribua assentos e acompanhe confirmações. Sistema completo para eventos privados e públicos."
    },
    {
        icon: ChartBarIcon,
        title: "Analytics em Tempo Real",
        description: "Acompanhe vendas, visualizações e engajamento com dashboards intuitivos e relatórios detalhados."
    },
    {
        icon: ShieldCheckIcon,
        title: "Pagamentos Seguros",
        description: "Integração com principais gateways de pagamento. Transações seguras e confiáveis para seus clientes."
    },
    {
        icon: BoltIcon,
        title: "Marketplace de Fornecedores",
        description: "Conecte-se com fornecedores qualificados. Buffet, fotografia, decoração e muito mais em um só lugar."
    },
    {
        icon: SparklesIcon,
        title: "Experiência Premium",
        description: "Interface moderna e intuitiva. Design responsivo que funciona perfeitamente em qualquer dispositivo."
    }
];

export default function Features() {
    return (
        <div className="min-h-screen bg-background text-text">
            <MainNav />
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-b from-surface to-background border-b border-border">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 py-16 relative">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Recursos Poderosos
                        </h1>
                        <p className="text-base text-muted mb-6">
                            Tudo que você precisa para criar eventos memoráveis e gerenciar seu negócio de forma profissional.
                        </p>
                        <Link
                            to="/auth/register"
                            className="inline-block px-6 py-2.5 text-sm bg-primary hover:bg-primary-hover text-white rounded-lg font-bold shadow-lg shadow-primary transition-all transform hover:-translate-y-1"
                        >
                            Começar Gratuitamente
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {FEATURES.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-surface border border-border rounded-xl p-5 hover:border-primary/30 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                <feature.icon className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-base font-bold text-text mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-surface border-t border-border">
                <div className="max-w-4xl mx-auto px-4 py-10 text-center">
                    <h2 className="text-2xl font-black text-text mb-3">
                        Pronto para começar?
                    </h2>
                    <p className="text-sm text-muted mb-6">
                        Junte-se a milhares de organizadores que já confiam em nossa plataforma.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to="/auth/register"
                            className="px-6 py-2 text-sm bg-primary hover:bg-primary-hover text-white rounded-lg font-bold transition-colors"
                        >
                            Criar Conta Grátis
                        </Link>
                        <Link
                            to="/explore"
                            className="px-6 py-2 text-sm bg-surface-hover hover:bg-surface-light text-text rounded-lg font-bold border border-border transition-colors"
                        >
                            Explorar Eventos
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

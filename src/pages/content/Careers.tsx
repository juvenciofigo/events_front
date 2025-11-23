import React from "react";
import { Link } from "react-router-dom";
import MainNav from "../../components/MainNav";
import Footer from "../../components/Footer";
import { BriefcaseIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";

const JOB_OPENINGS = [
    {
        id: 1,
        title: "Desenvolvedor Full Stack",
        department: "Engenharia",
        location: "Remoto",
        type: "Tempo Integral",
        description: "Buscamos desenvolvedor experiente em React, Node.js e TypeScript para integrar nosso time de produto."
    },
    {
        id: 2,
        title: "Designer de Produto",
        department: "Design",
        location: "São Paulo, SP",
        type: "Tempo Integral",
        description: "Procuramos designer criativo para criar experiências incríveis e interfaces intuitivas."
    },
    {
        id: 3,
        title: "Gerente de Marketing",
        department: "Marketing",
        location: "Híbrido",
        type: "Tempo Integral",
        description: "Lidere estratégias de crescimento e branding para expandir nossa presença no mercado."
    }
];

export default function Careers() {
    return (
        <div className="min-h-screen bg-background text-text">
            <MainNav />
            {/* Hero */}
            <div className="bg-surface border-b border-border">
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                        Carreiras
                    </h1>
                    <p className="text-base text-muted mb-6">
                        Venha fazer parte do time que está revolucionando o mercado de eventos.
                    </p>
                </div>
            </div>

            {/* Why Join Us */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-black text-text text-center mb-8">Por Que Trabalhar Conosco?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
                    <div className="bg-surface border border-border rounded-xl p-4 text-center">
                        <div className="text-3xl mb-3">🚀</div>
                        <h3 className="text-base font-bold text-text mb-1.5">Crescimento</h3>
                        <p className="text-sm text-muted">Oportunidades reais de desenvolvimento profissional e pessoal.</p>
                    </div>
                    <div className="bg-surface border border-border rounded-xl p-4 text-center">
                        <div className="text-3xl mb-3">💡</div>
                        <h3 className="text-base font-bold text-text mb-1.5">Inovação</h3>
                        <p className="text-sm text-muted">Trabalhe com tecnologias modernas e projetos desafiadores.</p>
                    </div>
                    <div className="bg-surface border border-border rounded-xl p-4 text-center">
                        <div className="text-3xl mb-3">🤝</div>
                        <h3 className="text-base font-bold text-text mb-1.5">Cultura</h3>
                        <p className="text-sm text-muted">Ambiente colaborativo, diverso e focado em resultados.</p>
                    </div>
                </div>
            </div>

            {/* Job Openings */}
            <div className="bg-surface border-y border-border">
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <h2 className="text-2xl font-black text-text mb-6">Vagas Abertas</h2>
                    <div className="space-y-4">
                        {JOB_OPENINGS.map((job) => (
                            <div
                                key={job.id}
                                className="bg-background border border-border rounded-xl p-4 hover:border-primary/30 transition-all"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                                    <div>
                                        <h3 className="text-base font-bold text-text mb-1.5">{job.title}</h3>
                                        <div className="flex flex-wrap gap-2 text-xs text-muted">
                                            <span className="flex items-center">
                                                <BriefcaseIcon className="w-3 h-3 mr-1" />
                                                {job.department}
                                            </span>
                                            <span className="flex items-center">
                                                <MapPinIcon className="w-3 h-3 mr-1" />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center">
                                                <ClockIcon className="w-3 h-3 mr-1" />
                                                {job.type}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="px-4 py-1.5 text-xs bg-primary hover:bg-primary-hover text-white rounded-lg font-bold transition-colors whitespace-nowrap">
                                        Candidatar-se
                                    </button>
                                </div>
                                <p className="text-sm text-muted">{job.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-black text-text mb-3">
                    Não encontrou a vaga ideal?
                </h2>
                <p className="text-sm text-muted mb-6">
                    Envie seu currículo para <a href="mailto:careers@example.com" className="text-primary hover:underline">careers@example.com</a>
                </p>
            </div>
            <Footer />
        </div>
    );
}

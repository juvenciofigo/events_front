import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SparklesIcon, CalendarIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function InvitationEnvelope() {
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);

    // Dados do convite (mockado)
    const invitation = {
        eventName: "Festa de Aniversário - 30 Anos",
        hostName: "Maria Silva",
        date: "15 de Dezembro de 2024",
        time: "19:00",
        location: "Salão de Festas Premium - Av. Paulista, 1000",
        message: "Você está convidado para celebrar conosco este momento especial! Será uma noite inesquecível com muita música, dança e alegria.",
        dresscode: "Traje: Esporte Fino"
    };

    useEffect(() => {
        // Abre o envelope automaticamente após 1 segundo
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-purple-950 to-background flex items-center justify-center p-8 overflow-auto relative">
            {/* Partículas de fundo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-primary-light/30 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative w-full max-w-2xl">
                {/* Container do convite que aparece acima */}
                <div
                    className={`mb-6 transition-all duration-1000 ease-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
                        }`}
                >
                    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-2xl p-8 text-text border-4 border-primary/20">
                        {/* Header decorativo */}
                        <div className="text-center mb-6 border-b-2 border-primary/20 pb-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-3 shadow-lg">
                                <SparklesIcon className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">
                                Você está convidado!
                            </h1>
                            <p className="text-sm text-text-muted italic">Por {invitation.hostName}</p>
                        </div>

                        {/* Título do evento */}
                        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
                            {invitation.eventName}
                        </h2>

                        {/* Mensagem */}
                        <p className="text-sm text-slate-700 text-center mb-6 leading-relaxed">
                            {invitation.message}
                        </p>

                        {/* Detalhes do evento */}
                        <div className="space-y-3 bg-slate-50 rounded-lg p-4 border border-borderColor">
                            <div className="flex items-start gap-3">
                                <CalendarIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs font-semibold text-text-muted">Data</p>
                                    <p className="text-sm font-bold text-text">{invitation.date}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <ClockIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs font-semibold text-text-muted">Horário</p>
                                    <p className="text-sm font-bold text-text">{invitation.time}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPinIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs font-semibold text-text-muted">Local</p>
                                    <p className="text-sm font-bold text-text">{invitation.location}</p>
                                </div>
                            </div>
                        </div>

                        {/* Dress code */}
                        <div className="mt-4 text-center">
                            <p className="text-xs text-text-muted italic">{invitation.dresscode}</p>
                        </div>

                        {/* Botões de ação */}
                        <div className="mt-6 flex gap-2">
                            <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white text-sm font-bold rounded-lg shadow-lg transition-all">
                                Confirmar Presença
                            </button>
                            <button className="flex-1 px-4 py-2.5 bg-surface-light hover:bg-surface-hover text-text text-sm font-bold rounded-lg transition-all">
                                Não Poderei Ir
                            </button>
                        </div>

                        {/* Footer decorativo */}
                        <div className="mt-6 pt-4 border-t border-borderColor text-center">
                            <p className="text-xs text-text-muted">
                                Esperamos por você! ✨
                            </p>
                        </div>
                    </div>
                </div>

                {/* Envelope */}
                <div className="relative">
                    {/* Envelope Base */}
                    <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-surface-hover to-surface rounded-lg shadow-2xl border border-white/10">
                        {/* Envelope Flap (tampa) */}
                        <div
                            className={`absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-surface-light to-surface-hover origin-top transition-all duration-1000 ease-out border-b border-white/10 ${isOpen ? '-rotate-x-180 -translate-y-full' : 'rotate-x-0'
                                }`}
                            style={{
                                transformStyle: 'preserve-3d',
                                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                                boxShadow: isOpen ? '0 -10px 30px rgba(0,0,0,0.5)' : 'none'
                            }}
                        >
                            {/* Selo decorativo */}
                            <div className="absolute top-4 right-8 w-12 h-12 bg-primary/20 backdrop-blur-sm border-2 border-primary/50 rounded-full flex items-center justify-center">
                                <SparklesIcon className="w-6 h-6 text-primary-light" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Texto de instrução */}
                {!isOpen && (
                    <div className="absolute -bottom-16 left-0 right-0 text-center">
                        <p className="text-white/60 text-sm animate-pulse">
                            Abrindo convite...
                        </p>
                    </div>
                )}
            </div>

            {/* Confete animado quando abre */}
            {isOpen && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 animate-confetti"
                            style={{
                                left: `${50 + (Math.random() - 0.5) * 40}%`,
                                top: '30%',
                                backgroundColor: ['#ec4899', '#8b5cf6', '#06b6d4', '#f59e0b'][Math.floor(Math.random() * 4)],
                                animationDelay: `${Math.random() * 0.5}s`,
                                animationDuration: `${2 + Math.random()}s`
                            }}
                        />
                    ))}
                </div>
            )}

            <style>{`
                .-rotate-x-180 {
                    transform: rotateX(-180deg);
                }
                
                @keyframes confetti {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
                
                .animate-confetti {
                    animation: confetti linear forwards;
                }
            `}</style>
        </div>
    );
}

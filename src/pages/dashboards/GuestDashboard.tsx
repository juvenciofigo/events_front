import React from "react";
import {
    TicketIcon,
    CalendarDaysIcon,
    MapPinIcon,
    QrCodeIcon,
    StarIcon
} from "@heroicons/react/24/outline";
import Button from "../../components/Form/Button";

export default function GuestDashboard() {
    return (
        <div className="min-h-screen bg-background text-text p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-black tracking-tight text-text mb-2">
                        Meus Ingressos
                    </h1>
                    <p className="text-muted">
                        Acesse seus ingressos e descubra novos eventos.
                    </p>
                </div>

                {/* Featured Ticket (Wallet Style) */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-text mb-6 flex items-center">
                        <TicketIcon className="w-6 h-6 mr-2 text-primary" />
                        Próximo Evento
                    </h2>
                    <div className="relative max-w-3xl mx-auto group">
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-sm blur opacity-25 group-hover:opacity-50 transition duration-500"></div>

                        <div className="relative bg-surface border border-white/10 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl">
                            {/* Left: Event Image */}
                            <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                                <img
                                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"
                                    alt="Event Cover"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent md:bg-gradient-to-r"></div>
                                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-sm text-xs font-bold text-text">
                                    VIP Access
                                </div>
                            </div>

                            {/* Middle: Details */}
                            <div className="flex-1 p-8 flex flex-col justify-between relative">
                                {/* Dashed Line for Ticket Effect */}
                                <div className="absolute left-0 top-0 bottom-0 w-[1px] border-l-2 border-dashed border-surface-hover hidden md:block"></div>
                                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background rounded-full hidden md:block"></div>

                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-2xl font-black text-text mb-1">Festival de Verão 2024</h3>
                                            <div className="flex items-center text-muted text-sm">
                                                <MapPinIcon className="w-4 h-4 mr-1 text-primary" />
                                                Parque Ibirapuera, SP
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-primary">15 DEZ</div>
                                            <div className="text-sm text-disabled">20:00</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-surface bg-surface-hover flex items-center justify-center text-xs text-text">
                                                U{i}
                                            </div>
                                        ))}
                                        <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-hover flex items-center justify-center text-xs text-muted">
                                            +5
                                        </div>
                                    </div>
                                    <Button variant="secondary" size="sm">
                                        <QrCodeIcon className="w-5 h-5 mr-2" />
                                        Ver Ingresso
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div>
                    <h2 className="text-xl font-bold text-text mb-6 flex items-center">
                        <StarIcon className="w-6 h-6 mr-2 text-warning" />
                        Recomendados para você
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="group bg-surface/50 border border-white/5 rounded-sm overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-1">
                                <div className="h-40 relative overflow-hidden">
                                    <img
                                        src={`https://images.unsplash.com/photo-${item === 1 ? '1501281668745-13bc6a60fe3d' : item === 2 ? '1533174072545-291516069d9b' : '1514525253440-b393452e3383'}?auto=format&fit=crop&w=800&q=80`}
                                        alt="Event"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="px-2 py-1 bg-primary text-text text-xs font-bold rounded">Música</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-text text-lg mb-1 group-hover:text-primary transition-colors">
                                        {item === 1 ? 'Noite de Jazz' : item === 2 ? 'Tech Conference' : 'Art Gallery Opening'}
                                    </h3>
                                    <p className="text-sm text-muted mb-4 line-clamp-2">
                                        Uma experiência única com os melhores artistas e palestrantes do cenário atual.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-secondary font-bold">R$ 150,00</span>
                                        <button className="text-sm text-text hover:text-primary transition-colors font-medium">
                                            Comprar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

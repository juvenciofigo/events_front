import React from "react";

import {
    BriefcaseIcon,
    ClockIcon,
    CurrencyDollarIcon,
    ChatBubbleLeftRightIcon,
    CalendarDaysIcon
} from "@heroicons/react/24/outline";
import Button from "../../../components/Form/Button";

export default function SupplierDashboard() {
    return (
        <div className="min-h-screen bg-background text-text p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-text mb-2">
                            Portal do Fornecedor
                        </h1>
                        <p className="text-muted">
                            Gerencie seus serviços, orçamentos e agenda.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button onClick={() => window.location.href = '/marketplace/requests'}>
                            <BriefcaseIcon className="w-5 h-5 mr-2" />
                            Buscar Oportunidades
                        </Button>
                        <Button variant="secondary">
                            <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                            Mensagens
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* Stat Card 1 */}
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6 hover:border-secondary/30 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-secondary/10 rounded-sm border border-secondary/20 group-hover:bg-secondary/20 transition-colors">
                                <BriefcaseIcon className="w-6 h-6 text-secondary" />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-text mb-1">8</div>
                        <div className="text-sm text-muted">Contratos Ativos</div>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6 hover:border-warning/30 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-warning/10 rounded-sm border border-warning/20 group-hover:bg-warning/20 transition-colors">
                                <ClockIcon className="w-6 h-6 text-warning" />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-text mb-1">3</div>
                        <div className="text-sm text-muted">Orçamentos Pendentes</div>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6 hover:border-success/30 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-success/10 rounded-sm border border-success/20 group-hover:bg-success/20 transition-colors">
                                <CurrencyDollarIcon className="w-6 h-6 text-success" />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-text mb-1">R$ 12.5k</div>
                        <div className="text-sm text-muted">Faturamento (Mês)</div>
                    </div>
                </div>

                {/* Requests List */}
                <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-8">
                    <h3 className="text-xl font-bold text-text mb-6">Solicitações de Orçamento</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex flex-col md:flex-row items-center justify-between p-6 bg-background border border-white/5 rounded-sm hover:border-primary/30 transition-all group">
                                <div className="flex items-center gap-6 mb-4 md:mb-0 w-full md:w-auto">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-lg font-bold text-text">
                                        EV
                                    </div>
                                    <div>
                                        <div className="font-bold text-text text-lg">Casamento Silva & Souza</div>
                                        <div className="text-sm text-muted flex items-center gap-2">
                                            <CalendarDaysIcon className="w-4 h-4" /> 15 de Dezembro, 2024
                                            <span className="w-1 h-1 bg-disabled rounded-full"></span>
                                            Buffet Completo para 200 pessoas
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 w-full md:w-auto">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => window.location.href = `/marketplace/requests/${item}`}
                                    >
                                        Ver Detalhes
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => window.location.href = `/chat/new?request=${item}`}
                                    >
                                        Responder
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

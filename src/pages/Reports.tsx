import React from "react";
import {
    ChartBarIcon,
    ArrowDownTrayIcon,
    DocumentTextIcon,
    CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/Form/Button";

export default function Reports() {
    const reports = [
        { id: 1, title: "Relatório de Vendas", description: "Vendas de ingressos por evento", icon: ChartBarIcon, color: "primary" },
        { id: 2, title: "Relatório Financeiro", description: "Receitas, despesas e lucro", icon: DocumentTextIcon, color: "success" },
        { id: 3, title: "Relatório de Convidados", description: "Lista completa de convidados", icon: CalendarDaysIcon, color: "secondary" },
    ];

    return (
        <div className="min-h-screen bg-background text-text p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-black tracking-tight text-text mb-2">Relatórios</h1>
                    <p className="text-muted">Gere e exporte relatórios dos seus eventos</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reports.map((report) => {
                        const Icon = report.icon;
                        return (
                            <div key={report.id} className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6 hover:border-primary/30 transition-colors">
                                <div className={`p-3 bg-${report.color}/10 rounded-sm border border-${report.color}/20 inline-block mb-4`}>
                                    <Icon className={`w-8 h-8 text-${report.color}`} />
                                </div>
                                <h3 className="text-lg font-bold text-text mb-2">{report.title}</h3>
                                <p className="text-sm text-muted mb-4">{report.description}</p>
                                <Button variant="ghost" className="w-full">
                                    <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                                    Gerar Relatório
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

import React from "react";
import {
    TruckIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/Form/Button";

export default function Suppliers() {
    const suppliers = [
        { id: 1, name: "Buffet Delícias", service: "Catering", event: "Casamento Silva & Souza", status: "confirmed", payment: "paid", amount: 3500, contact: "(11) 98765-4321" },
        { id: 2, name: "Foto & Cia", service: "Fotografia", event: "Festival de Verão", status: "pending", payment: "pending", amount: 2200, contact: "(11) 91234-5678" },
        { id: 3, name: "Som Perfeito", service: "Sonorização", event: "Tech Summit", status: "confirmed", payment: "partial", amount: 1800, contact: "(11) 99876-5432" },
        { id: 4, name: "Flores & Arte", service: "Decoração", event: "Aniversário 50 anos", status: "confirmed", payment: "paid", amount: 1200, contact: "(11) 92345-6789" },
        { id: 5, name: "DJ Mix", service: "Entretenimento", event: "Festival de Verão", status: "cancelled", payment: "refunded", amount: 0, contact: "(11) 93456-7890" },
    ];

    const stats = {
        total: suppliers.length,
        confirmed: suppliers.filter(s => s.status === 'confirmed').length,
        pending: suppliers.filter(s => s.status === 'pending').length,
        totalPaid: suppliers.filter(s => s.payment === 'paid').reduce((sum, s) => sum + s.amount, 0),
    };

    return (
        <div className="min-h-screen bg-background text-text p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-text mb-2">
                            Fornecedores Contratados
                        </h1>
                        <p className="text-muted">Gerencie todos os fornecedores dos seus eventos</p>
                    </div>
                    <Button>
                        <TruckIcon className="w-5 h-5 mr-2" />
                        Contratar Fornecedor
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-text">{stats.total}</div>
                        <div className="text-xs text-muted">Total</div>
                    </div>
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-success">{stats.confirmed}</div>
                        <div className="text-xs text-muted">Confirmados</div>
                    </div>
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-warning">{stats.pending}</div>
                        <div className="text-xs text-muted">Pendentes</div>
                    </div>
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-primary">R$ {(stats.totalPaid / 1000).toFixed(1)}k</div>
                        <div className="text-xs text-muted">Total Pago</div>
                    </div>
                </div>

                {/* Suppliers List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {suppliers.map((supplier) => (
                        <div key={supplier.id} className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6 hover:border-primary/30 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-primary/10 rounded-sm border border-primary/20">
                                        <TruckIcon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-text">{supplier.name}</h3>
                                        <p className="text-sm text-muted">{supplier.service}</p>
                                    </div>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-sm ${supplier.status === 'confirmed' ? 'bg-success/20 text-success' :
                                        supplier.status === 'pending' ? 'bg-warning/20 text-warning' :
                                            'bg-error/20 text-error'
                                    }`}>
                                    {supplier.status === 'confirmed' ? (
                                        <span className="flex items-center gap-1">
                                            <CheckCircleIcon className="w-3 h-3" />
                                            Confirmado
                                        </span>
                                    ) : supplier.status === 'pending' ? (
                                        <span className="flex items-center gap-1">
                                            <ClockIcon className="w-3 h-3" />
                                            Pendente
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1">
                                            <XCircleIcon className="w-3 h-3" />
                                            Cancelado
                                        </span>
                                    )}
                                </span>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">Evento:</span>
                                    <span className="text-text font-bold">{supplier.event}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">Contato:</span>
                                    <span className="text-text">{supplier.contact}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">Valor:</span>
                                    <span className="text-text font-bold">R$ {supplier.amount.toLocaleString('pt-BR')}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <div className="flex items-center gap-2">
                                    <CurrencyDollarIcon className="w-4 h-4 text-muted" />
                                    <span className={`text-xs ${supplier.payment === 'paid' ? 'text-success' :
                                            supplier.payment === 'partial' ? 'text-warning' :
                                                supplier.payment === 'refunded' ? 'text-error' :
                                                    'text-muted'
                                        }`}>
                                        {supplier.payment === 'paid' ? '✓ Pago' :
                                            supplier.payment === 'partial' ? '⚠ Parcial' :
                                                supplier.payment === 'refunded' ? '↺ Reembolsado' :
                                                    '⏳ Pendente'}
                                    </span>
                                </div>
                                <button className="text-xs font-bold text-primary hover:text-primary-light transition-colors">
                                    Ver detalhes
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

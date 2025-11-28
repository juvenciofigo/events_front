import React from "react";
import {
    CurrencyDollarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    BanknotesIcon,
    CreditCardIcon,
    ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function Financial() {
    // Mock data
    const financialData = {
        balance: 45200,
        pending: 12300,
        available: 32900,
        revenue: 45200,
        expenses: 28500,
        profit: 16700,
        projectedProfit: 22000,
    };

    const transactions = [
        { id: 1, type: "revenue", description: "Venda de ingressos - Festival de Verão", amount: 1250, date: "Hoje, 14:30", status: "completed" },
        { id: 2, type: "expense", description: "Pagamento - Buffet Delícias", amount: -3500, date: "Ontem, 10:15", status: "completed" },
        { id: 3, type: "revenue", description: "Venda de ingressos - Tech Summit", amount: 890, date: "02/01/2025", status: "completed" },
        { id: 4, type: "pending", description: "Venda pendente - Workshop Design", amount: 450, date: "01/01/2025", status: "pending" },
        { id: 5, type: "expense", description: "Pagamento - Foto & Cia", amount: -2200, date: "30/12/2024", status: "completed" },
    ];

    const monthlyData = [
        { month: "Jul", revenue: 32000, expenses: 18000 },
        { month: "Ago", revenue: 38000, expenses: 22000 },
        { month: "Set", revenue: 42000, expenses: 25000 },
        { month: "Out", revenue: 45200, expenses: 28500 },
    ];

    const maxValue = Math.max(...monthlyData.map(d => Math.max(d.revenue, d.expenses)));

    return (
        <div className="min-h-screen bg-background text-text p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-black tracking-tight text-text mb-2">
                        Financeiro
                    </h1>
                    <p className="text-muted">Gerencie suas receitas, despesas e saldo disponível</p>
                </div>

                {/* Balance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-success/10 rounded-sm border border-success/20">
                                <BanknotesIcon className="w-6 h-6 text-success" />
                            </div>
                            <div>
                                <div className="text-sm text-muted">Saldo Total</div>
                                <div className="text-2xl font-black text-success">
                                    R$ {(financialData.balance / 1000).toFixed(1)}k
                                </div>
                            </div>
                        </div>
                        <div className="text-xs text-muted">Receitas - Despesas</div>
                    </div>

                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-warning/10 rounded-sm border border-warning/20">
                                <CreditCardIcon className="w-6 h-6 text-warning" />
                            </div>
                            <div>
                                <div className="text-sm text-muted">Pendente</div>
                                <div className="text-2xl font-black text-warning">
                                    R$ {(financialData.pending / 1000).toFixed(1)}k
                                </div>
                            </div>
                        </div>
                        <div className="text-xs text-muted">Aguardando processamento</div>
                    </div>

                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-primary/10 rounded-sm border border-primary/20">
                                <CurrencyDollarIcon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <div className="text-sm text-muted">Disponível</div>
                                <div className="text-2xl font-black text-primary">
                                    R$ {(financialData.available / 1000).toFixed(1)}k
                                </div>
                            </div>
                        </div>
                        <div className="text-xs text-muted">Pronto para saque</div>
                    </div>
                </div>

                {/* Chart & Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    {/* Monthly Chart */}
                    <div className="lg:col-span-2 bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6">
                        <h3 className="text-lg font-bold text-text mb-6">Receitas vs Despesas (Últimos 4 meses)</h3>
                        <div className="flex items-end justify-between h-64 gap-4">
                            {monthlyData.map((data, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full flex gap-2 items-end" style={{ height: '100%' }}>
                                        {/* Revenue Bar */}
                                        <div
                                            className="flex-1 bg-success/30 rounded-t relative group cursor-pointer hover:bg-success/40 transition-colors"
                                            style={{ height: `${(data.revenue / maxValue) * 100}%` }}>
                                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-success opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                R$ {(data.revenue / 1000).toFixed(0)}k
                                            </span>
                                        </div>
                                        {/* Expense Bar */}
                                        <div
                                            className="flex-1 bg-error/30 rounded-t relative group cursor-pointer hover:bg-error/40 transition-colors"
                                            style={{ height: `${(data.expenses / maxValue) * 100}%` }}>
                                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-error opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                R$ {(data.expenses / 1000).toFixed(0)}k
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-xs text-muted">{data.month}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-center gap-6 mt-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-success/30 rounded"></div>
                                <span className="text-xs text-muted">Receitas</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-error/30 rounded"></div>
                                <span className="text-xs text-muted">Despesas</span>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6">
                        <h3 className="text-lg font-bold text-text mb-6">Resumo do Mês</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted">Receita</span>
                                <span className="text-lg font-bold text-success">R$ {(financialData.revenue / 1000).toFixed(1)}k</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted">Despesas</span>
                                <span className="text-lg font-bold text-error">R$ {(financialData.expenses / 1000).toFixed(1)}k</span>
                            </div>
                            <div className="h-px bg-white/10"></div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-text">Lucro</span>
                                <span className="text-xl font-black text-accent">R$ {(financialData.profit / 1000).toFixed(1)}k</span>
                            </div>
                            <div className="p-3 bg-info/10 border border-info/20 rounded-sm mt-4">
                                <div className="text-xs text-info mb-1">Projeção</div>
                                <div className="text-lg font-bold text-info">R$ {(financialData.projectedProfit / 1000).toFixed(1)}k</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transactions */}
                <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-text">Transações Recentes</h3>
                        <button className="text-sm text-primary hover:text-primary-light transition-colors">
                            Ver todas
                        </button>
                    </div>
                    <div className="space-y-3">
                        {transactions.map((transaction) => (
                            <div key={transaction.id} className="flex items-center justify-between p-4 bg-white/5 rounded-sm border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-sm ${transaction.type === 'revenue' ? 'bg-success/10 border border-success/20' :
                                            transaction.type === 'expense' ? 'bg-error/10 border border-error/20' :
                                                'bg-warning/10 border border-warning/20'
                                        }`}>
                                        {transaction.type === 'revenue' ? (
                                            <ArrowTrendingUpIcon className="w-5 h-5 text-success" />
                                        ) : transaction.type === 'expense' ? (
                                            <ArrowTrendingDownIcon className="w-5 h-5 text-error" />
                                        ) : (
                                            <ChartBarIcon className="w-5 h-5 text-warning" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-text">{transaction.description}</div>
                                        <div className="text-xs text-muted">{transaction.date}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-lg font-bold ${transaction.amount > 0 ? 'text-success' : 'text-error'
                                        }`}>
                                        {transaction.amount > 0 ? '+' : ''} R$ {Math.abs(transaction.amount).toLocaleString('pt-BR')}
                                    </div>
                                    <div className={`text-xs px-2 py-0.5 rounded inline-block ${transaction.status === 'completed' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                                        }`}>
                                        {transaction.status === 'completed' ? 'Concluído' : 'Pendente'}
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

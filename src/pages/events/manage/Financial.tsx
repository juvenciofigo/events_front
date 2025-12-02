import React from 'react'
import {
    CurrencyDollarIcon,
    ChartBarIcon,
    ArrowTrendingUpIcon,
    BanknotesIcon,
    CreditCardIcon,
    ReceiptPercentIcon,
    ArrowDownTrayIcon,
    CalendarIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon
} from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { useFinancialStats, useTransactions } from "@/hooks/useFinancial";

export default function Financial() {
    const { id } = useParams<{ id: string }>();
    const { data: stats, isLoading: statsLoading } = useFinancialStats(id || "");
    const { data: transactionsData, isLoading: transactionsLoading } = useTransactions(id || "");

    const isLoading = statsLoading || transactionsLoading;

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    return (
        <div className="space-y-6">
            {/* Financial Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-green-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Receita Total</div>
                        <CurrencyDollarIcon className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-3xl font-black text-text">{formatCurrency(stats?.totalRevenue || 0)}</div>
                    <div className="text-xs text-green-400 mt-1 flex items-center gap-1">
                        <ArrowTrendingUpIcon className="w-3 h-3" />
                        +18.5% vs mês anterior (Simulado)
                    </div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-blue-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Receita Líquida</div>
                        <BanknotesIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-3xl font-black text-text">{formatCurrency(stats?.netRevenue || 0)}</div>
                    <div className="text-xs text-text-muted mt-1">Após taxas e descontos</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-purple-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Taxas Totais</div>
                        <ReceiptPercentIcon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-3xl font-black text-text">{formatCurrency(stats?.totalFees || 0)}</div>
                    <div className="text-xs text-purple-400 mt-1">Taxas de processamento</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-yellow-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Descontos</div>
                        <ReceiptPercentIcon className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="text-3xl font-black text-text">{formatCurrency(stats?.totalDiscounts || 0)}</div>
                    <div className="text-xs text-yellow-400 mt-1">Cupons e promoções</div>
                </div>
            </div>

            {/* Revenue Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Revenue by Ticket Type */}
                <div className="border border-borderColor rounded p-6">
                    <h3 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                        <ChartBarIcon className="w-6 h-6 text-primary" />
                        Receita por Tipo de Ingresso
                    </h3>
                    <div className="space-y-4">
                        {stats?.revenueByTicketType.map((item, index) => {
                            const percentage = stats.totalRevenue > 0 ? (item.revenue / stats.totalRevenue) * 100 : 0;
                            const colors = ['bg-purple-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500'];
                            const color = colors[index % colors.length];

                            return (
                                <div key={item.ticketType} className="p-4 bg-white/5 rounded border border-borderColor">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${color}`}></div>
                                            <span className="font-semibold text-text">{item.ticketType}</span>
                                        </div>
                                        <span className="font-bold text-green-400">{formatCurrency(item.revenue)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-text-muted mb-2">
                                        <span>{item.quantity} vendidos</span>
                                        <span>{percentage.toFixed(1)}% do total</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className={`h-full ${color}`} style={{ width: `${percentage}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                        {(!stats?.revenueByTicketType || stats.revenueByTicketType.length === 0) && (
                            <div className="text-center text-text-muted py-8">Nenhuma venda registrada ainda.</div>
                        )}
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="border border-borderColor rounded p-6">
                    <h3 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                        <CreditCardIcon className="w-6 h-6 text-primary" />
                        Métodos de Pagamento
                    </h3>
                    <div className="space-y-4">
                        {stats?.revenueByPaymentMethod.map((item, index) => {
                            const percentage = stats.totalRevenue > 0 ? (item.revenue / stats.totalRevenue) * 100 : 0;
                            const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500'];
                            const color = colors[index % colors.length];
                            const icons = {
                                'credit_card': CreditCardIcon,
                                'pix': BanknotesIcon,
                                'boleto': ReceiptPercentIcon
                            };
                            const Icon = icons[item.method as keyof typeof icons] || CreditCardIcon;

                            return (
                                <div key={item.method} className="p-4 bg-white/5 rounded border border-borderColor">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <Icon className={`w-5 h-5 ${index === 0 ? 'text-blue-400' : index === 1 ? 'text-green-400' : 'text-purple-400'}`} />
                                            <span className="font-semibold text-text capitalize">{item.method.replace('_', ' ')}</span>
                                        </div>
                                        <span className="font-bold text-text">{formatCurrency(item.revenue)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-text-muted mb-2">
                                        <span>{item.count} transações</span>
                                        <span>{percentage.toFixed(1)}% do total</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className={`h-full ${color}`} style={{ width: `${percentage}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                        {(!stats?.revenueByPaymentMethod || stats.revenueByPaymentMethod.length === 0) && (
                            <div className="text-center text-text-muted py-8">Nenhum pagamento registrado ainda.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="border border-borderColor rounded p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-text flex items-center gap-2">
                        <ReceiptPercentIcon className="w-6 h-6 text-primary" />
                        Transações Recentes
                    </h3>
                    <button className="px-4 py-2 border border-borderColor hover:bg-white/5 text-text rounded font-semibold transition-all flex items-center gap-2">
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        Exportar
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-borderColor bg-white/5">
                                <th className="px-4 py-3 text-sm font-bold text-muted">Data</th>
                                <th className="px-4 py-3 text-sm font-bold text-muted">Cliente</th>
                                <th className="px-4 py-3 text-sm font-bold text-muted">Tipo</th>
                                <th className="px-4 py-3 text-sm font-bold text-muted">Método</th>
                                <th className="px-4 py-3 text-sm font-bold text-muted">Valor</th>
                                <th className="px-4 py-3 text-sm font-bold text-muted">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-borderColor">
                            {transactionsData?.transactions.map((transaction: any) => (
                                <tr key={transaction.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-3 text-text-muted text-sm">
                                        {new Date(transaction.date).toLocaleString('pt-BR')}
                                    </td>
                                    <td className="px-4 py-3 text-text font-medium">{transaction.customerName}</td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded">
                                            {transaction.ticketType}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-text-muted text-sm capitalize">
                                        {transaction.method.replace('_', ' ')}
                                    </td>
                                    <td className={`px-4 py-3 font-bold ${transaction.status === 'failed' ? 'text-red-400' : 'text-green-400'}`}>
                                        {formatCurrency(transaction.amount)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`flex items-center text-sm ${transaction.status === 'approved' ? 'text-green-400' :
                                                transaction.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
                                            }`}>
                                            {transaction.status === 'approved' && <CheckCircleIcon className="w-4 h-4 mr-1" />}
                                            {transaction.status === 'pending' && <ClockIcon className="w-4 h-4 mr-1" />}
                                            {transaction.status === 'failed' && <XCircleIcon className="w-4 h-4 mr-1" />}
                                            {transaction.status === 'approved' ? 'Aprovado' :
                                                transaction.status === 'pending' ? 'Pendente' : 'Recusado'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {(!transactionsData?.transactions || transactionsData.transactions.length === 0) && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-text-muted">
                                        Nenhuma transação encontrada.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Revenue Timeline Chart (Simulated for now as API doesn't provide this yet) */}
            <div className="border border-borderColor rounded p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-text flex items-center gap-2">
                        <ChartBarIcon className="w-6 h-6 text-primary" />
                        Evolução da Receita
                    </h3>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-primary/20 text-primary rounded text-sm font-semibold">7 dias</button>
                        <button className="px-3 py-1 border border-borderColor hover:bg-white/5 text-text rounded text-sm transition-colors">30 dias</button>
                        <button className="px-3 py-1 border border-borderColor hover:bg-white/5 text-text rounded text-sm transition-colors">90 dias</button>
                    </div>
                </div>
                <div className="bg-slate-900/50 rounded p-6 border border-borderColor">
                    <div className="flex items-end justify-between h-64 gap-2">
                        {[8500, 12300, 15800, 10200, 18900, 22400, 19600].map((value, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full bg-gradient-to-t from-primary to-primary/40 rounded-t transition-all cursor-pointer relative group" style={{ height: `${(value / 22400) * 100}%` }}>
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-background border border-borderColor px-3 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        R$ {value.toLocaleString('pt-BR')}
                                    </div>
                                </div>
                                <div className="text-xs text-text-muted">
                                    {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][i]}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center text-xs text-text-muted mt-4">Últimos 7 dias (Simulado)</div>
                </div>
            </div>

            {/* Financial Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 border border-borderColor rounded hover:bg-white/5 transition-all text-left group">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ArrowDownTrayIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-bold text-text">Relatório Financeiro</div>
                            <div className="text-xs text-text-muted">PDF completo</div>
                        </div>
                    </div>
                </button>
                <button className="p-4 border border-borderColor rounded hover:bg-white/5 transition-all text-left group">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <CalendarIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-bold text-text">Agendar Repasse</div>
                            <div className="text-xs text-text-muted">Configurar transferência</div>
                        </div>
                    </div>
                </button>
                <button className="p-4 border border-borderColor rounded hover:bg-white/5 transition-all text-left group">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ReceiptPercentIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-bold text-text">Notas Fiscais</div>
                            <div className="text-xs text-text-muted">Gerenciar NF-e</div>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}

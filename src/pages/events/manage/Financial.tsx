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
import { StatisticsCards } from "@/components/StatisticsCards";
import Button from '@/components/Form/Button';
import Loading from '@/components/Loading';
import ErrorState from '@/components/ErrorState';
import { FinancialBreakdown } from '@/components/FinancialBreakdown';

export default function Financial({ eventId }: { eventId: string }) {
    const { data: stats, isLoading: statsLoading, isError: statsError } = useFinancialStats(eventId);
    // const { data: transactionsData, isLoading: transactionsLoading, isError: transactionsError } = useTransactions(eventId || "");

    const isLoading = statsLoading;
    const isError = statsError;

    if (isLoading) {
        return (
            <Loading text='' />
        );
    }

    if (isError) {
        return (
            <ErrorState />
        )
    }

    const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    const ticketTypeItems = stats?.revenueBySeat.map((item, index) => {
        const colors = ['bg-purple-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500'];
        return {
            id: item.seatName,
            label: item.seatName,
            value: item.revenue,
            quantity: item.quantity,
            color: colors[index % colors.length]
        };
    }) || [];

    const paymentMethodItems = stats?.revenueByPaymentMethod?.map((item, index) => {
        const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500'];
        const icons = {
            'CARD': CreditCardIcon,
            'MPESA': BanknotesIcon,
        };
        const IconComponent = icons[item.method as keyof typeof icons] || CreditCardIcon;
        const iconColorClass = index === 0 ? 'text-blue-400' : index === 1 ? 'text-green-400' : 'text-purple-400';

        return {
            id: item.method,
            label: item.method,
            value: item.revenue,
            quantity: item.quantity,
            color: colors[index % colors.length],
            icon: <IconComponent className={`w-3 h-3 ${iconColorClass}`} />
        };
    }) || [];

    return (
        <div className="space-y-6">
            {/* Financial Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <StatisticsCards
                    title="Receita Total"
                    icon={<CurrencyDollarIcon className="w-5 h-5 text-green-400" />}
                    data={formatCurrency(stats?.totalRevenue || 0)}
                    color="green-500/5"
                    description={
                        <div className="text-xs text-green-400 mt-1 flex items-center gap-1">
                            <ArrowTrendingUpIcon className="w-3 h-3" />
                            +18.5% vs mês anterior (Simulado)
                        </div>
                    }
                />
                <StatisticsCards
                    title="Receita Líquida"
                    icon={<BanknotesIcon className="w-5 h-5 text-blue-400" />}
                    data={formatCurrency(stats?.netRevenue || 0)}
                    color="blue-500/5"
                    description="Após taxas e descontos"
                />
                <StatisticsCards
                    title="Despesas Totais"
                    icon={<ReceiptPercentIcon className="w-5 h-5 text-purple-400" />}
                    data={formatCurrency(stats?.totalExpenses || 0)}
                    color="red-500/5"
                    description={<div className="text-xs text-red-400 mt-1">Despesas</div>}
                />
                <StatisticsCards
                    title="Taxas Totais"
                    icon={<ReceiptPercentIcon className="w-5 h-5 text-purple-400" />}
                    data={formatCurrency(stats?.totalFees || 0)}
                    color="purple-500/5"
                    description={<div className="text-xs text-purple-400 mt-1">Taxas de processamento</div>}
                />
                <StatisticsCards
                    title="Descontos"
                    icon={<ReceiptPercentIcon className="w-5 h-5 text-yellow-400" />}
                    data={formatCurrency(stats?.totalDiscounts || 0)}
                    color="yellow-500/5"
                    description={<div className="text-xs text-yellow-400 mt-1">Cupons e promoções</div>}
                />
            </div>

            {/* Revenue Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FinancialBreakdown
                    title="Receita por Tipo de Assento"
                    icon={<ChartBarIcon className="w-6 h-6 text-primary" />}
                    items={ticketTypeItems}
                    totalValue={stats?.totalRevenue || 0}
                    emptyMessage="Nenhuma venda registrada ainda."
                />

                <FinancialBreakdown
                    title="Métodos de Pagamento"
                    icon={<CreditCardIcon className="w-6 h-6 text-primary" />}
                    items={paymentMethodItems}
                    totalValue={stats?.totalRevenue || 0}
                    emptyMessage="Nenhum pagamento registrado ainda."
                    variant="compact"
                />
            </div>

            {/* Recent Transactions */}
            <div className="border-t pt-3 border-borderColor">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-text flex items-center gap-2">
                        <ReceiptPercentIcon className="w-6 h-6 text-primary" />
                        Transações Recentes
                    </h3>
                    <Button >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        Exportar
                    </Button>
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
                            {stats?.recentTransactions?.map((transaction) => (
                                <tr key={transaction.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-3 text-text-muted text-sm">
                                        {new Date(transaction.date).toLocaleString('pt-BR')}
                                    </td>
                                    <td className="px-4 py-3 text-text font-medium">{transaction.guestName}</td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded">
                                            {transaction.seatName}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-text-muted text-sm capitalize">
                                        {transaction.paymentMethod}
                                    </td>
                                    <td className={`px-4 py-3 font-bold ${transaction.paymentStatus === 'COMPLETED' ? 'text-red-400' : 'text-green-400'}`}>
                                        {formatCurrency(transaction.amount)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`flex items-center text-sm ${transaction.paymentStatus === 'COMPLETED' ? 'text-green-400' :
                                            transaction.paymentStatus === 'PENDING' ? 'text-yellow-400' : 'text-red-400'
                                            }`}>
                                            {transaction.paymentStatus === 'COMPLETED' && <CheckCircleIcon className="w-4 h-4 mr-1" />}
                                            {transaction.paymentStatus === 'PENDING' && <ClockIcon className="w-4 h-4 mr-1" />}
                                            {transaction.paymentStatus === 'FAILED' && <XCircleIcon className="w-4 h-4 mr-1" />}
                                            {transaction.paymentStatus === 'COMPLETED' ? 'Aprovado' :
                                                transaction.paymentStatus === 'PENDING' ? 'Pendente' : 'Recusado'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {(!stats?.recentTransactions || stats.recentTransactions.length === 0) && (
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
            {/* <div className="border-t border-borderColor rounded pt-3">
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
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
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
            </div> */}

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

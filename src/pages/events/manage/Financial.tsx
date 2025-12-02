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

export default function Financial() {
    return (
        <div className="space-y-6">
            {/* Financial Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-green-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Receita Total</div>
                        <CurrencyDollarIcon className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-3xl font-black text-text">R$ 148.600</div>
                    <div className="text-xs text-green-400 mt-1 flex items-center gap-1">
                        <ArrowTrendingUpIcon className="w-3 h-3" />
                        +18.5% vs mês anterior
                    </div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-blue-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Receita Líquida</div>
                        <BanknotesIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-3xl font-black text-text">R$ 125.000</div>
                    <div className="text-xs text-text-muted mt-1">Após taxas e descontos</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-purple-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Taxas Totais</div>
                        <ReceiptPercentIcon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-3xl font-black text-text">R$ 14.860</div>
                    <div className="text-xs text-purple-400 mt-1">10% do total</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-yellow-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Descontos</div>
                        <ReceiptPercentIcon className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="text-3xl font-black text-text">R$ 8.740</div>
                    <div className="text-xs text-yellow-400 mt-1">5.9% em promoções</div>
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
                        <div className="p-4 bg-white/5 rounded border border-borderColor">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                    <span className="font-semibold text-text">VIP</span>
                                </div>
                                <span className="font-bold text-green-400">R$ 70.000</span>
                            </div>
                            <div className="flex justify-between text-xs text-text-muted mb-2">
                                <span>280 vendidos × R$ 250</span>
                                <span>47.1% do total</span>
                            </div>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500" style={{ width: '47.1%' }}></div>
                            </div>
                        </div>
                        <div className="p-4 bg-white/5 rounded border border-borderColor">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                    <span className="font-semibold text-text">Pista</span>
                                </div>
                                <span className="font-bold text-green-400">R$ 64.000</span>
                            </div>
                            <div className="flex justify-between text-xs text-text-muted mb-2">
                                <span>800 vendidos × R$ 80</span>
                                <span>43.1% do total</span>
                            </div>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: '43.1%' }}></div>
                            </div>
                        </div>
                        <div className="p-4 bg-white/5 rounded border border-borderColor">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <span className="font-semibold text-text">Early Bird</span>
                                </div>
                                <span className="font-bold text-green-400">R$ 9.000</span>
                            </div>
                            <div className="flex justify-between text-xs text-text-muted mb-2">
                                <span>150 vendidos × R$ 60</span>
                                <span>6.1% do total</span>
                            </div>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500" style={{ width: '6.1%' }}></div>
                            </div>
                        </div>
                        <div className="p-4 bg-white/5 rounded border border-borderColor">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="font-semibold text-text">Lote Grupo</span>
                                </div>
                                <span className="font-bold text-green-400">R$ 5.600</span>
                            </div>
                            <div className="flex justify-between text-xs text-text-muted mb-2">
                                <span>20 vendidos × R$ 280</span>
                                <span>3.7% do total</span>
                            </div>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500" style={{ width: '3.7%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="border border-borderColor rounded p-6">
                    <h3 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                        <CreditCardIcon className="w-6 h-6 text-primary" />
                        Métodos de Pagamento
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded border border-borderColor">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <CreditCardIcon className="w-5 h-5 text-blue-400" />
                                    <span className="font-semibold text-text">Cartão de Crédito</span>
                                </div>
                                <span className="font-bold text-text">R$ 104.020</span>
                            </div>
                            <div className="flex justify-between text-xs text-text-muted mb-2">
                                <span>890 transações</span>
                                <span>70% do total</span>
                            </div>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: '70%' }}></div>
                            </div>
                        </div>
                        <div className="p-4 bg-white/5 rounded border border-borderColor">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <BanknotesIcon className="w-5 h-5 text-green-400" />
                                    <span className="font-semibold text-text">PIX</span>
                                </div>
                                <span className="font-bold text-text">R$ 37.150</span>
                            </div>
                            <div className="flex justify-between text-xs text-text-muted mb-2">
                                <span>280 transações</span>
                                <span>25% do total</span>
                            </div>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500" style={{ width: '25%' }}></div>
                            </div>
                        </div>
                        <div className="p-4 bg-white/5 rounded border border-borderColor">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <ReceiptPercentIcon className="w-5 h-5 text-purple-400" />
                                    <span className="font-semibold text-text">Boleto</span>
                                </div>
                                <span className="font-bold text-text">R$ 7.430</span>
                            </div>
                            <div className="flex justify-between text-xs text-text-muted mb-2">
                                <span>80 transações</span>
                                <span>5% do total</span>
                            </div>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500" style={{ width: '5%' }}></div>
                            </div>
                        </div>
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
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3 text-text-muted text-sm">01/12/2024 14:32</td>
                                <td className="px-4 py-3 text-text font-medium">João Silva</td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded">VIP</span>
                                </td>
                                <td className="px-4 py-3 text-text-muted text-sm">Cartão de Crédito</td>
                                <td className="px-4 py-3 text-green-400 font-bold">R$ 250,00</td>
                                <td className="px-4 py-3">
                                    <span className="flex items-center text-green-400 text-sm">
                                        <CheckCircleIcon className="w-4 h-4 mr-1" /> Aprovado
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3 text-text-muted text-sm">01/12/2024 13:18</td>
                                <td className="px-4 py-3 text-text font-medium">Maria Santos</td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded">Pista</span>
                                </td>
                                <td className="px-4 py-3 text-text-muted text-sm">PIX</td>
                                <td className="px-4 py-3 text-green-400 font-bold">R$ 80,00</td>
                                <td className="px-4 py-3">
                                    <span className="flex items-center text-green-400 text-sm">
                                        <CheckCircleIcon className="w-4 h-4 mr-1" /> Aprovado
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3 text-text-muted text-sm">01/12/2024 12:45</td>
                                <td className="px-4 py-3 text-text font-medium">Pedro Costa</td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded">Lote Grupo</span>
                                </td>
                                <td className="px-4 py-3 text-text-muted text-sm">Boleto</td>
                                <td className="px-4 py-3 text-yellow-400 font-bold">R$ 280,00</td>
                                <td className="px-4 py-3">
                                    <span className="flex items-center text-yellow-400 text-sm">
                                        <ClockIcon className="w-4 h-4 mr-1" /> Pendente
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3 text-text-muted text-sm">01/12/2024 11:22</td>
                                <td className="px-4 py-3 text-text font-medium">Ana Oliveira</td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded">VIP</span>
                                </td>
                                <td className="px-4 py-3 text-text-muted text-sm">Cartão de Crédito</td>
                                <td className="px-4 py-3 text-green-400 font-bold">R$ 250,00</td>
                                <td className="px-4 py-3">
                                    <span className="flex items-center text-green-400 text-sm">
                                        <CheckCircleIcon className="w-4 h-4 mr-1" /> Aprovado
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3 text-text-muted text-sm">30/11/2024 18:55</td>
                                <td className="px-4 py-3 text-text font-medium">Carlos Mendes</td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded">Early Bird</span>
                                </td>
                                <td className="px-4 py-3 text-text-muted text-sm">PIX</td>
                                <td className="px-4 py-3 text-green-400 font-bold">R$ 60,00</td>
                                <td className="px-4 py-3">
                                    <span className="flex items-center text-green-400 text-sm">
                                        <CheckCircleIcon className="w-4 h-4 mr-1" /> Aprovado
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3 text-text-muted text-sm">30/11/2024 16:30</td>
                                <td className="px-4 py-3 text-text font-medium">Juliana Lima</td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded">Pista</span>
                                </td>
                                <td className="px-4 py-3 text-text-muted text-sm">Cartão de Crédito</td>
                                <td className="px-4 py-3 text-red-400 font-bold">R$ 80,00</td>
                                <td className="px-4 py-3">
                                    <span className="flex items-center text-red-400 text-sm">
                                        <XCircleIcon className="w-4 h-4 mr-1" /> Recusado
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Revenue Timeline Chart */}
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
                    <div className="text-center text-xs text-text-muted mt-4">Últimos 7 dias</div>
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

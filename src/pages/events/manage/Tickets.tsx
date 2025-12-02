import React from 'react'
import {
    ChartBarIcon,
    TicketIcon,
    CurrencyDollarIcon,
    PencilSquareIcon,
    PlusIcon,
    ShareIcon,
    ArrowDownTrayIcon,
    BellIcon,
    TrashIcon,
    TagIcon,
    CheckCircleIcon
} from "@heroicons/react/24/outline";
export default function Tickets() {
    return (
        <div className="space-y-6">
            {/* Ticket Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-blue-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Total Vendido</div>
                        <TicketIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-3xl font-black text-text">1,250</div>
                    <div className="text-xs text-blue-400 mt-1">62.5% do total</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-green-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Receita</div>
                        <CurrencyDollarIcon className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-3xl font-black text-text">R$ 125k</div>
                    <div className="text-xs text-green-400 mt-1">+18% esta semana</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-purple-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Ticket Médio</div>
                        <ChartBarIcon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-3xl font-black text-text">R$ 100</div>
                    <div className="text-xs text-text-muted mt-1">Por ingresso</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-yellow-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Disponíveis</div>
                        <CheckCircleIcon className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="text-3xl font-black text-text">750</div>
                    <div className="text-xs text-yellow-400 mt-1">37.5% restante</div>
                </div>
            </div>

            {/* Ticket Types Management */}
            <div className="border border-borderColor rounded p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <TicketIcon className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-bold text-text">Tipos de Ingressos</h3>
                    </div>
                    <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded font-semibold transition-colors flex items-center gap-2">
                        <PlusIcon className="w-4 h-4" />
                        Novo Tipo
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Early Bird Ticket */}
                    <div className="border border-borderColor rounded p-5 hover:border-primary/50 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-lg font-bold text-text">Early Bird</h4>
                                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">Ativo</span>
                                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-full">Promoção</span>
                                </div>
                                <p className="text-sm text-text-muted mb-3">Ingresso promocional para os primeiros compradores</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <div className="text-text-muted">Preço</div>
                                        <div className="font-bold text-text">R$ 60,00</div>
                                    </div>
                                    <div>
                                        <div className="text-text-muted">Vendidos</div>
                                        <div className="font-bold text-text">150 / 200</div>
                                    </div>
                                    <div>
                                        <div className="text-text-muted">Receita</div>
                                        <div className="font-bold text-green-400">R$ 9.000</div>
                                    </div>
                                    <div>
                                        <div className="text-text-muted">Válido até</div>
                                        <div className="font-bold text-text">31/12/2024</div>
                                    </div>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-3">
                                    <div className="h-full bg-primary" style={{ width: '75%' }}></div>
                                </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                                <button className="p-2 border border-borderColor hover:bg-white/5 rounded transition-colors">
                                    <PencilSquareIcon className="w-4 h-4 text-text" />
                                </button>
                                <button className="p-2 border border-borderColor hover:bg-white/5 rounded transition-colors">
                                    <TrashIcon className="w-4 h-4 text-red-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Regular Ticket */}
                    <div className="border border-borderColor rounded p-5 hover:border-primary/50 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-lg font-bold text-text">Pista</h4>
                                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">Ativo</span>
                                </div>
                                <p className="text-sm text-text-muted mb-3">Ingresso padrão para área de pista</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <div className="text-text-muted">Preço</div>
                                        <div className="font-bold text-text">R$ 80,00</div>
                                    </div>
                                    <div>
                                        <div className="text-text-muted">Vendidos</div>
                                        <div className="font-bold text-text">800 / 1,200</div>
                                    </div>
                                    <div>
                                        <div className="text-text-muted">Receita</div>
                                        <div className="font-bold text-green-400">R$ 64.000</div>
                                    </div>
                                    <div>
                                        <div className="text-text-muted">Válido até</div>
                                        <div className="font-bold text-text">15/01/2025</div>
                                    </div>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-3">
                                    <div className="h-full bg-primary" style={{ width: '67%' }}></div>
                                </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                                <button className="p-2 border border-borderColor hover:bg-white/5 rounded transition-colors">
                                    <PencilSquareIcon className="w-4 h-4 text-text" />
                                </button>
                                <button className="p-2 border border-borderColor hover:bg-white/5 rounded transition-colors">
                                    <TrashIcon className="w-4 h-4 text-red-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* VIP Ticket */}
                    <div className="border border-borderColor rounded p-5 hover:border-primary/50 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-lg font-bold text-text">VIP</h4>
                                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">Ativo</span>
                                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-full">Premium</span>
                                </div>
                                <p className="text-sm text-text-muted mb-3">Acesso VIP com benefícios exclusivos</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <div className="text-text-muted">Preço</div>
                                        <div className="font-bold text-text">R$ 250,00</div>
                                    </div>
                                    <div>
                                        <div className="text-text-muted">Vendidos</div>
                                        <div className="font-bold text-text">280 / 500</div>
                                    </div>
                                    <div>
                                        <div className="text-text-muted">Receita</div>
                                        <div className="font-bold text-green-400">R$ 70.000</div>
                                    </div>
                                    <div>
                                        <div className="text-text-muted">Válido até</div>
                                        <div className="font-bold text-text">15/01/2025</div>
                                    </div>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-3">
                                    <div className="h-full bg-primary" style={{ width: '56%' }}></div>
                                </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                                <button className="p-2 border border-borderColor hover:bg-white/5 rounded transition-colors">
                                    <PencilSquareIcon className="w-4 h-4 text-text" />
                                </button>
                                <button className="p-2 border border-borderColor hover:bg-white/5 rounded transition-colors">
                                    <TrashIcon className="w-4 h-4 text-red-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Group Ticket */}
                    <div className="border border-borderColor rounded p-5 hover:border-primary/50 transition-all bg-slate-800/20">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-lg font-bold text-text">Lote Grupo (4 pessoas)</h4>
                                    <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full">Pausado</span>
                                </div>
                                <p className="text-sm text-text-muted mb-3">Pacote para grupos de 4 pessoas com desconto</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <div className="text-text-muted">Preço</div>
                                        <div className="font-bold text-text">R$ 280,00</div>
                                    </div>
                                    <div>
                                        <div className="text-text-muted">Vendidos</div>
                                        <div className="font-bold text-text">20 / 100</div>
                                    </div>
                                    <div>
                                        <div className="text-text-muted">Receita</div>
                                        <div className="font-bold text-green-400">R$ 5.600</div>
                                    </div>
                                    <div>
                                        <div className="text-text-muted">Válido até</div>
                                        <div className="font-bold text-text">10/01/2025</div>
                                    </div>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-3">
                                    <div className="h-full bg-yellow-500" style={{ width: '20%' }}></div>
                                </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                                <button className="p-2 border border-borderColor hover:bg-white/5 rounded transition-colors">
                                    <PencilSquareIcon className="w-4 h-4 text-text" />
                                </button>
                                <button className="p-2 border border-borderColor hover:bg-white/5 rounded transition-colors">
                                    <TrashIcon className="w-4 h-4 text-red-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Promotional Codes & Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Promotional Codes */}
                <div className="border border-borderColor rounded p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <TagIcon className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-bold text-text">Códigos Promocionais</h3>
                        </div>
                        <button className="px-3 py-1 bg-primary hover:bg-primary-dark text-white rounded text-sm font-semibold transition-colors">
                            <PlusIcon className="w-4 h-4 inline mr-1" />
                            Novo
                        </button>
                    </div>
                    <div className="space-y-3">
                        <div className="p-3 bg-white/5 rounded border border-borderColor">
                            <div className="flex items-center justify-between mb-2">
                                <div className="font-bold text-text">VERAO2025</div>
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded">Ativo</span>
                            </div>
                            <div className="text-sm text-text-muted mb-2">20% de desconto</div>
                            <div className="flex justify-between text-xs text-text-muted">
                                <span>Usado: 45 vezes</span>
                                <span>Expira: 31/12/2024</span>
                            </div>
                        </div>
                        <div className="p-3 bg-white/5 rounded border border-borderColor">
                            <div className="flex items-center justify-between mb-2">
                                <div className="font-bold text-text">PRIMEIRACOMPRA</div>
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded">Ativo</span>
                            </div>
                            <div className="text-sm text-text-muted mb-2">R$ 10 de desconto</div>
                            <div className="flex justify-between text-xs text-text-muted">
                                <span>Usado: 128 vezes</span>
                                <span>Sem expiração</span>
                            </div>
                        </div>
                        <div className="p-3 bg-white/5 rounded border border-red-500/30 opacity-60">
                            <div className="flex items-center justify-between mb-2">
                                <div className="font-bold text-text">BLACKFRIDAY</div>
                                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded">Expirado</span>
                            </div>
                            <div className="text-sm text-text-muted mb-2">50% de desconto</div>
                            <div className="flex justify-between text-xs text-text-muted">
                                <span>Usado: 312 vezes</span>
                                <span>Expirou: 30/11/2024</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="border border-borderColor rounded p-6">
                    <h3 className="text-lg font-bold text-text mb-4">Ações Rápidas</h3>
                    <div className="space-y-3">
                        <button className="w-full p-4 border border-borderColor rounded hover:bg-white/5 transition-all text-left group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <ArrowDownTrayIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-semibold text-text">Exportar Vendas</div>
                                    <div className="text-xs text-text-muted">Baixar relatório completo</div>
                                </div>
                            </div>
                        </button>
                        <button className="w-full p-4 border border-borderColor rounded hover:bg-white/5 transition-all text-left group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <TicketIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-semibold text-text">Lote em Massa</div>
                                    <div className="text-xs text-text-muted">Criar múltiplos tipos</div>
                                </div>
                            </div>
                        </button>
                        <button className="w-full p-4 border border-borderColor rounded hover:bg-white/5 transition-all text-left group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <ShareIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-semibold text-text">Compartilhar Link</div>
                                    <div className="text-xs text-text-muted">Gerar link de vendas</div>
                                </div>
                            </div>
                        </button>
                        <button className="w-full p-4 border border-borderColor rounded hover:bg-white/5 transition-all text-left group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <BellIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-semibold text-text">Alertas de Vendas</div>
                                    <div className="text-xs text-text-muted">Configurar notificações</div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Sales Timeline */}
            <div className="border border-borderColor rounded p-6">
                <h3 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                    <ChartBarIcon className="w-6 h-6 text-primary" />
                    Linha do Tempo de Vendas
                </h3>
                <div className="bg-slate-900/50 rounded p-6 border border-borderColor">
                    <div className="flex items-end justify-between h-48 gap-2">
                        {[45, 78, 92, 65, 88, 120, 95, 110, 85, 98, 125, 105].map((value, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full bg-primary/20 hover:bg-primary/40 rounded-t transition-all cursor-pointer relative group" style={{ height: `${(value / 125) * 100}%` }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-background border border-borderColor px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {value} vendas
                                    </div>
                                </div>
                                <div className="text-xs text-text-muted">{i + 1}</div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center text-xs text-text-muted mt-4">Últimos 12 dias</div>
                </div>
            </div>
        </div>
    )
}

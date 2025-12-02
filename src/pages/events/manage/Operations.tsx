import React, { useState } from 'react'
import {
    CurrencyDollarIcon,
    UserGroupIcon,
    ClipboardDocumentListIcon,
    CalendarDaysIcon,
    TruckIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    PhoneIcon,
    EnvelopeIcon,
    CheckCircleIcon,
    ClockIcon,
    BanknotesIcon,
    BuildingOfficeIcon,
    MusicalNoteIcon,
    CakeIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import Modal from "@/components/Modal";

export default function Operations() {
    const [expenseModalOpen, setExpenseModalOpen] = useState(false);
    const [supplierModalOpen, setSupplierModalOpen] = useState(false);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [teamModalOpen, setTeamModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            {/* Operations Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-red-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Despesas Totais</div>
                        <CurrencyDollarIcon className="w-5 h-5 text-red-400" />
                    </div>
                    <div className="text-3xl font-black text-text">R$ 45.800</div>
                    <div className="text-xs text-red-400 mt-1">R$ 12.300 pendentes</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-blue-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Fornecedores</div>
                        <TruckIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-3xl font-black text-text">12</div>
                    <div className="text-xs text-blue-400 mt-1">8 contratos ativos</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-purple-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Tarefas</div>
                        <ClipboardDocumentListIcon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-3xl font-black text-text">24</div>
                    <div className="text-xs text-purple-400 mt-1">18 concluídas, 6 pendentes</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-green-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Equipe</div>
                        <UsersIcon className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-3xl font-black text-text">8</div>
                    <div className="text-xs text-green-400 mt-1">Membros ativos</div>
                </div>
            </div>

            {/* Expenses Tracking */}
            <div className="border border-borderColor rounded p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <CurrencyDollarIcon className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-bold text-text">Gestão de Despesas</h3>
                    </div>
                    <button
                        onClick={() => setExpenseModalOpen(true)}
                        className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded font-semibold transition-colors flex items-center gap-2">
                        <PlusIcon className="w-4 h-4" />
                        Nova Despesa
                    </button>
                </div>

                {/* Expense Categories Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-white/5 rounded border border-borderColor">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <BuildingOfficeIcon className="w-5 h-5 text-blue-400" />
                                <span className="font-semibold text-text">Local</span>
                            </div>
                            <span className="font-bold text-text">R$ 15.000</span>
                        </div>
                        <div className="text-xs text-green-400">Pago</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded border border-borderColor">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <CakeIcon className="w-5 h-5 text-purple-400" />
                                <span className="font-semibold text-text">Catering</span>
                            </div>
                            <span className="font-bold text-text">R$ 12.500</span>
                        </div>
                        <div className="text-xs text-yellow-400">Pendente</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded border border-borderColor">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <MusicalNoteIcon className="w-5 h-5 text-green-400" />
                                <span className="font-semibold text-text">Som & Luz</span>
                            </div>
                            <span className="font-bold text-text">R$ 8.900</span>
                        </div>
                        <div className="text-xs text-green-400">Pago</div>
                    </div>
                </div>

                {/* Recent Expenses Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-borderColor bg-white/5">
                                <th className="px-4 py-3 text-sm font-bold text-muted">Descrição</th>
                                <th className="px-4 py-3 text-sm font-bold text-muted">Categoria</th>
                                <th className="px-4 py-3 text-sm font-bold text-muted">Valor</th>
                                <th className="px-4 py-3 text-sm font-bold text-muted">Vencimento</th>
                                <th className="px-4 py-3 text-sm font-bold text-muted">Status</th>
                                <th className="px-4 py-3 text-sm font-bold text-muted text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-borderColor">
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3 text-text font-medium">Aluguel do espaço</td>
                                <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded">Local</span></td>
                                <td className="px-4 py-3 text-text font-bold">R$ 15.000</td>
                                <td className="px-4 py-3 text-text-muted text-sm">05/12/2024</td>
                                <td className="px-4 py-3"><span className="flex items-center text-green-400 text-sm"><CheckCircleIcon className="w-4 h-4 mr-1" /> Pago</span></td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 hover:bg-white/10 rounded transition-colors"><PencilSquareIcon className="w-4 h-4 text-text" /></button>
                                        <button className="p-2 hover:bg-red-500/20 rounded transition-colors"><TrashIcon className="w-4 h-4 text-red-400" /></button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3 text-text font-medium">Buffet completo</td>
                                <td className="px-4 py-3"><span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded">Catering</span></td>
                                <td className="px-4 py-3 text-text font-bold">R$ 12.500</td>
                                <td className="px-4 py-3 text-text-muted text-sm">10/12/2024</td>
                                <td className="px-4 py-3"><span className="flex items-center text-yellow-400 text-sm"><ClockIcon className="w-4 h-4 mr-1" /> Pendente</span></td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 hover:bg-white/10 rounded transition-colors"><PencilSquareIcon className="w-4 h-4 text-text" /></button>
                                        <button className="p-2 hover:bg-red-500/20 rounded transition-colors"><TrashIcon className="w-4 h-4 text-red-400" /></button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3 text-text font-medium">Equipamento de som</td>
                                <td className="px-4 py-3"><span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded">Som & Luz</span></td>
                                <td className="px-4 py-3 text-text font-bold">R$ 8.900</td>
                                <td className="px-4 py-3 text-text-muted text-sm">08/12/2024</td>
                                <td className="px-4 py-3"><span className="flex items-center text-green-400 text-sm"><CheckCircleIcon className="w-4 h-4 mr-1" /> Pago</span></td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 hover:bg-white/10 rounded transition-colors"><PencilSquareIcon className="w-4 h-4 text-text" /></button>
                                        <button className="p-2 hover:bg-red-500/20 rounded transition-colors"><TrashIcon className="w-4 h-4 text-red-400" /></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Suppliers Management */}
            <div className="border border-borderColor rounded p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <TruckIcon className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-bold text-text">Fornecedores</h3>
                    </div>
                    <button
                        onClick={() => setSupplierModalOpen(true)}
                        className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded font-semibold transition-colors flex items-center gap-2">
                        <PlusIcon className="w-4 h-4" />
                        Novo Fornecedor
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Supplier Card 1 */}
                    <div className="p-5 border border-borderColor rounded hover:border-primary/50 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-lg font-bold text-text">Buffet Gourmet</h4>
                                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">Ativo</span>
                                </div>
                                <p className="text-sm text-text-muted mb-3">Catering & Alimentação</p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-text-muted">
                                        <UserGroupIcon className="w-4 h-4" />
                                        <span>Contato: Maria Silva</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-text-muted">
                                        <PhoneIcon className="w-4 h-4" />
                                        <span>(11) 98765-4321</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-text-muted">
                                        <EnvelopeIcon className="w-4 h-4" />
                                        <span>contato@buffetgourmet.com</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-400 font-semibold">
                                        <BanknotesIcon className="w-4 h-4" />
                                        <span>R$ 12.500</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                                <button className="p-2 border border-borderColor hover:bg-white/5 rounded transition-colors">
                                    <PhoneIcon className="w-4 h-4 text-green-400" />
                                </button>
                                <button className="p-2 border border-borderColor hover:bg-white/5 rounded transition-colors">
                                    <EnvelopeIcon className="w-4 h-4 text-blue-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Supplier Card 2 */}
                    <div className="p-5 border border-borderColor rounded hover:border-primary/50 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-lg font-bold text-text">SoundPro Áudio</h4>
                                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">Ativo</span>
                                </div>
                                <p className="text-sm text-text-muted mb-3">Som & Iluminação</p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-text-muted">
                                        <UserGroupIcon className="w-4 h-4" />
                                        <span>Contato: João Santos</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-text-muted">
                                        <PhoneIcon className="w-4 h-4" />
                                        <span>(11) 91234-5678</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-text-muted">
                                        <EnvelopeIcon className="w-4 h-4" />
                                        <span>contato@soundpro.com</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-400 font-semibold">
                                        <BanknotesIcon className="w-4 h-4" />
                                        <span>R$ 8.900</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                                <button className="p-2 border border-borderColor hover:bg-white/5 rounded transition-colors">
                                    <PhoneIcon className="w-4 h-4 text-green-400" />
                                </button>
                                <button className="p-2 border border-borderColor hover:bg-white/5 rounded transition-colors">
                                    <EnvelopeIcon className="w-4 h-4 text-blue-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Supplier Card 3 */}
                    <div className="p-5 border border-borderColor rounded hover:border-primary/50 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-lg font-bold text-text">Segurança Total</h4>
                                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-full">Pendente</span>
                                </div>
                                <p className="text-sm text-text-muted mb-3">Segurança & Portaria</p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-text-muted">
                                        <UserGroupIcon className="w-4 h-4" />
                                        <span>Contato: Carlos Mendes</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-text-muted">
                                        <PhoneIcon className="w-4 h-4" />
                                        <span>(11) 99876-5432</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-text-muted">
                                        <EnvelopeIcon className="w-4 h-4" />
                                        <span>contato@segurancatotal.com</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-400 font-semibold">
                                        <BanknotesIcon className="w-4 h-4" />
                                        <span>R$ 6.500</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                                <button className="p-2 border border-borderColor hover:bg-white/5 rounded transition-colors">
                                    <PhoneIcon className="w-4 h-4 text-green-400" />
                                </button>
                                <button className="p-2 border border-borderColor hover:bg-white/5 rounded transition-colors">
                                    <EnvelopeIcon className="w-4 h-4 text-blue-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Supplier Card 4 */}
                    <div className="p-5 border border-borderColor rounded hover:border-primary/50 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-lg font-bold text-text">Decor & Arte</h4>
                                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">Ativo</span>
                                </div>
                                <p className="text-sm text-text-muted mb-3">Decoração & Cenografia</p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-text-muted">
                                        <UserGroupIcon className="w-4 h-4" />
                                        <span>Contato: Ana Costa</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-text-muted">
                                        <PhoneIcon className="w-4 h-4" />
                                        <span>(11) 94567-8901</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-text-muted">
                                        <EnvelopeIcon className="w-4 h-4" />
                                        <span>contato@decorarte.com</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-400 font-semibold">
                                        <BanknotesIcon className="w-4 h-4" />
                                        <span>R$ 4.200</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                                <button className="p-2 border border-borderColor hover:bg-white/5 rounded transition-colors">
                                    <PhoneIcon className="w-4 h-4 text-green-400" />
                                </button>
                                <button className="p-2 border border-borderColor hover:bg-white/5 rounded transition-colors">
                                    <EnvelopeIcon className="w-4 h-4 text-blue-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Task Delegation */}
            <div className="border border-borderColor rounded p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <ClipboardDocumentListIcon className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-bold text-text">Delegação de Tarefas</h3>
                    </div>
                    <button
                        onClick={() => setTaskModalOpen(true)}
                        className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded font-semibold transition-colors flex items-center gap-2">
                        <PlusIcon className="w-4 h-4" />
                        Nova Tarefa
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Task Card 1 - High Priority */}
                    <div className="p-5 border-l-4 border-red-500 bg-white/5 rounded">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-lg font-bold text-text">Confirmar equipamentos de som</h4>
                                    <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full">Alta Prioridade</span>
                                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-full">Em Progresso</span>
                                </div>
                                <p className="text-sm text-text-muted mb-3">Verificar disponibilidade e testar todos os equipamentos antes do evento</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <div className="text-text-muted mb-1">Responsável</div>
                                        <div className="font-semibold text-text">Pedro Oliveira</div>
                                        <div className="text-text-muted">(11) 98888-7777</div>
                                        <div className="text-text-muted">pedro@email.com</div>
                                    </div>
                                    <div>
                                        <div className="text-text-muted mb-1">Prazo</div>
                                        <div className="font-semibold text-red-400">05/12/2024</div>
                                        <div className="text-text-muted mt-2">Categoria: Técnico</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Task Card 2 - Medium Priority */}
                    <div className="p-5 border-l-4 border-yellow-500 bg-white/5 rounded">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-lg font-bold text-text">Coordenar equipe de segurança</h4>
                                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-full">Média Prioridade</span>
                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full">Pendente</span>
                                </div>
                                <p className="text-sm text-text-muted mb-3">Briefing com equipe de segurança e definição de postos</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <div className="text-text-muted mb-1">Responsável</div>
                                        <div className="font-semibold text-text">Marcos Silva</div>
                                        <div className="text-text-muted">(11) 97777-6666</div>
                                        <div className="text-text-muted">marcos@email.com</div>
                                    </div>
                                    <div>
                                        <div className="text-text-muted mb-1">Prazo</div>
                                        <div className="font-semibold text-yellow-400">08/12/2024</div>
                                        <div className="text-text-muted mt-2">Categoria: Segurança</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Task Card 3 - Completed */}
                    <div className="p-5 border-l-4 border-green-500 bg-white/5 rounded opacity-75">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-lg font-bold text-text">Finalizar contrato com buffet</h4>
                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full">Baixa Prioridade</span>
                                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full flex items-center gap-1">
                                        <CheckCircleIcon className="w-3 h-3" /> Concluída
                                    </span>
                                </div>
                                <p className="text-sm text-text-muted mb-3">Assinar contrato e confirmar menu final</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <div className="text-text-muted mb-1">Responsável</div>
                                        <div className="font-semibold text-text">Juliana Costa</div>
                                        <div className="text-text-muted">(11) 96666-5555</div>
                                        <div className="text-text-muted">juliana@email.com</div>
                                    </div>
                                    <div>
                                        <div className="text-text-muted mb-1">Concluído em</div>
                                        <div className="font-semibold text-green-400">28/11/2024</div>
                                        <div className="text-text-muted mt-2">Categoria: Catering</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Timeline */}
            <div className="border border-borderColor rounded p-6">
                <div className="flex items-center gap-3 mb-6">
                    <CalendarDaysIcon className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold text-text">Cronograma do Evento</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                                <CheckCircleIcon className="w-5 h-5" />
                            </div>
                            <div className="w-0.5 h-full bg-borderColor"></div>
                        </div>
                        <div className="flex-1 pb-8">
                            <div className="font-bold text-text mb-1">Planejamento Inicial</div>
                            <div className="text-sm text-text-muted mb-2">01/11/2024 - Concluído</div>
                            <div className="text-sm text-text-muted">Definição de conceito, orçamento e fornecedores principais</div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                                <CheckCircleIcon className="w-5 h-5" />
                            </div>
                            <div className="w-0.5 h-full bg-borderColor"></div>
                        </div>
                        <div className="flex-1 pb-8">
                            <div className="font-bold text-text mb-1">Contratações</div>
                            <div className="text-sm text-text-muted mb-2">15/11/2024 - Concluído</div>
                            <div className="text-sm text-text-muted">Fechamento de contratos com fornecedores</div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center animate-pulse">
                                <ClockIcon className="w-5 h-5" />
                            </div>
                            <div className="w-0.5 h-full bg-borderColor"></div>
                        </div>
                        <div className="flex-1 pb-8">
                            <div className="font-bold text-text mb-1">Preparação Final</div>
                            <div className="text-sm text-yellow-400 mb-2">01/12/2024 - Em Andamento</div>
                            <div className="text-sm text-text-muted">Montagem, testes e ajustes finais</div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                <CalendarDaysIcon className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-text mb-1">Dia do Evento</div>
                            <div className="text-sm text-blue-400 mb-2">15/01/2025 - Agendado</div>
                            <div className="text-sm text-text-muted">Execução do evento</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Management */}
            <div className="border border-borderColor rounded p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <UsersIcon className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-bold text-text">Equipe do Evento</h3>
                    </div>
                    <button
                        onClick={() => setTeamModalOpen(true)}
                        className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded font-semibold transition-colors flex items-center gap-2">
                        <PlusIcon className="w-4 h-4" />
                        Adicionar Membro
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { name: "Pedro Oliveira", role: "Coordenador Técnico", phone: "(11) 98888-7777", email: "pedro@email.com" },
                        { name: "Marcos Silva", role: "Segurança", phone: "(11) 97777-6666", email: "marcos@email.com" },
                        { name: "Juliana Costa", role: "Catering", phone: "(11) 96666-5555", email: "juliana@email.com" },
                        { name: "Ana Santos", role: "Recepção", phone: "(11) 95555-4444", email: "ana@email.com" }
                    ].map((member, i) => (
                        <div key={i} className="p-4 border border-borderColor rounded hover:border-primary/50 transition-all">
                            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-3 text-xl font-bold">
                                {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="font-bold text-text mb-1">{member.name}</div>
                            <div className="text-sm text-primary mb-3">{member.role}</div>
                            <div className="space-y-1 text-xs text-text-muted">
                                <div className="flex items-center gap-1">
                                    <PhoneIcon className="w-3 h-3" />
                                    {member.phone}
                                </div>
                                <div className="flex items-center gap-1">
                                    <EnvelopeIcon className="w-3 h-3" />
                                    {member.email}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modals */}
            <Modal open={expenseModalOpen} onClose={() => setExpenseModalOpen(false)} title="Nova Despesa">
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Descrição</label>
                        <input type="text" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="Ex: Aluguel do espaço" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Categoria</label>
                            <select className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text">
                                <option>Local</option>
                                <option>Catering</option>
                                <option>Som & Luz</option>
                                <option>Marketing</option>
                                <option>Outros</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Valor (R$)</label>
                            <input type="number" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="0,00" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Vencimento</label>
                        <input type="date" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={() => setExpenseModalOpen(false)} className="px-6 py-3 border border-borderColor hover:bg-white/5 text-text rounded font-semibold transition-all">Cancelar</button>
                        <button type="submit" className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded font-semibold transition-all">Salvar</button>
                    </div>
                </form>
            </Modal>

            <Modal open={supplierModalOpen} onClose={() => setSupplierModalOpen(false)} title="Novo Fornecedor">
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Nome da Empresa</label>
                        <input type="text" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="Ex: Buffet Gourmet" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Categoria</label>
                        <select className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text">
                            <option>Catering</option>
                            <option>Som & Iluminação</option>
                            <option>Decoração</option>
                            <option>Segurança</option>
                            <option>Outros</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Pessoa de Contato</label>
                        <input type="text" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="Nome completo" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Telefone</label>
                            <input type="tel" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="(11) 98765-4321" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Email</label>
                            <input type="email" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="contato@empresa.com" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Valor do Contrato (R$)</label>
                        <input type="number" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="0,00" />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={() => setSupplierModalOpen(false)} className="px-6 py-3 border border-borderColor hover:bg-white/5 text-text rounded font-semibold transition-all">Cancelar</button>
                        <button type="submit" className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded font-semibold transition-all">Salvar</button>
                    </div>
                </form>
            </Modal>

            <Modal open={taskModalOpen} onClose={() => setTaskModalOpen(false)} title="Nova Tarefa">
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Título da Tarefa</label>
                        <input type="text" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="Ex: Confirmar equipamentos" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Descrição</label>
                        <textarea className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" rows={3} placeholder="Detalhes da tarefa..."></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Prioridade</label>
                            <select className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text">
                                <option>Alta</option>
                                <option>Média</option>
                                <option>Baixa</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Categoria</label>
                            <select className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text">
                                <option>Técnico</option>
                                <option>Catering</option>
                                <option>Segurança</option>
                                <option>Marketing</option>
                                <option>Outros</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Prazo</label>
                        <input type="date" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" />
                    </div>
                    <div className="border-t border-borderColor pt-4">
                        <h4 className="font-semibold text-text mb-3">Responsável</h4>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-muted mb-2">Nome Completo</label>
                                <input type="text" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="Nome do responsável" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-muted mb-2">Telefone</label>
                                    <input type="tel" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="(11) 98765-4321" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-muted mb-2">Email</label>
                                    <input type="email" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="email@exemplo.com" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={() => setTaskModalOpen(false)} className="px-6 py-3 border border-borderColor hover:bg-white/5 text-text rounded font-semibold transition-all">Cancelar</button>
                        <button type="submit" className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded font-semibold transition-all">Criar Tarefa</button>
                    </div>
                </form>
            </Modal>

            <Modal open={teamModalOpen} onClose={() => setTeamModalOpen(false)} title="Adicionar Membro da Equipe">
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Nome Completo</label>
                        <input type="text" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="Nome do membro" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Função</label>
                        <input type="text" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="Ex: Coordenador Técnico" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Telefone</label>
                            <input type="tel" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="(11) 98765-4321" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Email</label>
                            <input type="email" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="email@exemplo.com" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={() => setTeamModalOpen(false)} className="px-6 py-3 border border-borderColor hover:bg-white/5 text-text rounded font-semibold transition-all">Cancelar</button>
                        <button type="submit" className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded font-semibold transition-all">Adicionar</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

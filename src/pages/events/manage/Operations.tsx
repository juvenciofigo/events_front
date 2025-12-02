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
    XCircleIcon,
} from "@heroicons/react/24/outline";
import Modal from "@/components/Modal";
import { useParams } from "react-router-dom";
import { useExpenses } from "@/hooks/useExpenses";
import { useSuppliers } from "@/hooks/useSuppliers";
import { useTasks } from "@/hooks/useTasks";
import { useTeam } from "@/hooks/useTeam";
import { useToast } from "@/contexts/ToastContext";

export default function Operations() {
    const { id: eventId } = useParams<{ id: string }>();
    const { success, error: showError } = useToast();

    // Hooks
    const {
        expenses,
        summary: expenseSummary,
        createExpense,
        updateExpense,
        deleteExpense,
        payExpense
    } = useExpenses(eventId || "");

    const {
        data: suppliers,
        createSupplier,
        deleteSupplier
    } = useSuppliers(eventId || "");

    const {
        data: tasks,
        createTask,
        updateTask,
        deleteTask
    } = useTasks(eventId || "");

    const {
        data: team,
        addTeamMember,
        removeTeamMember
    } = useTeam(eventId || "");

    // Modal States
    const [expenseModalOpen, setExpenseModalOpen] = useState(false);
    const [supplierModalOpen, setSupplierModalOpen] = useState(false);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [teamModalOpen, setTeamModalOpen] = useState(false);

    // Form Handlers
    const handleCreateExpense = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            await createExpense.mutateAsync({
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                amount: Number(formData.get('amount')),
                dueDate: formData.get('dueDate') as string,
                status: 'pending'
            });
            setExpenseModalOpen(false);
            success("Despesa criada com sucesso!");
        } catch (error) {
            showError("Erro ao criar despesa.");
        }
    };

    const handleCreateSupplier = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            await createSupplier.mutateAsync({
                name: formData.get('name') as string,
                category: formData.get('category') as string,
                contactName: formData.get('contactName') as string,
                phone: formData.get('phone') as string,
                email: formData.get('email') as string,
                contractValue: Number(formData.get('contractValue')),
                status: 'active'
            });
            setSupplierModalOpen(false);
            success("Fornecedor adicionado com sucesso!");
        } catch (err) {
            showError("Erro ao adicionar fornecedor.");
        }
    };

    const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            await createTask.mutateAsync({
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                priority: formData.get('priority') as 'low' | 'medium' | 'high',
                category: formData.get('category') as string,
                dueDate: formData.get('dueDate') as string,
            });
            setTaskModalOpen(false);
            success("Tarefa criada com sucesso!");
        } catch (err) {
            showError("Erro ao criar tarefa.");
        }
    };

    const handleAddTeamMember = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            await addTeamMember.mutateAsync({
                name: formData.get('name') as string,
                role: formData.get('role') as string,
                phone: formData.get('phone') as string,
                email: formData.get('email') as string,
            });
            setTeamModalOpen(false);
            success("Membro adicionado com sucesso!");
        } catch (err) {
            showError("Erro ao adicionar membro.");
        }
    };

    const handlePayExpense = async (id: string) => {
        try {
            await payExpense.mutateAsync({ id, payment: { paymentDate: new Date().toISOString(), method: 'transfer' } });
            success("Despesa marcada como paga!");
        } catch (err) {
            showError("Erro ao pagar despesa.");
        }
    };

    const handleToggleTaskStatus = async (task: any) => {
        try {
            const newStatus = task.status === 'completed' ? 'pending' : 'completed';
            await updateTask.mutateAsync({ id: task.id, task: { status: newStatus } });
            success(`Tarefa marcada como ${newStatus === 'completed' ? 'concluída' : 'pendente'}`);
        } catch (err) {
            showError("Erro ao atualizar tarefa.");
        }
    };

    // Derived Stats
    const totalExpenses = expenseSummary?.total || 0;
    const pendingExpenses = expenseSummary?.pending || 0;
    const activeSuppliers = suppliers?.filter((s: any) => s.status === 'active').length || 0;
    const completedTasks = tasks?.filter((t: any) => t.status === 'completed').length || 0;
    const pendingTasksCount = tasks?.filter((t: any) => t.status !== 'completed').length || 0;

    const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    return (
        <div className="space-y-6">
            {/* Operations Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-red-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Despesas Totais</div>
                        <CurrencyDollarIcon className="w-5 h-5 text-red-400" />
                    </div>
                    <div className="text-3xl font-black text-text">{formatCurrency(totalExpenses)}</div>
                    <div className="text-xs text-red-400 mt-1">{formatCurrency(pendingExpenses)} pendentes</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-blue-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Fornecedores</div>
                        <TruckIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-3xl font-black text-text">{suppliers?.length || 0}</div>
                    <div className="text-xs text-blue-400 mt-1">{activeSuppliers} contratos ativos</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-purple-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Tarefas</div>
                        <ClipboardDocumentListIcon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-3xl font-black text-text">{tasks?.length || 0}</div>
                    <div className="text-xs text-purple-400 mt-1">{completedTasks} concluídas, {pendingTasksCount} pendentes</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-green-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Equipe</div>
                        <UsersIcon className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-3xl font-black text-text">{team?.length || 0}</div>
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
                            {expenses?.map((expense: any) => (
                                <tr key={expense.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-3 text-text font-medium">{expense.description}</td>
                                    <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded">{expense.category}</span></td>
                                    <td className="px-4 py-3 text-text font-bold">{formatCurrency(expense.amount)}</td>
                                    <td className="px-4 py-3 text-text-muted text-sm">{new Date(expense.dueDate).toLocaleDateString('pt-BR')}</td>
                                    <td className="px-4 py-3">
                                        {expense.status === 'paid' ? (
                                            <span className="flex items-center text-green-400 text-sm"><CheckCircleIcon className="w-4 h-4 mr-1" /> Pago</span>
                                        ) : (
                                            <span className="flex items-center text-yellow-400 text-sm"><ClockIcon className="w-4 h-4 mr-1" /> Pendente</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            {expense.status !== 'paid' && (
                                                <button onClick={() => handlePayExpense(expense.id)} className="p-2 hover:bg-green-500/20 rounded transition-colors" title="Marcar como pago">
                                                    <CheckCircleIcon className="w-4 h-4 text-green-400" />
                                                </button>
                                            )}
                                            <button onClick={() => deleteExpense.mutate(expense.id)} className="p-2 hover:bg-red-500/20 rounded transition-colors" title="Excluir">
                                                <TrashIcon className="w-4 h-4 text-red-400" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {(!expenses || expenses.length === 0) && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-text-muted">Nenhuma despesa registrada.</td>
                                </tr>
                            )}
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
                    {suppliers?.map((supplier: any) => (
                        <div key={supplier.id} className="p-5 border border-borderColor rounded hover:border-primary/50 transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="text-lg font-bold text-text">{supplier.name}</h4>
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${supplier.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                            {supplier.status === 'active' ? 'Ativo' : 'Pendente'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-text-muted mb-3">{supplier.category}</p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2 text-text-muted">
                                            <UserGroupIcon className="w-4 h-4" />
                                            <span>Contato: {supplier.contactName}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-text-muted">
                                            <PhoneIcon className="w-4 h-4" />
                                            <span>{supplier.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-text-muted">
                                            <EnvelopeIcon className="w-4 h-4" />
                                            <span>{supplier.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-green-400 font-semibold">
                                            <BanknotesIcon className="w-4 h-4" />
                                            <span>{formatCurrency(supplier.contractValue)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button onClick={() => deleteSupplier.mutate(supplier.id)} className="p-2 border border-borderColor hover:bg-red-500/20 rounded transition-colors">
                                        <TrashIcon className="w-4 h-4 text-red-400" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {(!suppliers || suppliers.length === 0) && (
                        <div className="col-span-2 text-center text-text-muted py-8">Nenhum fornecedor cadastrado.</div>
                    )}
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
                    {tasks?.map((task: any) => (
                        <div key={task.id} className={`p-5 border-l-4 ${task.priority === 'high' ? 'border-red-500' :
                            task.priority === 'medium' ? 'border-yellow-500' : 'border-blue-500'
                            } bg-white/5 rounded ${task.status === 'completed' ? 'opacity-75' : ''}`}>
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className={`text-lg font-bold text-text ${task.status === 'completed' ? 'line-through' : ''}`}>{task.title}</h4>
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                            task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                                            }`}>
                                            {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'} Prioridade
                                        </span>
                                        <button
                                            onClick={() => handleToggleTaskStatus(task)}
                                            className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 cursor-pointer hover:opacity-80 ${task.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                            {task.status === 'completed' ? <CheckCircleIcon className="w-3 h-3" /> : <ClockIcon className="w-3 h-3" />}
                                            {task.status === 'completed' ? 'Concluída' : 'Em Progresso'}
                                        </button>
                                    </div>
                                    <p className="text-sm text-text-muted mb-3">{task.description}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <div className="text-text-muted mb-1">Responsável</div>
                                            <div className="font-semibold text-text">{task.assignedToName || "Não atribuído"}</div>
                                        </div>
                                        <div>
                                            <div className="text-text-muted mb-1">Prazo</div>
                                            <div className="font-semibold text-text">{new Date(task.dueDate).toLocaleDateString('pt-BR')}</div>
                                            <div className="text-text-muted mt-2">Categoria: {task.category}</div>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => deleteTask.mutate(task.id)} className="p-2 hover:bg-red-500/20 rounded transition-colors">
                                    <TrashIcon className="w-4 h-4 text-red-400" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {(!tasks || tasks.length === 0) && (
                        <div className="text-center text-text-muted py-8">Nenhuma tarefa registrada.</div>
                    )}
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
                    {team?.map((member) => (
                        <div key={member.id} className="p-4 border border-borderColor rounded hover:border-primary/50 transition-all relative group">
                            <button
                                onClick={() => removeTeamMember.mutate(member.id)}
                                className="absolute top-2 right-2 p-1 hover:bg-red-500/20 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                <XCircleIcon className="w-5 h-5 text-red-400" />
                            </button>
                            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-3 text-xl font-bold">
                                {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
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
                    {(!team || team.length === 0) && (
                        <div className="col-span-4 text-center text-text-muted py-8">Nenhum membro na equipe.</div>
                    )}
                </div>
            </div>

            {/* Modals */}
            <Modal open={expenseModalOpen} onClose={() => setExpenseModalOpen(false)} title="Nova Despesa">
                <form onSubmit={handleCreateExpense} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Descrição</label>
                        <input name="description" required type="text" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="Ex: Aluguel do espaço" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Categoria</label>
                            <select name="category" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text">
                                <option value="Local">Local</option>
                                <option value="Catering">Catering</option>
                                <option value="Som & Luz">Som & Luz</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Valor (R$)</label>
                            <input name="amount" required type="number" step="0.01" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="0,00" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Vencimento</label>
                        <input name="dueDate" required type="date" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={() => setExpenseModalOpen(false)} className="px-6 py-3 border border-borderColor hover:bg-white/5 text-text rounded font-semibold transition-all">Cancelar</button>
                        <button type="submit" className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded font-semibold transition-all">Salvar</button>
                    </div>
                </form>
            </Modal>

            <Modal open={supplierModalOpen} onClose={() => setSupplierModalOpen(false)} title="Novo Fornecedor">
                <form onSubmit={handleCreateSupplier} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Nome da Empresa</label>
                        <input name="name" required type="text" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="Ex: Buffet Gourmet" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Categoria</label>
                        <select name="category" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text">
                            <option value="Catering">Catering</option>
                            <option value="Som & Iluminação">Som & Iluminação</option>
                            <option value="Decoração">Decoração</option>
                            <option value="Segurança">Segurança</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Pessoa de Contato</label>
                        <input name="contactName" required type="text" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="Nome completo" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Telefone</label>
                            <input name="phone" required type="tel" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="(11) 98765-4321" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Email</label>
                            <input name="email" required type="email" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="contato@empresa.com" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Valor do Contrato (R$)</label>
                        <input name="contractValue" required type="number" step="0.01" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="0,00" />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={() => setSupplierModalOpen(false)} className="px-6 py-3 border border-borderColor hover:bg-white/5 text-text rounded font-semibold transition-all">Cancelar</button>
                        <button type="submit" className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded font-semibold transition-all">Salvar</button>
                    </div>
                </form>
            </Modal>

            <Modal open={taskModalOpen} onClose={() => setTaskModalOpen(false)} title="Nova Tarefa">
                <form onSubmit={handleCreateTask} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Título da Tarefa</label>
                        <input name="title" required type="text" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="Ex: Confirmar equipamentos" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Descrição</label>
                        <textarea name="description" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" rows={3} placeholder="Detalhes da tarefa..."></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Prioridade</label>
                            <select name="priority" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text">
                                <option value="high">Alta</option>
                                <option value="medium">Média</option>
                                <option value="low">Baixa</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Categoria</label>
                            <select name="category" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text">
                                <option value="Técnico">Técnico</option>
                                <option value="Catering">Catering</option>
                                <option value="Segurança">Segurança</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Prazo</label>
                        <input name="dueDate" required type="date" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={() => setTaskModalOpen(false)} className="px-6 py-3 border border-borderColor hover:bg-white/5 text-text rounded font-semibold transition-all">Cancelar</button>
                        <button type="submit" className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded font-semibold transition-all">Criar Tarefa</button>
                    </div>
                </form>
            </Modal>

            <Modal open={teamModalOpen} onClose={() => setTeamModalOpen(false)} title="Adicionar Membro da Equipe">
                <form onSubmit={handleAddTeamMember} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Nome Completo</label>
                        <input name="name" required type="text" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="Nome do membro" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Função</label>
                        <input name="role" required type="text" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="Ex: Coordenador Técnico" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Telefone</label>
                            <input name="phone" required type="tel" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="(11) 98765-4321" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Email</label>
                            <input name="email" required type="email" className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text" placeholder="email@exemplo.com" />
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

import React, { useState } from 'react'
import {
    CheckCircleIcon,
    ClipboardDocumentListIcon,
    ClockIcon,
    CurrencyDollarIcon,
    PlusIcon,
    TrashIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";
import Modal from "@/components/Modal";
import { useParams } from "react-router-dom";
import { } from "@/hooks/useExpenses";
import { useSuppliers } from "@/hooks/useSuppliers";
import { getTasks } from "@/hooks/useTasks";
import { useTeam } from "@/hooks/useTeam";
import { useToast } from "@/contexts/ToastContext";
import { StatisticsCards } from "@/components/StatisticsCards";
import CreateExpenseForm from "./components/CreateExpense";
import CreateSupplierForm from "./components/CreateSupplierForm";
import CreateTaskForm from "./components/CreateTaskForm";
import CreateTeamMemberForm from "./components/CreateTeamMemberForm";
import { SupplierCreateForm, TaskCreateForm, TeamMemberCreateForm } from "@/schemas/validation";
import Button from '@/components/Form/Button';
import { getExpenses, getExpensesSummary } from "@/hooks/useExpenses";
import Loading from '@/components/Loading';
import TableExpense from './components/TableExpense';
import { formatCurrency } from '@/utils';
import TableTasks from './components/ShowTasks';

export default function Operations({ eventId }: { eventId: string }) {

    // const { success, error: showError } = useToast();

    const { data: expenses, isLoading: expensesLoading, error: expensesError } = getExpenses(eventId);

    const { data: expensesSummary, isLoading: expensesSummaryLoading, error: expensesSummaryError } = getExpensesSummary(eventId)

    const { data: tasks, isLoading: tasksLoading, error: tasksError } = getTasks(eventId);

    // const { data: suppliers, createSupplier, deleteSupplier } = useSuppliers(eventId);

    // const { data: team, addTeamMember, removeTeamMember } = useTeam(eventId);

    // Modal States
    const [expenseModalOpen, setExpenseModalOpen] = useState(false);
    const [supplierModalOpen, setSupplierModalOpen] = useState(false);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [teamModalOpen, setTeamModalOpen] = useState(false);



    // const handleCreateSupplier = async (data: SupplierCreateForm) => {
    //     await createSupplier.mutateAsync({
    //         ...data,
    //         phone: data.phone || "",
    //         status: 'active'
    //     });
    //     setSupplierModalOpen(false);
    // };

    // const handleCreateTask = async (data: TaskCreateForm) => {
    // await createTask.mutateAsync({
    //     ...data,
    //     // Ensure priority is correctly typed for the backend if needed,
    //     // though zod schema should match what API expects
    //     priority: data.priority as 'low' | 'medium' | 'high'
    // });
    //     setTaskModalOpen(false);
    // };

    // const handleAddTeamMember = async (data: TeamMemberCreateForm) => {
    //     await addTeamMember.mutateAsync({
    //         ...data,
    //         phone: data.phone || ""
    //     });
    //     setTeamModalOpen(false);
    // };

    // const handleToggleTaskStatus = async (task: any) => {
    //     try {
    //         const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    //         await updateTask.mutateAsync({ id: task.id, task: { status: newStatus } });
    //         success(`Tarefa marcada como ${newStatus === 'completed' ? 'concluída' : 'pendente'}`);
    //     } catch (err) {
    //         showError("Erro ao atualizar tarefa.");
    //     }
    // };

    // Derived Stats
    // const activeSuppliers = suppliers?.filter((s: any) => s.status === 'active').length || 0;
    // const completedTasks = tasks?.filter((t: any) => t.status === 'completed').length || 0;
    // const pendingTasksCount = tasks?.filter((t: any) => t.status !== 'completed').length || 0;



    return (
        <div className="space-y-6">
            {/* Operations Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatisticsCards
                    title="Despesas Totais"
                    data={expensesSummary?.totalExpenses || 0}
                    color="red-500/5"
                    description={<div className="text-xs text-red-400 mt-1">{expensesSummary?.pendingExpenses || 0} pendentes</div>}
                />
                {/* <StatisticsCards
                    title="Fornecedores"
                    icon={<TruckIcon className="w-5 h-5 text-blue-400" />}
                    data={suppliers?.length || 0}
                    color="blue-500/5"
                    description={<div className="text-xs text-blue-400 mt-1">{activeSuppliers} contratos ativos</div>}
                />
                <StatisticsCards
                    title="Tarefas"
                    icon={<ClipboardDocumentListIcon className="w-5 h-5 text-purple-400" />}
                    data={tasks?.length || 0}
                    color="purple-500/5"
                    description={<div className="text-xs text-purple-400 mt-1">{completedTasks} concluídas, {pendingTasksCount} pendentes</div>}
                />
                <StatisticsCards
                    title="Equipe"
                    icon={<UsersIcon className="w-5 h-5 text-green-400" />}
                    data={team?.length || 0}
                    color="green-500/5"
                    description={<div className="text-xs text-green-400 mt-1">Membros ativos</div>}
                /> */}
            </div>

            {/* Expenses Tracking */}
            <div className="border-t border-borderColor pt-3">
                {
                    <SectionHeader
                        icon={<CurrencyDollarIcon className="w-4 h-4 text-primary" />}
                        title="Gestão de Despesas"
                        onAddClick={() => setExpenseModalOpen(true)}
                        labelButton="Nova Despesa"
                    />
                }

                {/* Recent Expenses Table */}
                {expensesLoading ? (
                    <Loading />
                ) : (
                    (expenses && expenses.items.length > 0) ? (
                        <TableExpense expenses={expenses} eventId={eventId} />
                    ) : (
                        <div className="px-4 py-8 text-center text-text-muted">Nenhuma despesa registrada.</div>
                    )
                )}
            </div>


            {/* Tasks */}
            <div className="border-t border-borderColor pt-3">
                {
                    <SectionHeader
                        icon={<ClipboardDocumentListIcon className="w-6 h-6 text-primary" />}
                        title="Tarefas"
                        onAddClick={() => setTaskModalOpen(true)}
                        labelButton="Nova Tarefa"
                    />
                }

                {tasksLoading ? (
                    <Loading />
                ) : (
                    (tasks && tasks.items.length > 0) ? (
                        <TableTasks tasks={tasks} eventId={eventId} />
                    ) : (
                        <div className="px-4 py-8 text-center text-text-muted">Nenhuma tarefa registrada.</div>
                    )
                )}
            </div>

            {/* Suppliers Management */}
            {/* <div className="border-t border-borderColor pt-3">
                {
                    <SectionHeader
                        icon={<PlusIcon className="w-4 h-4" />}
                        title="Fornecedores"
                        onAddClick={() => setSupplierModalOpen(true)}
                        labelButton="Novo Fornecedor"
                    />
                }

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
            </div> */}



            {/* Team Management */}
            {/* <div className="border-t border-borderColor pt-3">
                {
                    <SectionHeader
                        labelButton="Adicionar Membro"
                        icon={<UsersIcon className="w-6 h-6 text-primary" />}
                        title="Equipe do Evento"
                        onAddClick={() => setTeamModalOpen(true)}
                    />
                }

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
            </div> */}

            {/* Modals */}
            <Modal open={expenseModalOpen} onClose={() => setExpenseModalOpen(false)} title="Nova Despesa">
                <CreateExpenseForm
                    eventId={eventId}
                    onCancel={() => setExpenseModalOpen(false)}
                />
            </Modal>

            {/* <Modal open={supplierModalOpen} onClose={() => setSupplierModalOpen(false)} title="Novo Fornecedor">
                <CreateSupplierForm
                    onSubmit={handleCreateSupplier}
                    onCancel={() => setSupplierModalOpen(false)}
                />
            </Modal>

            <Modal open={taskModalOpen} onClose={() => setTaskModalOpen(false)} title="Nova Tarefa">
                <CreateTaskForm
                    onSubmit={handleCreateTask}
                    onCancel={() => setTaskModalOpen(false)}
                />
            </Modal>

            <Modal open={teamModalOpen} onClose={() => setTeamModalOpen(false)} title="Adicionar Membro da Equipe">
                <CreateTeamMemberForm

                    onSubmit={handleAddTeamMember}
                    onCancel={() => setTeamModalOpen(false)}
                />
            </Modal> */}
        </div>
    )
}


interface SectionHeaderProps {
    title: string;
    icon: React.ReactNode;
    onAddClick: () => void;
    labelButton: string;
}

function SectionHeader({ title, onAddClick, labelButton, icon }: SectionHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
                {icon}
                <h3 className="text-lg font-bold text-text">{title}</h3>
            </div>
            <Button
                size='sm'
                label={labelButton}
                onClick={onAddClick}>
                <PlusIcon className="w-4 h-4" />
            </Button>
        </div>
    )
}
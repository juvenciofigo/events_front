import { useToast } from '@/contexts/ToastContext';
import { deleteExpense, updateExpense } from '@/hooks/useExpenses';
import { ProgressStatus, Priority } from "@/types/system";
import { Expense, PageExpense } from '@/types/expense';
import { PaymentStatus } from '@/types/system';
import { formatCurrency } from '@/utils';
import { CheckCircleIcon, ClockIcon, TrashIcon, XCircleIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'

interface TableExpenseProps {
    expenses: PageExpense;
    eventId: string;
}
export default function TableExpense({ expenses, eventId }: TableExpenseProps) {
    const deleteExpenseMutation = deleteExpense(eventId);
    const updateExpenseMutation = updateExpense(eventId);
    const [editingCell, setEditingCell] = useState<{ expenseId: string; field: string } | null>(null);
    const [editValue, setEditValue] = useState<string>('');

    const { success, error: showError } = useToast();


    // Toggle payment status: PENDING ↔ PAID
    const handleTogglePaymentStatus = (expense: Expense) => {
        const newPaymentStatus = expense.paymentStatus === PaymentStatus.PENDING
            ? PaymentStatus.PAID
            : PaymentStatus.PENDING;

        updateExpenseMutation.mutate(
            {
                id: expense.id,
                expense: {
                    ...expense,
                    priority: expense.priority as Priority,
                    paymentStatus: newPaymentStatus
                }
            },
            {
                onSuccess: () => {
                    success('Status de pagamento atualizado!');
                },
                onError: (error: any) => {
                    showError(error?.response?.data?.message || "Erro ao atualizar status de pagamento.");
                }
            }
        );
    };

    // delete

    const handleDeleteExpense = (expense: Expense) => {
        deleteExpenseMutation.mutate(expense.id, {
            onSuccess: () => {
                success('Despesa excluída com sucesso!');
            },
            onError: (error: any) => {
                error(error?.response?.data?.message || "Erro ao criar despesa.");
            }
        })
    };

    // Toggle expense status: PENDING → IN_PROGRESS → DONE → PENDING
    const handleToggleExpenseStatus = (expense: Expense) => {
        let newStatus: ProgressStatus;

        if (expense.status === ProgressStatus.PENDING) {
            newStatus = ProgressStatus.IN_PROGRESS;
        } else if (expense.status === ProgressStatus.IN_PROGRESS) {
            newStatus = ProgressStatus.DONE;
        } else {
            newStatus = ProgressStatus.PENDING;
        }

        updateExpenseMutation.mutate(
            {
                id: expense.id,
                expense: {
                    ...expense,
                    priority: expense.priority as Priority,
                    status: newStatus
                }
            },
            {
                onSuccess: () => {
                    success('Status da despesa atualizado!');
                },
                onError: (error: any) => {
                    showError(error?.response?.data?.message || "Erro ao atualizar status da despesa.");
                }
            }
        );
    };

    // Handle field update for inline editing
    const handleFieldUpdate = (expense: Expense, field: string, value: string) => {
        // Prepare the updated expense data
        let updatedData: any = {
            ...expense,
            priority: expense.priority as Priority,
        };

        // Update the specific field with appropriate type conversion
        switch (field) {
            case 'description':
                updatedData.description = value;
                break;
            case 'category':
                updatedData.category = value;
                break;
            case 'amount':
                const numValue = parseFloat(value);
                if (isNaN(numValue) || numValue < 0) {
                    showError('Valor inválido');
                    return;
                }
                updatedData.amount = numValue;
                break;
            case 'dueDate':
                // Convert to LocalDateTime format (no timezone) for Spring Boot
                const dateValue = new Date(value);
                // Remove timezone and milliseconds: 2025-10-25T12:30:00.000Z -> 2025-10-25T12:30:00
                updatedData.dueDate = dateValue.toISOString().slice(0, 19);
                break;
        }

        updateExpenseMutation.mutate(
            {
                id: expense.id,
                expense: updatedData
            },
            {
                onSuccess: () => {
                    success('Campo atualizado com sucesso!');
                    setEditingCell(null);
                },
                onError: (error: any) => {
                    showError(error?.response?.data?.message || "Erro ao atualizar campo.");
                }
            }
        );
    };


    return (
        <div className="overflow-x-auto">
            <table className="w-full text-center text-xs">
                <thead>
                    <tr className="border-b border-borderColor bg-surface-hover">
                        <th className="p-2 text-sm font-bold text-muted border-r border-borderColor">Descrição</th>
                        <th className="p-2 text-sm font-bold text-muted border-r border-borderColor">Categoria</th>
                        <th className="p-2 text-sm font-bold text-muted border-r border-borderColor">Valor</th>
                        <th className="p-2 text-sm font-bold text-muted border-r border-borderColor">Vencimento</th>
                        <th className="p-2 text-sm font-bold text-muted border-r border-borderColor">Status de Pagamento</th>
                        <th className="p-2 text-sm font-bold text-muted border-r border-borderColor">Status da Despesa</th>
                        <th className="p-2 text-sm font-bold text-muted border-r border-borderColor w-0">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-borderColor">
                    {expenses?.items.map((expense: Expense) => (
                        <tr key={expense.id} className="hover:bg-white/5 transition-colors">
                            <td
                                className="border-r border-borderColor cursor-pointer hover:bg-white/10 transition-colors p-2"
                                onClick={() => {
                                    setEditingCell({ expenseId: expense.id, field: 'description' });
                                    setEditValue(expense.description);
                                }}
                            >
                                {editingCell?.expenseId === expense.id && editingCell?.field === 'description' ? (
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={() => {
                                            if (editValue !== expense.description) {
                                                handleFieldUpdate(expense, 'description', editValue);
                                            } else {
                                                setEditingCell(null);
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                if (editValue !== expense.description) {
                                                    handleFieldUpdate(expense, 'description', editValue);
                                                } else {
                                                    setEditingCell(null);
                                                }
                                            } else if (e.key === 'Escape') {
                                                setEditingCell(null);
                                            }
                                        }}
                                        autoFocus
                                        className="w-full bg-surface border border-primary rounded px-2 py-1 text-text focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                ) : (
                                    expense.description
                                )}
                            </td>
                            <td
                                className="border-r border-borderColor cursor-pointer hover:bg-white/10 transition-colors p-2"
                                onClick={() => {
                                    setEditingCell({ expenseId: expense.id, field: 'category' });
                                    setEditValue(expense.category);
                                }}
                            >
                                {editingCell?.expenseId === expense.id && editingCell?.field === 'category' ? (
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={() => {
                                            if (editValue !== expense.category) {
                                                handleFieldUpdate(expense, 'category', editValue);
                                            } else {
                                                setEditingCell(null);
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                if (editValue !== expense.category) {
                                                    handleFieldUpdate(expense, 'category', editValue);
                                                } else {
                                                    setEditingCell(null);
                                                }
                                            } else if (e.key === 'Escape') {
                                                setEditingCell(null);
                                            }
                                        }}
                                        autoFocus
                                        className="w-full bg-surface border border-primary rounded px-2 py-1 text-text focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                ) : (
                                    <span className="p-1 bg-blue-500/20 text-blue-400 font-semibold rounded">{expense.category}</span>
                                )}
                            </td>
                            <td
                                className="border-r border-borderColor cursor-pointer hover:bg-white/10 transition-colors p-2"
                                onClick={() => {
                                    setEditingCell({ expenseId: expense.id, field: 'amount' });
                                    setEditValue(expense.amount.toString());
                                }}
                            >
                                {editingCell?.expenseId === expense.id && editingCell?.field === 'amount' ? (
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={() => {
                                            if (editValue !== expense.amount.toString()) {
                                                handleFieldUpdate(expense, 'amount', editValue);
                                            } else {
                                                setEditingCell(null);
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                if (editValue !== expense.amount.toString()) {
                                                    handleFieldUpdate(expense, 'amount', editValue);
                                                } else {
                                                    setEditingCell(null);
                                                }
                                            } else if (e.key === 'Escape') {
                                                setEditingCell(null);
                                            }
                                        }}
                                        autoFocus
                                        className="w-full bg-surface border border-primary rounded px-2 py-1 text-text focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                ) : (
                                    formatCurrency(expense.amount)
                                )}
                            </td>
                            <td
                                className="border-r border-borderColor cursor-pointer hover:bg-white/10 transition-colors p-2"
                                onClick={() => {
                                    setEditingCell({ expenseId: expense.id, field: 'dueDate' });
                                    // Convert to YYYY-MM-DD format for input
                                    const date = new Date(expense.dueDate);
                                    const formattedDate = date.toISOString().split('T')[0];
                                    setEditValue(formattedDate);
                                }}
                            >
                                {editingCell?.expenseId === expense.id && editingCell?.field === 'dueDate' ? (
                                    <input
                                        type="date"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={() => {
                                            const originalDate = new Date(expense.dueDate).toISOString().split('T')[0];
                                            if (editValue !== originalDate) {
                                                handleFieldUpdate(expense, 'dueDate', editValue);
                                            } else {
                                                setEditingCell(null);
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                const originalDate = new Date(expense.dueDate).toISOString().split('T')[0];
                                                if (editValue !== originalDate) {
                                                    handleFieldUpdate(expense, 'dueDate', editValue);
                                                } else {
                                                    setEditingCell(null);
                                                }
                                            } else if (e.key === 'Escape') {
                                                setEditingCell(null);
                                            }
                                        }}
                                        autoFocus
                                        className="w-full bg-surface border border-primary rounded px-2 py-1 text-text focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                ) : (
                                    new Date(expense.dueDate).toLocaleDateString('pt-BR')
                                )}
                            </td>
                            <td
                                className="border-r text-center border-borderColor cursor-pointer hover:bg-white/10 transition-colors"
                                onClick={() => handleTogglePaymentStatus(expense)}
                                title="Clique para alterar o status de pagamento"
                            >
                                {expense.paymentStatus ? (

                                    expense.paymentStatus === PaymentStatus.PAID.toString() ? (
                                        <span className="flex justify-center items-center text-green-400"><CheckCircleIcon className="w-4 h-4 mr-1" /> Pago</span>
                                    ) : expense.paymentStatus === PaymentStatus.PENDING.toString() ? (
                                        <span className="flex justify-center items-center text-yellow-400"><ClockIcon className="w-4 h-4 mr-1" /> Pendente</span>
                                    ) : (
                                        <span className="flex justify-center items-center text-red-400"><XCircleIcon className="w-4 h-4 mr-1" /> Não pago</span>
                                    )
                                ) : (
                                    <span className="flex justify-center items-center text-red-400"><XCircleIcon className="w-4 h-4 mr-1" /> Não pago</span>
                                )}
                            </td>
                            <td
                                className="border-r text-center border-borderColor cursor-pointer hover:bg-white/10 transition-colors"
                                onClick={() => handleToggleExpenseStatus(expense)}
                                title="Clique para alterar o status da despesa"
                            >
                                {expense.status && (
                                    expense.status === ProgressStatus.PENDING ? (
                                        <span className="flex justify-center items-center text-yellow-400">
                                            <ClockIcon className="w-4 h-4 mr-1" />
                                            Pendente
                                        </span>
                                    ) : expense.status === ProgressStatus.IN_PROGRESS ? (
                                        <span className="flex justify-center items-center text-blue-400">
                                            <ClockIcon className="w-4 h-4 mr-1" />
                                            Em andamento
                                        </span>
                                    ) : expense.status === ProgressStatus.DONE ? (
                                        <span className="flex justify-center items-center text-green-400">
                                            <CheckCircleIcon className="w-4 h-4 mr-1" />
                                            Finalizado
                                        </span>
                                    ) : (
                                        <span className="flex justify-center items-center text-red-400">
                                            <XCircleIcon className="w-4 h-4 mr-1" />
                                            -
                                        </span>
                                    )
                                )}

                            </td>
                            <td className="border-r border-borderColor">
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() =>
                                            handleDeleteExpense(expense)
                                        }
                                        className="p-2 hover:bg-red-500/20 rounded transition-colors"
                                        title="Excluir"
                                    >
                                        <TrashIcon className="w-4 h-4 text-red-400" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

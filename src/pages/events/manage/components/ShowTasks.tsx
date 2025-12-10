import { Priority, ProgressStatus } from '@/types/system';
import { PageTask, Task } from '@/types/tasks';
import { CheckCircleIcon, ClockIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { updateTask, deleteTask } from '@/hooks/useTasks';
import { useToast } from '@/contexts/ToastContext';

interface ShowTasksProps {
    tasks: PageTask;
    eventId: string;
}

export default function ShowTasks({ tasks, eventId }: ShowTasksProps) {
    const updateTaskMutation = updateTask(eventId);
    const deleteTaskMutation = deleteTask(eventId);
    const [editingCell, setEditingCell] = useState<{ taskId: string; field: string } | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    const { success, error: showError } = useToast();

    // Toggle task status: PENDING → IN_PROGRESS → DONE → PENDING
    const handleToggleTaskStatus = (task: Task) => {
        let newStatus: ProgressStatus;

        if (task.taskStatus === ProgressStatus.PENDING) {
            newStatus = ProgressStatus.IN_PROGRESS;
        } else if (task.taskStatus === ProgressStatus.IN_PROGRESS) {
            newStatus = ProgressStatus.DONE;
        } else {
            newStatus = ProgressStatus.PENDING;
        }

        updateTaskMutation.mutate(
            {
                id: task.id,
                task: {
                    ...task,
                    priority: task.priority as Priority,
                    taskStatus: newStatus
                }
            },
            {
                onSuccess: () => success('Status da tarefa atualizado!'),
                onError: (error: any) =>
                    showError(error?.response?.data?.message || "Erro ao atualizar status da tarefa.")
            }
        );
    };

    // Toggle priority: LOW → MEDIUM → HIGH → LOW
    const handleTogglePriority = (task: Task) => {
        let newPriority: Priority;

        if (task.priority === Priority.LOW) newPriority = Priority.MEDIUM;
        else if (task.priority === Priority.MEDIUM) newPriority = Priority.HIGH;
        else newPriority = Priority.LOW;

        updateTaskMutation.mutate(
            {
                id: task.id,
                task: { ...task, priority: newPriority }
            },
            {
                onSuccess: () => success('Prioridade atualizada!'),
                onError: (error: any) =>
                    showError(error?.response?.data?.message || "Erro ao atualizar prioridade.")
            }
        );
    };

    // Handle field update for inline editing (CORRIGIDO)
    const handleFieldUpdate = (task: Task, field: string, value: string) => {
        let updatedData: any = {
            ...task,
            priority: task.priority as Priority,
        };

        switch (field) {
            case 'title':
                updatedData.title = value;
                break;
            case 'description':
                updatedData.description = value;
                break;
            case 'responsibleName':
                updatedData.responsibleName = value;
                break;
            case 'responsiblePhone':
                updatedData.responsiblePhone = value;
                break;

            case 'dueDate': {
                const dateValue = new Date(value);

                const year = dateValue.getFullYear();
                const month = String(dateValue.getMonth() + 1).padStart(2, '0');
                const day = String(dateValue.getDate()).padStart(2, '0');
                const hours = String(dateValue.getHours()).padStart(2, '0');
                const minutes = String(dateValue.getMinutes()).padStart(2, '0');

                // Formato exato do @JsonFormat no backend
                updatedData.dueDate = `${year}-${month}-${day}T${hours}:${minutes}`;
                break;
            }
        }

        updateTaskMutation.mutate(
            {
                id: task.id,
                task: updatedData
            },
            {
                onSuccess: () => {
                    success('Campo atualizado com sucesso!');
                    setEditingCell(null);
                },
                onError: (error: any) =>
                    showError(error?.response?.data?.message || "Erro ao atualizar campo.")
            }
        );
    };

    // Handle delete task
    const handleDeleteTask = (task: Task) => {
        deleteTaskMutation.mutate(task.id, {
            onSuccess: () => success('Tarefa excluída com sucesso!'),
            onError: (error: any) =>
                showError(error?.response?.data?.message || "Erro ao excluir tarefa.")
        });
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-center text-xs">
                <thead>
                    <tr className="border-b border-borderColor bg-surface-hover">
                        <th className="p-2 text-sm font-bold text-muted border-r border-borderColor">Título</th>
                        <th className="p-2 text-sm font-bold text-muted border-r border-borderColor">Descrição</th>
                        <th className="p-2 text-sm font-bold text-muted border-r border-borderColor">Responsável</th>
                        <th className="p-2 text-sm font-bold text-muted border-r border-borderColor">Telefone</th>
                        <th className="p-2 text-sm font-bold text-muted border-r border-borderColor">Prazo</th>
                        <th className="p-2 text-sm font-bold text-muted border-r border-borderColor">Prioridade</th>
                        <th className="p-2 text-sm font-bold text-muted border-r border-borderColor">Status</th>
                        <th className="p-2 text-sm font-bold text-muted border-r border-borderColor w-0">Ações</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-borderColor">
                    {tasks?.items.map((task: Task) => (
                        <tr key={task.id} className="hover:bg-white/5 transition-colors">
                            
                            {/* Title */}
                            <td
                                className="border-r border-borderColor cursor-pointer hover:bg-white/10 transition-colors p-2"
                                onClick={() => {
                                    setEditingCell({ taskId: task.id, field: 'title' });
                                    setEditValue(task.title);
                                }}
                            >
                                {editingCell?.taskId === task.id && editingCell?.field === 'title' ? (
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={() =>
                                            editValue !== task.title
                                                ? handleFieldUpdate(task, 'title', editValue)
                                                : setEditingCell(null)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleFieldUpdate(task, 'title', editValue);
                                            else if (e.key === 'Escape') setEditingCell(null);
                                        }}
                                        autoFocus
                                        className="w-full bg-surface border border-primary rounded px-2 py-1 text-text focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                ) : (
                                    <span className="font-semibold">{task.title}</span>
                                )}
                            </td>

                            {/* DESCRIPTION */}
                            <td
                                className="border-r border-borderColor cursor-pointer hover:bg-white/10 transition-colors p-2 max-w-xs"
                                onClick={() => {
                                    setEditingCell({ taskId: task.id, field: 'description' });
                                    setEditValue(task.description);
                                }}
                            >
                                {editingCell?.taskId === task.id && editingCell?.field === 'description' ? (
                                    <textarea
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={() =>
                                            editValue !== task.description
                                                ? handleFieldUpdate(task, 'description', editValue)
                                                : setEditingCell(null)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && e.ctrlKey)
                                                handleFieldUpdate(task, 'description', editValue);
                                            else if (e.key === 'Escape') setEditingCell(null);
                                        }}
                                        autoFocus
                                        rows={2}
                                        className="w-full bg-surface border border-primary rounded px-2 py-1 text-text focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                                    />
                                ) : (
                                    <span className="text-text-muted line-clamp-2">{task.description}</span>
                                )}
                            </td>

                            {/* RESPONSIBLE NAME */}
                            <td
                                className="border-r border-borderColor cursor-pointer hover:bg-white/10 transition-colors p-2"
                                onClick={() => {
                                    setEditingCell({ taskId: task.id, field: 'responsibleName' });
                                    setEditValue(task.responsibleName || '');
                                }}
                            >
                                {editingCell?.taskId === task.id && editingCell?.field === 'responsibleName' ? (
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={() =>
                                            editValue !== (task.responsibleName || '')
                                                ? handleFieldUpdate(task, 'responsibleName', editValue)
                                                : setEditingCell(null)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter')
                                                handleFieldUpdate(task, 'responsibleName', editValue);
                                            else if (e.key === 'Escape') setEditingCell(null);
                                        }}
                                        autoFocus
                                        className="w-full bg-surface border border-primary rounded px-2 py-1 text-text focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                ) : (
                                    task.responsibleName || "Não atribuído"
                                )}
                            </td>

                            {/* RESPONSIBLE PHONE */}
                            <td
                                className="border-r border-borderColor cursor-pointer hover:bg-white/10 transition-colors p-2"
                                onClick={() => {
                                    setEditingCell({ taskId: task.id, field: 'responsiblePhone' });
                                    setEditValue(task.responsiblePhone || '');
                                }}
                            >
                                {editingCell?.taskId === task.id && editingCell?.field === 'responsiblePhone' ? (
                                    <input
                                        type="tel"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={() =>
                                            editValue !== (task.responsiblePhone || '')
                                                ? handleFieldUpdate(task, 'responsiblePhone', editValue)
                                                : setEditingCell(null)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter')
                                                handleFieldUpdate(task, 'responsiblePhone', editValue);
                                            else if (e.key === 'Escape') setEditingCell(null);
                                        }}
                                        autoFocus
                                        className="w-full bg-surface border border-primary rounded px-2 py-1 text-text focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                ) : (
                                    task.responsiblePhone || "-"
                                )}
                            </td>

                            {/* DUE DATE — CORRIGIDO */}
                            <td
                                className="border-r border-borderColor cursor-pointer hover:bg-white/10 transition-colors p-2"
                                onClick={() => {
                                    setEditingCell({ taskId: task.id, field: 'dueDate' });

                                    // Converte para YYYY-MM-DDTHH:mm
                                    const date = new Date(task.dueDate);
                                    const y = date.getFullYear();
                                    const m = String(date.getMonth() + 1).padStart(2, '0');
                                    const d = String(date.getDate()).padStart(2, '0');
                                    const h = String(date.getHours()).padStart(2, '0');
                                    const min = String(date.getMinutes()).padStart(2, '0');

                                    setEditValue(`${y}-${m}-${d}T${h}:${min}`);
                                }}
                            >
                                {editingCell?.taskId === task.id && editingCell?.field === 'dueDate' ? (
                                    <input
                                        type="datetime-local"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={() => {
                                            const original = new Date(task.dueDate);
                                            const y = original.getFullYear();
                                            const m = String(original.getMonth() + 1).padStart(2, '0');
                                            const d = String(original.getDate()).padStart(2, '0');
                                            const h = String(original.getHours()).padStart(2, '0');
                                            const min = String(original.getMinutes()).padStart(2, '0');
                                            const originalFormatted = `${y}-${m}-${d}T${h}:${min}`;

                                            if (editValue !== originalFormatted)
                                                handleFieldUpdate(task, 'dueDate', editValue);
                                            else setEditingCell(null);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleFieldUpdate(task, 'dueDate', editValue);
                                            else if (e.key === 'Escape') setEditingCell(null);
                                        }}
                                        autoFocus
                                        className="w-full bg-surface border border-primary rounded px-2 py-1 text-text focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                ) : (
                                    new Date(task.dueDate).toLocaleString('pt-BR')
                                )}
                            </td>

                            {/* PRIORITY */}
                            <td
                                className="border-r text-center border-borderColor cursor-pointer hover:bg-white/10 transition-colors"
                                onClick={() => handleTogglePriority(task)}
                                title="Clique para alterar a prioridade"
                            >
                                {task.priority === Priority.HIGH ? (
                                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full bg-red-500/20 text-red-400">
                                        Alta
                                    </span>
                                ) : task.priority === Priority.MEDIUM ? (
                                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-400">
                                        Média
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-400">
                                        Baixa
                                    </span>
                                )}
                            </td>

                            {/* STATUS */}
                            <td
                                className="border-r text-center border-borderColor cursor-pointer hover:bg-white/10 transition-colors"
                                onClick={() => handleToggleTaskStatus(task)}
                                title="Clique para alterar o status"
                            >
                                {task.taskStatus === ProgressStatus.PENDING ? (
                                    <span className="flex justify-center items-center text-yellow-400">
                                        <ClockIcon className="w-4 h-4 mr-1" />
                                        Pendente
                                    </span>
                                ) : task.taskStatus === ProgressStatus.IN_PROGRESS ? (
                                    <span className="flex justify-center items-center text-blue-400">
                                        <ClockIcon className="w-4 h-4 mr-1" />
                                        Em Progresso
                                    </span>
                                ) : (
                                    <span className="flex justify-center items-center text-green-400">
                                        <CheckCircleIcon className="w-4 h-4 mr-1" />
                                        Concluída
                                    </span>
                                )}
                            </td>

                            {/* ACTIONS */}
                            <td className="border-r border-borderColor">
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => handleDeleteTask(task)}
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
    );
}

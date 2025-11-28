import React from "react";
import {
    CheckCircleIcon,
    ClockIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/Form/Button";

export default function Tasks() {
    const tasks = [
        { id: 1, title: "Confirmar buffet", event: "Casamento Silva & Souza", deadline: "Amanhã", priority: "high", completed: false },
        { id: 2, title: "Enviar convites digitais", event: "Festival de Verão", deadline: "2 dias", priority: "medium", completed: false },
        { id: 3, title: "Contratar fotógrafo", event: "Tech Summit", deadline: "1 semana", priority: "low", completed: true },
        { id: 4, title: "Reservar local", event: "Workshop Design", deadline: "3 dias", priority: "high", completed: false },
        { id: 5, title: "Definir cardápio", event: "Aniversário 50 anos", deadline: "5 dias", priority: "medium", completed: false },
    ];

    const pendingTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    return (
        <div className="min-h-screen bg-background text-text p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-text mb-2">Tarefas</h1>
                        <p className="text-muted">{pendingTasks.length} pendentes de {tasks.length} total</p>
                    </div>
                    <Button>
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Nova Tarefa
                    </Button>
                </div>

                {/* Pending Tasks */}
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-text mb-4">Pendentes</h2>
                    <div className="space-y-3">
                        {pendingTasks.map((task) => (
                            <div key={task.id} className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4 flex items-start gap-3">
                                <CheckCircleIcon className="w-5 h-5 text-muted flex-shrink-0 mt-1" />
                                <div className="flex-1">
                                    <div className="text-sm font-bold text-text">{task.title}</div>
                                    <div className="text-xs text-muted mt-1">{task.event}</div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className={`text-xs px-2 py-0.5 rounded ${task.priority === 'high' ? 'bg-error/20 text-error' :
                                            task.priority === 'medium' ? 'bg-warning/20 text-warning' :
                                                'bg-info/20 text-info'
                                        }`}>
                                        {task.deadline}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Completed Tasks */}
                {completedTasks.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold text-text mb-4">Concluídas</h2>
                        <div className="space-y-3">
                            {completedTasks.map((task) => (
                                <div key={task.id} className="bg-success/5 border border-success/20 rounded-sm p-4 flex items-start gap-3">
                                    <CheckCircleIcon className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                                    <div className="flex-1">
                                        <div className="text-sm font-bold text-muted line-through">{task.title}</div>
                                        <div className="text-xs text-muted mt-1">{task.event}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

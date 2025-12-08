import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import Select from "@/components/Form/Select";
import { taskCreateSchema, type TaskCreateForm } from "@/schemas/validation";
import { useToast } from "@/contexts/ToastContext";

interface CreateTaskFormProps {
    onSubmit: (data: TaskCreateForm) => Promise<void>;
    onCancel: () => void;
}

export default function CreateTaskForm({ onSubmit, onCancel }: CreateTaskFormProps) {
    const { success, error: showError } = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<TaskCreateForm>({
        resolver: zodResolver(taskCreateSchema),
        defaultValues: {
            title: "",
            description: "",
            priority: "medium", // Default to medium based on original form UI assumption or schema
            category: "",
            dueDate: "",
            status: "pending"
        }
    });

    const handleFormSubmit = async (data: TaskCreateForm) => {
        try {
            await onSubmit(data);
            reset();
            success("Tarefa criada com sucesso!");
        } catch (error) {
            showError("Erro ao criar tarefa.");
        }
    };

    const priorities = [
        { value: "high", label: "Alta" },
        { value: "medium", label: "Média" },
        { value: "low", label: "Baixa" }
    ];

    const categories = [
        { value: "Técnico", label: "Técnico" },
        { value: "Catering", label: "Catering" },
        { value: "Segurança", label: "Segurança" },
        { value: "Marketing", label: "Marketing" },
        { value: "Outros", label: "Outros" }
    ];

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
                <Input
                    {...register("title")}
                    label="Título da Tarefa"
                    type="text"
                    isRequired
                    placeholder="Ex: Confirmar equipamentos"
                    errors={errors.title}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-muted mb-2">Descrição</label>
                <textarea
                    {...register("description")}
                    className="w-full bg-surface border border-borderColor rounded px-4 py-3 text-text text-sm"
                    rows={3}
                    placeholder="Detalhes da tarefa..."
                ></textarea>
                {/* Custom textarea doesn't have error prop yet, handling manually if needed, or stick to basic */}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Select
                        {...register("priority")}
                        label="Prioridade"
                        options={priorities}
                        errors={errors.priority}
                    />
                </div>
                <div>
                    <Select
                        {...register("category")}
                        label="Categoria"
                        options={categories}
                        errors={errors.category}
                    />
                </div>
            </div>
            <div>
                <Input
                    {...register("dueDate")}
                    label="Prazo"
                    type="date"
                    isRequired
                    errors={errors.dueDate}
                />
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Criando..." : "Criar Tarefa"}
                </Button>
            </div>
        </form>
    );
}

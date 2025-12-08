import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import Select from "@/components/Form/Select";
import { expenseCreateSchema, ExpenseStatus, Priority, type ExpenseCreateForm } from "@/schemas/validation";
import { useToast } from "@/contexts/ToastContext";
import { useCreateExpense } from "@/hooks/useExpenses"
import { PaymentStatus } from "@/types/system";

interface CreateExpenseProps {
    onCancel: () => void;
    eventId: string
}

export default function CreateExpense({ onCancel, eventId }: CreateExpenseProps) {
    const { success, error: showError } = useToast();


    const createExpenseMutation = useCreateExpense(eventId);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ExpenseCreateForm>({
        resolver: zodResolver(expenseCreateSchema),
        defaultValues: {
            amount: 0,
        }
    });

    const onSubmit = async (data: ExpenseCreateForm) => {

        createExpenseMutation.mutate({ data, eventId }, {
            onSuccess: () => {
                success("Despesa criada com sucesso!");
                onCancel();
            },
            onError: (error: any) => {
                showError(error?.response?.data?.message || "Erro ao criar despesa.");
            },
        });
    };

    const priorityOptions = [
        { value: Priority.LOW, label: "Baixa" },
        { value: Priority.MEDIUM, label: "Média" },
        { value: Priority.HIGH, label: "Alta" },
    ];

    const statusOptions = [
        { value: ExpenseStatus.PENDING, label: "Pendente" },
        { value: ExpenseStatus.IN_PROGRESS, label: "Em Progresso" },
        { value: ExpenseStatus.DONE, label: "Concluído" },
    ];

    const paymentStatusOptions = [
        { value: PaymentStatus.PENDING, label: "Pendente" },
        { value: PaymentStatus.PAID, label: "Pago" },
    ];

    const categories = [
        { value: "Local", label: "Local" },
        { value: "Catering", label: "Catering" },
        { value: "Som & Luz", label: "Som & Luz" },
        { value: "Marketing", label: "Marketing" },
        { value: "Outros", label: "Outros" }
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Input
                    {...register("title")}
                    label="Título"
                    type="text"
                    isRequired
                    placeholder="Ex: Pagamento do Salão"
                    errors={errors.title}
                />
            </div>
            <div>
                <Input
                    {...register("description")}
                    label="Descrição"
                    type="text"
                    placeholder="Detalhes adicionais..."
                    errors={errors.description}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Select
                    {...register("category")}
                    label="Categoria"
                    options={categories}
                    errors={errors.category}
                    selectClassName="bg-surface border-borderColor"
                />
                <Input
                    {...register("amount", { valueAsNumber: true })}
                    label="Valor (R$)"
                    type="number"
                    step="0.01"
                    isRequired
                    placeholder="0,00"
                    errors={errors.amount}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Input
                    {...register("dueDate")}
                    label="Vencimento"
                    type="datetime-local"
                    isRequired
                    errors={errors.dueDate}
                />
                <Select
                    {...register("priority")}
                    label="Prioridade"
                    options={priorityOptions}
                    errors={errors.priority}
                    selectClassName="bg-surface border-borderColor"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Select
                    {...register("status")}
                    label="Status da Tarefa"
                    options={statusOptions}
                    errors={errors.status}
                    selectClassName="bg-surface border-borderColor"
                />
                <Select
                    {...register("paymentStatus")}
                    label="Status do Pagamento"
                    options={paymentStatusOptions}
                    errors={errors.paymentStatus}
                    selectClassName="bg-surface border-borderColor"
                />
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => onCancel()}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Salvando..." : "Salvar"}
                </Button>
            </div>
        </form>
    );
}

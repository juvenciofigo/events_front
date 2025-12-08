import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import Select from "@/components/Form/Select";
import { supplierCreateSchema, type SupplierCreateForm } from "@/schemas/validation";
import { useToast } from "@/contexts/ToastContext";

interface CreateSupplierFormProps {
    onSubmit: (data: SupplierCreateForm) => Promise<void>;
    onCancel: () => void;
}

export default function CreateSupplierForm({ onSubmit, onCancel }: CreateSupplierFormProps) {
    const { success, error: showError } = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<SupplierCreateForm>({
        resolver: zodResolver(supplierCreateSchema),
        defaultValues: {
            name: "",
            category: "",
            contactName: "",
            phone: "",
            email: "",
            contractValue: 0,
            status: "active"
        }
    });

    const handleFormSubmit = async (data: SupplierCreateForm) => {
        try {
            await onSubmit(data);
            reset();
            success("Fornecedor adicionado com sucesso!");
        } catch (error) {
            showError("Erro ao adicionar fornecedor.");
        }
    };

    const categories = [
        { value: "Catering", label: "Catering" },
        { value: "Som & Iluminação", label: "Som & Iluminação" },
        { value: "Decoração", label: "Decoração" },
        { value: "Segurança", label: "Segurança" },
        { value: "Outros", label: "Outros" }
    ];

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
                <Input
                    {...register("name")}
                    label="Nome da Empresa"
                    type="text"
                    isRequired
                    placeholder="Ex: Buffet Gourmet"
                    errors={errors.name}
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
            <div>
                <Input
                    {...register("contactName")}
                    label="Pessoa de Contato"
                    type="text"
                    isRequired
                    placeholder="Nome completo"
                    errors={errors.contactName}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Input
                        {...register("phone")}
                        label="Telefone"
                        type="tel"
                        isRequired
                        placeholder="(11) 98765-4321"
                        errors={errors.phone}
                    />
                </div>
                <div>
                    <Input
                        {...register("email")}
                        label="Email"
                        type="email"
                        isRequired
                        placeholder="contato@empresa.com"
                        errors={errors.email}
                    />
                </div>
            </div>
            <div>
                <Input
                    {...register("contractValue", { valueAsNumber: true })}
                    label="Valor do Contrato (R$)"
                    type="number"
                    step="0.01"
                    isRequired
                    placeholder="0,00"
                    errors={errors.contractValue}
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
                    {isSubmitting ? "Salvando..." : "Salvar"}
                </Button>
            </div>
        </form>
    );
}

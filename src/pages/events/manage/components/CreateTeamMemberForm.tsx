import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import { teamMemberCreateSchema, type TeamMemberCreateForm } from "@/schemas/validation";
import { useToast } from "@/contexts/ToastContext";

interface CreateTeamMemberFormProps {
    onSubmit: (data: TeamMemberCreateForm) => Promise<void>;
    onCancel: () => void;
}

export default function CreateTeamMemberForm({ onSubmit, onCancel }: CreateTeamMemberFormProps) {
    const { success, error: showError } = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<TeamMemberCreateForm>({
        resolver: zodResolver(teamMemberCreateSchema),
        defaultValues: {
            name: "",
            role: "",
            phone: "",
            email: ""
        }
    });

    const handleFormSubmit = async (data: TeamMemberCreateForm) => {
        try {
            await onSubmit(data);
            reset();
            success("Membro adicionado com sucesso!");
        } catch (error) {
            showError("Erro ao adicionar membro.");
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
                <Input
                    {...register("name")}
                    label="Nome Completo"
                    type="text"
                    isRequired
                    placeholder="Nome do membro"
                    errors={errors.name}
                />
            </div>
            <div>
                <Input
                    {...register("role")}
                    label="Função"
                    type="text"
                    isRequired
                    placeholder="Ex: Coordenador Técnico"
                    errors={errors.role}
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
                        placeholder="email@exemplo.com"
                        errors={errors.email}
                    />
                </div>
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
                    {isSubmitting ? "Adicionando..." : "Adicionar"}
                </Button>
            </div>
        </form>
    );
}

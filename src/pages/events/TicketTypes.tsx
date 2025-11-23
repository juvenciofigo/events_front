import React from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketTypeSchema, type TicketTypeForm } from "../../schemas/validation";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";

export default function TicketTypes() {
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TicketTypeForm>({
        resolver: zodResolver(ticketTypeSchema),
        defaultValues: {
            name: "",
            price: 0,
            quantity: 0,
            description: "",
        },
    });

    async function onSubmit(data: TicketTypeForm) {
        console.log("Criar tipo de ingresso para evento", id, data);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-2xl mx-auto bg-surface/50 backdrop-blur-xl rounded-sm shadow-2xl shadow-black/50 p-6 border border-white/10">
                <h2 className="text-2xl font-bold mb-4 text-text">Criar Tipo de Ingresso</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 gap-4">
                    <Input
                        {...register("name")}
                        label="Nome do Ingresso"
                        placeholder="Ex: VIP, Pista, Camarote"
                        errors={errors.name}
                    />

                    <Input
                        {...register("price", { valueAsNumber: true })}
                        label="Preço"
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        min="0"
                        errors={errors.price}
                    />

                    <Input
                        {...register("quantity", { valueAsNumber: true })}
                        label="Quantidade Disponível"
                        placeholder="100"
                        type="number"
                        min="1"
                        errors={errors.quantity}
                    />

                    <div>
                        <label className="block text-xs font-medium text-muted mb-1">Descrição</label>
                        <textarea
                            {...register("description")}
                            placeholder="Descrição do tipo de ingresso (opcional)"
                            rows={3}
                            className="w-full px-3 py-2 text-sm border border-white/10 rounded-sm bg-background/50 text-text placeholder-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-vertical"
                        />
                        {errors.description && <div className="text-xs text-error mt-1">{errors.description.message}</div>}
                    </div>

                    <div className="flex gap-2 pt-2">
                        <Button
                            type="button"
                            variant="secondary"
                            className="flex-1"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            className="flex-1"
                        >
                            {isSubmitting ? "Criando..." : "Criar Ingresso"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

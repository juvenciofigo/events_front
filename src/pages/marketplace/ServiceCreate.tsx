import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceCreateSchema, type ServiceCreateForm } from "../../schemas/validation";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";

export default function ServiceCreate() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ServiceCreateForm>({
        resolver: zodResolver(serviceCreateSchema),
        defaultValues: {
            name: "",
            description: "",
            category: "",
            price: undefined,
            image: "",
        },
    });

    async function onSubmit(data: ServiceCreateForm) {
        console.log("Salvar novo serviço", data);
        // TODO: Call backend service creation API
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate("/marketplace");
    }

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-2xl mx-auto bg-surface/50 backdrop-blur-xl rounded-sm shadow-2xl shadow-black/50 p-6 border border-white/10">
                <h2 className="text-2xl font-bold mb-4 text-text">Criar Serviço</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 gap-4">
                    <Input
                        {...register("name")}
                        label="Nome do serviço"
                        placeholder="Ex: Fotografia de eventos"
                        errors={errors.name}
                    />

                    <div>
                        <label className="block text-xs font-medium text-muted mb-1">Descrição</label>
                        <textarea
                            {...register("description")}
                            placeholder="Descreva detalhadamente seu serviço"
                            rows={4}
                            className="w-full px-3 py-2 text-sm border border-white/10 rounded-sm bg-background/50 text-text placeholder-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-vertical"
                        />
                        {errors.description && <div className="text-xs text-error mt-1">{errors.description.message}</div>}
                    </div>

                    <Input
                        {...register("category")}
                        label="Categoria"
                        placeholder="Ex: Fotografia, Catering, DJ"
                        errors={errors.category}
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
                        {...register("image")}
                        label="URL da Imagem"
                        placeholder="https://exemplo.com/imagem.jpg"
                        type="url"
                        errors={errors.image}
                    />

                    <div className="flex gap-2 pt-2">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => navigate("/marketplace")}
                            className="flex-1"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            className="flex-1"
                        >
                            {isSubmitting ? "Salvando..." : "Criar Serviço"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

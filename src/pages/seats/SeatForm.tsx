import React, { useEffect, } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { seatSchema, type SeatFormData } from "../../schemas/validation";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import { useCreateSeat } from "@/hooks/useSeats";
import { useParams } from "react-router-dom";
import { useToast } from "@/contexts/ToastContext";
import { Seat } from "@/types/seat";

export default function SeatForm({ onSave }: { onSave?: (data: Seat) => void }) {
    const { eventId } = useParams();
    const toast = useToast();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<SeatFormData>({
        resolver: zodResolver(seatSchema),
        defaultValues: {
            name: "",
            isPaid: false,
            price: 0,
            description: "",
            totalSeats: 0,
            layoutPositionX: 0,
            layoutPositionY: 0,
        },
    });

    const isPaid = watch("isPaid");
    const showPrice = String(isPaid) === "true";

    const createSeat = useCreateSeat();

    function onSubmit(data: SeatFormData) {
        if (!eventId) {
            toast.error("Erro ao criar assento.")
            return
        };

        createSeat.mutate({ eventId: eventId, data: data }, {
            onSuccess: (data: Seat) => {
                toast.success("Assento criado com sucesso.")
                onSave?.(data)
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Erro ao criar assento.")
            },
        })
    }

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Input
                    {...register("name")}
                    label="Nome do assento"
                    placeholder="Ex: A1, VIP-001"
                    errors={errors.name}
                    InputClassName="pl-4"
                />

                <div>
                    <label className="mb-2 text-xs font-medium text-text block">Requer pagamento?</label>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                {...register("isPaid")}
                                type="radio"
                                value="true"
                                className="w-4 h-4 text-primary bg-surface border-borderColor focus:ring-primary"
                            />
                            <span className="text-sm text-text">Sim</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                {...register("isPaid")}
                                type="radio"
                                value="false"
                                className="w-4 h-4 text-primary bg-surface border-borderColor focus:ring-primary"
                            />
                            <span className="text-sm text-text">Não</span>
                        </label>
                    </div>
                </div>

                {showPrice && (
                    <Input
                        {...register("price", { valueAsNumber: true })}
                        label="Preço"
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        min="0"
                        errors={errors.price}
                        InputClassName="pl-4"
                    />
                )}

                <Input
                    {...register("totalSeats", { valueAsNumber: true })}
                    label="Total de assentos"
                    placeholder="0"
                    type="number"
                    min="0"
                    errors={errors.totalSeats}
                    InputClassName="pl-4"
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        {...register("layoutPositionX", { valueAsNumber: true })}
                        label="Posição X"
                        placeholder="0"
                        type="number"
                        errors={errors.layoutPositionX}
                        InputClassName="pl-4"
                    />
                    <Input
                        {...register("layoutPositionY", { valueAsNumber: true })}
                        label="Posição Y"
                        placeholder="0"
                        type="number"
                        errors={errors.layoutPositionY}
                        InputClassName="pl-4"
                    />
                </div>

                <div>
                    <label className="mb-2 text-xs font-medium text-text dark:text-slate-300 block">
                        Descrição (Opcional)
                    </label>
                    <textarea
                        {...register("description")}
                        placeholder="Descrição do assento"
                        rows={4}
                        className="w-full px-3 py-2 bg-slate-900/10 border-black/20 dark:bg-slate-950/80 border dark:border-white/10 rounded text-xs md:text-sm dark:text-white dark:placeholder-slate-500 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all resize-none"
                    />
                    {errors.description && (
                        <div className="text-xs text-red-400 mt-1">{errors.description.message}</div>
                    )}
                </div>

                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    fullWidth
                    size="lg"
                    className="mt-4"
                >
                    Salvar Assento
                </Button>
            </form>
        </div>
    );
}

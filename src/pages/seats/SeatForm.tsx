import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { seatSchema, type SeatFormData } from "../../schemas/validation";

export default function SeatForm({ onSave }: { onSave?: (data: SeatFormData) => void }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<SeatFormData>({
        resolver: zodResolver(seatSchema),
        defaultValues: {
            name: "",
            paid: false,
            price: 0,
            totalSeats: 0,
            availableSeats: 0,
            posX: 0,
            posY: 0,
        },
    });

    const total = watch("totalSeats");

    useEffect(() => {
        if (typeof total === "number" && total > 0) {
            setValue("availableSeats", total);
        }
    }, [total, setValue]);

    function onSubmit(data: SeatFormData) {
        console.log("Salvar assento", data);
        onSave?.(data);
    }

    return (
        <div className="bg-surface border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-text mb-6">Formulário de Assento</h3>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-muted mb-2">Nome do assento</label>
                    <input
                        {...register("name")}
                        placeholder="Ex: A1, VIP-001"
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                    {errors.name && <div className="text-sm text-red-400 mt-1">{errors.name.message}</div>}
                </div>

                <label className="flex items-center gap-3 p-4 rounded-xl bg-white/5 cursor-pointer hover:bg-white/10 transition-colors border border-white/5">
                    <input
                        {...register("paid")}
                        type="checkbox"
                        className="w-5 h-5 rounded border-white/20 bg-surface text-primary focus:ring-primary"
                    />
                    <span className="text-text font-medium">Requer pagamento?</span>
                </label>

                <div>
                    <label className="block text-sm font-medium text-muted mb-2">Preço</label>
                    <input
                        {...register("price", { valueAsNumber: true })}
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        min="0"
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                    {errors.price && <div className="text-sm text-red-400 mt-1">{errors.price.message}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted mb-2">Total de assentos</label>
                    <input
                        {...register("totalSeats", { valueAsNumber: true })}
                        placeholder="0"
                        type="number"
                        min="0"
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                    {errors.totalSeats && <div className="text-sm text-red-400 mt-1">{errors.totalSeats.message}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted mb-2">Assentos disponíveis</label>
                    <input
                        {...register("availableSeats", { valueAsNumber: true })}
                        type="number"
                        min="0"
                        readOnly
                        className="w-full bg-surface/50 border border-white/5 rounded-xl px-4 py-3 text-text-disabled cursor-not-allowed"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Posição X</label>
                        <input
                            {...register("posX", { valueAsNumber: true })}
                            placeholder="0"
                            type="number"
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                        {errors.posX && <div className="text-sm text-red-400 mt-1">{errors.posX.message}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Posição Y</label>
                        <input
                            {...register("posY", { valueAsNumber: true })}
                            placeholder="0"
                            type="number"
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                        {errors.posY && <div className="text-sm text-red-400 mt-1">{errors.posY.message}</div>}
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/10">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-lg shadow-primary/20 transition-all font-bold transform hover:-translate-y-1">
                        Salvar Assento
                    </button>
                </div>
            </form>
        </div>
    );
}

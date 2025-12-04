import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define schema locally for now, or could be in validation.ts
const gridSchema = z.object({
    startRow: z.string().regex(/^[A-Z]$/, "Use uma letra maiúscula (A-Z)"),
    endRow: z.string().regex(/^[A-Z]$/, "Use uma letra maiúscula (A-Z)"),
    seatsPerRow: z.number().min(1, "Mínimo 1 assento"),
    sectorId: z.string().min(1, "Selecione um setor"),
    price: z.number().min(0, "Preço inválido"),
    startX: z.number().default(50),
    startY: z.number().default(50),
    spacing: z.number().default(40)
});

type GridFormData = z.infer<typeof gridSchema>;

type Sector = {
    id: string;
    name: string;
    color: string;
    price: number;
};

type GeneratedSeat = {
    name: string;
    x: number;
    y: number;
    sector: string;
    price: number;
    status: 'available';
};

interface SeatGridGeneratorProps {
    sectors: Sector[];
    onGenerate: (seats: GeneratedSeat[]) => void;
    onClose: () => void;
}

export default function SeatGridGenerator({ sectors, onGenerate, onClose }: SeatGridGeneratorProps) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<GridFormData>({
        resolver: zodResolver(gridSchema),
        defaultValues: {
            startRow: "A",
            endRow: "C",
            seatsPerRow: 10,
            price: 0,
            startX: 50,
            startY: 50,
            spacing: 40
        }
    });

    const selectedSectorId = watch("sectorId");

    // Auto-update price when sector changes
    useEffect(() => {
        if (selectedSectorId) {
            const sector = sectors.find(s => s.id === selectedSectorId);
            if (sector) {
                setValue("price", sector.price);
            }
        }
    }, [selectedSectorId, sectors, setValue]);

    const onSubmit = (data: GridFormData) => {
        const newSeats: GeneratedSeat[] = [];
        const startChar = data.startRow.charCodeAt(0);
        const endChar = data.endRow.charCodeAt(0);

        // Ensure start is before end
        const start = Math.min(startChar, endChar);
        const end = Math.max(startChar, endChar);

        let currentRowY = data.startY;

        for (let r = start; r <= end; r++) {
            const rowLabel = String.fromCharCode(r);
            let currentX = data.startX;

            for (let s = 1; s <= data.seatsPerRow; s++) {
                newSeats.push({
                    name: `${rowLabel}${s}`,
                    x: currentX,
                    y: currentRowY,
                    sector: data.sectorId,
                    price: data.price,
                    status: 'available'
                });
                currentX += data.spacing;
            }
            currentRowY += data.spacing;
        }

        onGenerate(newSeats);
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-text-muted">
                Gere rapidamente um bloco de assentos definindo o intervalo de fileiras e assentos.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-1">Fileira Inicial</label>
                        <input
                            {...register("startRow")}
                            className="w-full bg-surface border border-borderColor rounded p-2 text-text uppercase"
                            placeholder="A"
                            maxLength={1}
                        />
                        {errors.startRow && <span className="text-xs text-red-400">{errors.startRow.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-1">Fileira Final</label>
                        <input
                            {...register("endRow")}
                            className="w-full bg-surface border border-borderColor rounded p-2 text-text uppercase"
                            placeholder="F"
                            maxLength={1}
                        />
                        {errors.endRow && <span className="text-xs text-red-400">{errors.endRow.message}</span>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-1">Assentos por Fileira</label>
                        <input
                            {...register("seatsPerRow", { valueAsNumber: true })}
                            type="number"
                            className="w-full bg-surface border border-borderColor rounded p-2 text-text"
                        />
                        {errors.seatsPerRow && <span className="text-xs text-red-400">{errors.seatsPerRow.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-1">Espaçamento (px)</label>
                        <input
                            {...register("spacing", { valueAsNumber: true })}
                            type="number"
                            className="w-full bg-surface border border-borderColor rounded p-2 text-text"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted mb-1">Setor</label>
                    <select
                        {...register("sectorId")}
                        className="w-full bg-surface border border-borderColor rounded p-2 text-text"
                    >
                        <option value="">Selecione um setor...</option>
                        {sectors.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                    {errors.sectorId && <span className="text-xs text-red-400">{errors.sectorId.message}</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted mb-1">Preço por Assento</label>
                    <input
                        {...register("price", { valueAsNumber: true })}
                        type="number"
                        step="0.01"
                        className="w-full bg-surface border border-borderColor rounded p-2 text-text"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-1">Posição Inicial X</label>
                        <input
                            {...register("startX", { valueAsNumber: true })}
                            type="number"
                            className="w-full bg-surface border border-borderColor rounded p-2 text-text"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-1">Posição Inicial Y</label>
                        <input
                            {...register("startY", { valueAsNumber: true })}
                            type="number"
                            className="w-full bg-surface border border-borderColor rounded p-2 text-text"
                        />
                    </div>
                </div>

                <div className="pt-4 flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-borderColor text-text rounded hover:bg-white/5 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors font-semibold"
                    >
                        Gerar Grade
                    </button>
                </div>
            </form>
        </div>
    );
}

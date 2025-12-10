import React, { useState } from 'react';
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateGuest } from "@/hooks/useGuests";
import { useToast } from "@/contexts/ToastContext";
import { guestCreateSchema, type GuestCreateForm } from "@/schemas/validation";
import Input from "@/components/Form/Input";
import Select, { SelectOption } from "@/components/Form/Select";
import Button from "@/components/Form/Button";
import { useFetchSeats } from '@/hooks/useSeats';
import { PaymentMethod, PaymentMethods } from '@/types/system';
import { formatCurrency } from '@/utils';

interface CreateGuestProps {
    eventId: string;
    setModalOpen: (open: boolean) => void;
}

export default function CreateGuest({ eventId, setModalOpen }: CreateGuestProps) {
    const createGuest = useCreateGuest();
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("createdAt")
    const [limit] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");


    const { data: dataSeats, error: errorSeat, isLoading: loadingSeat } = useFetchSeats(eventId, { limit, page, sort, searchQuery })

    const { success, error: errorToast } = useToast();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<GuestCreateForm>({
        resolver: zodResolver(guestCreateSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            eventId: eventId,
            totalPeople: 1,
            notes: "",
            seatId: "",
            paymentMethod: PaymentMethod.MPESA,
            payerNum: "",
        },
    });

    const onSubmit = async (data: GuestCreateForm) => {
        if (!eventId) return;

        try {
            await createGuest.mutateAsync(data);
            success("Participante adicionado com sucesso!");
            setModalOpen(false);
            reset();
        } catch (err) {
            console.error(err);
            errorToast("Erro ao adicionar participante.");
        }
    };

    const option: SelectOption[] = dataSeats && dataSeats.items.length > 0 ? dataSeats?.items.map(s => {
        return {
            value: s.id,
            label: s.name + (s.isPaid ? ` (pago) ${formatCurrency(s.price || 0)}` : ""),
        }
    }) : []

    const seatId = useWatch({ control, name: "seatId" });
    const selectedSeat = dataSeats?.items.find(s => s.id === seatId);
    const isSeatPaid = selectedSeat?.isPaid;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                {...register("name")}
                label="Nome Completo"
                type="text"
                isRequired
                placeholder="Ex: João Silva"
                InputClassName="px-4 py-3"
                errors={errors.name?.message}
            />

            <Input
                {...register("phone")}
                label="Telefone"
                type="phone"
                isRequired
                placeholder="Ex: 8xxxxxxxx"
                InputClassName="px-4 py-3"
                errors={errors.phone?.message}
            />

            <Input
                {...register("email")}
                label="Email"
                type="email"
                placeholder="Ex: joao@email.com"
                InputClassName="px-4 py-3"
                errors={errors.email?.message}
            />

            <Select
                {...register("seatId")}
                label="Assento (Opcional)"
                selectClassName="px-4 py-3"
                options={option}
                errors={errors.seatId?.message}
            />

            {isSeatPaid && (<div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${errors.paymentMethod?.message ? 'col-span-2' : 'col-span-1'}`}>
                {/* <div className="col-span-1 md:col-span-2 text-sm text-fuchsia-500 font-semibold bg-fuchsia-500/10 p-3 rounded-lg border border-fuchsia-500/20">
                    Valor a pagar: {new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(selectedSeat?.price || 0)}
                </div> */}
                <Select
                    {...register("paymentMethod")}
                    label="Método de pagamento"
                    selectClassName="px-4 py-3"
                    isRequired
                    options={PaymentMethods}
                    errors={errors.paymentMethod?.message}
                />

                <Input
                    {...register("payerNum")}
                    label="Número do pagador"
                    type="phone"
                    isRequired
                    maxLength={9}
                    placeholder="Ex: 8xxxxxxxx"
                    InputClassName="px-4 py-3"
                    errors={errors.payerNum?.message}
                />
            </div>)}

            <div>
                <label className="block text-sm font-medium text-text mb-2">Descrição</label>
                <textarea
                    {...register("notes")}
                    rows={4}
                    placeholder="Descreva seu evento..."
                    className="w-full bg-surface/10 border-black/20 dark:bg-slate-950/80 border dark:border-white/10 rounded text-xs md:text-sm dark:text-white dark:placeholder-slate-500 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all pl-2 md:py-3 py-3 resize-none"
                ></textarea>
                {errors.notes && <div className="text-xs text-red-400 mt-1">{errors.notes.message}</div>}
            </div>

            <div className="pt-4 flex gap-3">
                <Button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    variant="secondary"
                    size="sm"
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                >
                    Salvar Participante
                </Button>
            </div>
        </form>
    );
}
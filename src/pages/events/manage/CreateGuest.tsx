import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateGuest } from "@/hooks/useGuests";
import { useToast } from "@/contexts/ToastContext";
import { guestCreateSchema, type GuestCreateForm } from "@/schemas/validation";
import Input from "@/components/Form/Input";
import Select from "@/components/Form/Select";
import Button from "@/components/Form/Button";
import { useGetSeats } from '@/hooks/useSeats';

interface CreateGuestProps {
    eventId?: string;
    setModalOpen: (open: boolean) => void;
}

const MOCK_SEATS = [
    { value: "", label: "Selecione um assento" },
    { value: "A1", label: "A1" },
    { value: "A2", label: "A2" },
    { value: "B1", label: "B1" },
    { value: "B2", label: "B2" },
    { value: "C1", label: "C1" },
    { value: "C2", label: "C2" },
    { value: "D1", label: "D1" },
];

const TICKET_TYPES = [
    { value: "Pista", label: "Pista" },
    { value: "Pista Premium", label: "Pista Premium" },
    { value: "VIP", label: "VIP" },
    { value: "Early Bird", label: "Early Bird" },
];

export default function CreateGuest({ eventId, setModalOpen }: CreateGuestProps) {
    const createGuest = useCreateGuest();
    const { data: dataSeats, error: errorSeat, isLoading: loadingSeat } = useGetSeats(eventId)
    console.log(dataSeats);
    
    const { success, error: errorToast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<GuestCreateForm>({
        resolver: zodResolver(guestCreateSchema),
        defaultValues: {
            name: "",
            email: "",
            ticketType: "Pista",
            seat: "",
        },
    });

    const onSubmit = async (data: GuestCreateForm) => {
        if (!eventId) return;

        try {
            await createGuest.mutateAsync({
                eventId,
                guest: {
                    name: data.name,
                    email: data.email,
                    seat: data.seat || null,
                    status: "pending",
                    ticketType: data.ticketType,
                    checkedIn: false,
                    purchaseDate: new Date().toISOString()
                }
            });
            success("Participante adicionado com sucesso!");
            setModalOpen(false);
            reset();
        } catch (err) {
            console.error(err);
            errorToast("Erro ao adicionar participante.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                {...register("name")}
                label="Nome Completo"
                type="text"
                isRequired
                placeholder="Ex: João Silva"
                InputClassName="px-4 py-3"
                errors={errors.name}
            />

            <Input
                {...register("email")}
                label="Email"
                type="email"
                isRequired
                placeholder="Ex: joao@email.com"
                InputClassName="px-4 py-3"
                errors={errors.email}
            />

            <Select
                {...register("ticketType")}
                label="Tipo de Ingresso"
                isRequired
                selectClassName="px-4 py-3"
                options={TICKET_TYPES}
                errors={errors.ticketType}
            />

            <Select
                {...register("seat")}
                label="Assento (Opcional)"
                selectClassName="px-4 py-3"
                options={MOCK_SEATS}
                errors={errors.seat}
            />

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

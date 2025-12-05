import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { seatsApi } from "../services/seatApi";
import { Seat } from "@/types/seat";
import { query } from "@/types/system";
import { SeatFormData } from "@/schemas/validation";

export function useFetchSeats(
    eventId: string,
    { limit, sort, page, searchQuery }: query
) {
    return useQuery({
        queryKey: ["get seat", eventId],
        queryFn: () => seatsApi.fetchSeats(eventId, { limit, page, sort, searchQuery }),
        enabled: !!eventId
    });
}

export function useCreateSeat() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ eventId, data }: { eventId: string, data: SeatFormData }) => (
            seatsApi.createSeat(eventId, data)
        ),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["create seat"] }),
    });
}

export function useUpdateSeat() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ data }: { data: Partial<Seat> }) => seatsApi.updateSeat(data.id!, data),
        onSuccess: (data: Seat) => qc.invalidateQueries({ queryKey: ["update seat", data.id] }),
    });
}

export function useDeleteSeat(seatId: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (seatId: string) => seatsApi.deleteSeat(seatId),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["delete seat", seatId] }),
    });
}

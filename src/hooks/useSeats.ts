import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { seatsApi } from "../services/seatApi";
import { Seat } from "@/types/seat";
import { query } from "@/types/system";
import { SeatFormData } from "@/schemas/validation";

export function useGetSeats(
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

export function useUpdateSeat(seatId: string, data: Partial<Seat>) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: Seat) => seatsApi.updateSeat(seatId, data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["update seat", seatId] }),
    });
}

export function useDeleteSeat(seatId: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (seatId: string) => seatsApi.deleteSeat(seatId),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["delete seat", seatId] }),
    });
}

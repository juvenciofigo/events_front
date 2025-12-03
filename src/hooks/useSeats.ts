import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { seatsApi } from "../services/seatApi";
import { Seat } from "@/types/seat";
import { query } from "@/types/system";

export function useGetSeats(
    eventId: string,
    { limit, sort, page, searchQuery }: query
) {
    return useQuery({
        queryKey: ["seats", eventId],
        queryFn: () => seatsApi.fetchSeats(eventId, { limit, page, sort, searchQuery }),
        enabled: !!eventId
    });
}

export function useCreateSeat(eventId?: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => (
            eventId ?
                seatsApi.createSeat(eventId, data)
                : Promise.reject(new Error("missing eventId"))),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["seats", eventId] }),
    });
}

export function useUpdateSeat(seatId: string, data: Partial<Seat>) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: Seat) => seatsApi.updateSeat(seatId, data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["seats", seatId] }),
    });
}

export function useDeleteSeat(seatId: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (seatId: string) => seatsApi.deleteSeat(seatId),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["seats", seatId] }),
    });
}

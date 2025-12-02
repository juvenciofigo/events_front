import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../services/storageApi";

export function useGetSeats(eventId: string) {
    return useQuery({
        queryKey: ["seats", eventId],
        queryFn: () => api.getSeats(eventId),
        enabled: !!eventId
    });
}

export function useCreateSeat(eventId?: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => (
            eventId ?
                api.createSeat(eventId, data)
                : Promise.reject(new Error("missing eventId"))),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["seats", eventId] }),
    });
}

export function useUpdateSeat(eventId?: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ seatId, patch }: any) => (eventId ? api.updateSeat(eventId, seatId, patch) : Promise.reject(new Error("missing eventId"))),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["seats", eventId] }),
    });
}

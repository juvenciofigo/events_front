import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { guestsApi } from "../services/guestApi";

export function useGuests(
    eventId: string,
    limit: number = 10,
    pageNumber: number = 1,
    sort: string = "createdAt",
    search?: string,
    status?: string,
    ticketType?: string
) {
    return useQuery({
        queryKey: ['guests', eventId, limit, pageNumber, sort, search, status, ticketType],
        queryFn: () => guestsApi.getGuests(eventId, limit, pageNumber, sort, search, status, ticketType),
        enabled: !!eventId,
    });
}

export function useCreateGuest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ eventId, guest }: { eventId: string, guest: any }) => guestsApi.createGuest(eventId, guest),
        onSuccess: (_, { eventId }) => {
            queryClient.invalidateQueries({ queryKey: ['guests', eventId] });
        },
    });
}

export function useUpdateGuest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ eventId, guestId, guest }: { eventId: string, guestId: string, guest: any }) => guestsApi.updateGuest(eventId, guestId, guest),
        onSuccess: (_, { eventId }) => {
            queryClient.invalidateQueries({ queryKey: ['guests', eventId] });
        },
    });
}

export function useDeleteGuest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ eventId, guestId }: { eventId: string, guestId: string }) => guestsApi.deleteGuest(eventId, guestId),
        onSuccess: (_, { eventId }) => {
            queryClient.invalidateQueries({ queryKey: ['guests', eventId] });
        },
    });
}
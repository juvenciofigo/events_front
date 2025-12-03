import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { guestsApi } from "../services/guestApi";
import { query } from "@/types/system";
import { GuestCreateForm } from "@/schemas/validation";

export function useGuests(
    eventId: string,
    { limit, page, sort, searchQuery }: query


) {
    return useQuery({
        queryKey: ['guests', eventId, limit, page, sort, searchQuery],
        queryFn: () => guestsApi.getGuests(eventId, { page, limit, sort, searchQuery }),
        enabled: !!eventId,
    });
}

export function useCreateGuest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: GuestCreateForm) => guestsApi.createGuest(data),
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
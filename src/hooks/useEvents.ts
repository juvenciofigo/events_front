import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { eventsApi } from "@/services/eventsApi";
import { EventCreateForm } from "@/schemas/validation";
import { useProfileStore } from "@/stores/useProfileStore";

export function useEvent(eventId: string) {
    return useQuery({
        queryKey: ["event", eventId],
        queryFn: () => eventsApi.getEvent(eventId),
        enabled: !!eventId
    });
}

export function useCreateEvent() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: EventCreateForm) => eventsApi.createEvent(data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["events"] })
            qc.invalidateQueries({ queryKey: ["events", "upcoming-events"] })
        },
    });
}

export function useUpdateEvent(eventId: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<EventCreateForm>) => eventsApi.updateEvent(eventId, data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["events"] });
            qc.invalidateQueries({ queryKey: ["event", eventId] });
        },
    });
}
export function useUpcomingEvents() {
    const organizerProfile = useProfileStore((state) => state.organizerProfile);
    return useQuery({
        queryKey: ["events", "upcoming-events"],
        enabled: !!organizerProfile,
        queryFn: () => eventsApi.getUpcomingEvents(organizerProfile!.id),
    });
}


// export function useDeleteEvent(eventId: string) {
//     const qc = useQueryClient();
//     return useMutation({
//         mutationFn: () => eventsApi.deleteEvent(eventId),
//         onSuccess: () => {
//             qc.invalidateQueries({ queryKey: ["events"] });
//             qc.invalidateQueries({ queryKey: ["event", eventId] });
//         },
//     });
// }

export function useFetchOrganizerEvents(organizerId: string, limit: number = 10, page: number = 1, sort: string = "createdAt") {
    return useQuery({
        queryKey: ["events", "organizer", organizerId, limit, page, sort],
        enabled: !!organizerId,
        queryFn: () => eventsApi.fetchOrganizerEvents(organizerId, limit, page, sort),
        staleTime: 1000 * 60 * 1,
    });
}

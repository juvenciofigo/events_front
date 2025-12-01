import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../services/storageApi";
import { eventsApi } from "@/services/eventsApi";
import { EventCreateForm } from "@/schemas/validation";

export function useEvents() {
    return useQuery({ queryKey: ["events"], queryFn: api.getEvents });
}

export function useEvent(id?: string) {
    return useQuery({ queryKey: ["event", id], queryFn: () => (id ? api.getEvent(id) : null), enabled: !!id });
}

export function useCreateEvent() {
    const qc = useQueryClient();
    return useMutation({ 
        mutationFn: (data: EventCreateForm) => eventsApi.createEvent(data), 
        onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }) });
}

export function useUpdateEvent() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, patch }: any) => api.updateEvent(id, patch),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["events"] });
            qc.invalidateQueries({ queryKey: ["event"] });
        },
    });
}

export function useGetOrganizerEvents(organizerId: string, limit: number = 10, pageNumber: number = 1, sort: string = "createdAt,desc") {
    return useQuery({
        queryKey: ["events", "organizer", organizerId],
        enabled: !!organizerId,
        queryFn: () => eventsApi.getOrganizerEvents(organizerId, limit, pageNumber, sort),
        staleTime: 1000 * 60 * 1,
    });
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../services/storageApi";

export function useEvents() {
    return useQuery({ queryKey: ["events"], queryFn: api.getEvents });
}

export function useEvent(id?: string) {
    return useQuery({ queryKey: ["event", id], queryFn: () => (id ? api.getEvent(id) : null), enabled: !!id });
}

export function useCreateEvent() {
    const qc = useQueryClient();
    return useMutation({ mutationFn: (data: any) => api.createEvent(data), onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }) });
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

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "../services/tasksApi";
import { useProfileStore } from "@/stores/useProfileStore";

export function getTasks(eventId: string) {
    return useQuery({
        queryKey: ['tasks', eventId],
        queryFn: () => tasksApi.getTasks(eventId),
        enabled: !!eventId,
    });
}

export function createTask(eventId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (task: any) => tasksApi.createTask(eventId, task),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', eventId] });
        },
    });
}

export function updateTask(eventId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, task }: { id: string, task: any }) => tasksApi.updateTask(id, task),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', eventId] });
        },
    });
}

export function deleteTask(eventId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => tasksApi.deleteTask(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', eventId] });
        },
    });
}

export function assignTask(eventId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ taskId, memberId }: { taskId: string, memberId: string }) => tasksApi.assignTask(taskId, memberId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', eventId] });
        },
    });
}

export function useDashboardTasks() {
    const organizerProfile = useProfileStore((state) => state.organizerProfile);
    console.log(organizerProfile);
    
    return useQuery({
        queryKey: ["dashboard", "tasks", organizerProfile?.id],
        enabled: !!organizerProfile,
        queryFn: () => tasksApi.getTasksProfile("organizer", organizerProfile!.id),
        staleTime: 1000 * 60 * 2, // 2 minutos
    });
}
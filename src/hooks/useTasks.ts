import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi, CreateTaskDTO, UpdateTaskDTO } from "../services/tasksApi";

export function useTasks(eventId: string) {
    const queryClient = useQueryClient();

    const tasksQuery = useQuery({
        queryKey: ['tasks', eventId],
        queryFn: () => tasksApi.getTasks(eventId),
        enabled: !!eventId,
    });

    const createTask = useMutation({
        mutationFn: (task: CreateTaskDTO) => tasksApi.createTask(eventId, task),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', eventId] });
        },
    });

    const updateTask = useMutation({
        mutationFn: ({ id, task }: { id: string, task: UpdateTaskDTO }) => tasksApi.updateTask(id, task),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', eventId] });
        },
    });

    const deleteTask = useMutation({
        mutationFn: (id: string) => tasksApi.deleteTask(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', eventId] });
        },
    });

    const assignTask = useMutation({
        mutationFn: ({ taskId, memberId }: { taskId: string, memberId: string }) => tasksApi.assignTask(taskId, memberId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', eventId] });
        },
    });

    return {
        data: tasksQuery.data,
        isLoading: tasksQuery.isLoading,
        createTask,
        updateTask,
        deleteTask,
        assignTask,
    };
}

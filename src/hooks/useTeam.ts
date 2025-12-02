import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teamApi, CreateTeamMemberDto, UpdateTeamMemberDto } from "../services/teamApi";

export function useTeam(eventId: string) {
    const queryClient = useQueryClient();

    const teamQuery = useQuery({
        queryKey: ['team', eventId],
        queryFn: () => teamApi.getEventTeam(eventId),
        enabled: !!eventId,
    });

    const addTeamMember = useMutation({
        mutationFn: (member: CreateTeamMemberDto) => teamApi.addTeamMember(eventId, member),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['team', eventId] });
        },
    });

    const updateTeamMember = useMutation({
        mutationFn: ({ id, member }: { id: string, member: UpdateTeamMemberDto }) => teamApi.updateTeamMember(id, member),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['team', eventId] });
        },
    });

    const removeTeamMember = useMutation({
        mutationFn: (id: string) => teamApi.removeTeamMember(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['team', eventId] });
        },
    });

    const assignTaskToMember = useMutation({
        mutationFn: ({ memberId, taskId }: { memberId: string, taskId: string }) => teamApi.assignTask(memberId, { taskId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['team', eventId] });
        },
    });

    return {
        data: teamQuery.data,
        isLoading: teamQuery.isLoading,
        addTeamMember,
        updateTeamMember,
        removeTeamMember,
        assignTaskToMember,
    };
}

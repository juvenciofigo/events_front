import api from "./axiosClient";

export interface TeamMember {
    id: string;
    eventId: string;
    name: string;
    role: string;
    phone: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTeamMemberDto {
    name: string;
    role: string;
    phone: string;
    email: string;
}

export interface UpdateTeamMemberDto {
    name?: string;
    role?: string;
    phone?: string;
    email?: string;
}

export interface AssignTaskDto {
    taskId: string;
}

export const teamApi = {
    // Listar membros da equipe
    getEventTeam: async (eventId: string): Promise<TeamMember[]> => {
        try {
            const { data } = await api.get(`team/event/${eventId}`);
            return data;
        } catch (error) {
            console.error("Erro ao buscar equipe:", error);
            throw error;
        }
    },

    // Adicionar membro à equipe
    addTeamMember: async (eventId: string, member: CreateTeamMemberDto): Promise<TeamMember> => {
        try {
            const { data } = await api.post(`team/event/${eventId}`, member);
            return data;
        } catch (error) {
            console.error("Erro ao adicionar membro:", error);
            throw error;
        }
    },

    // Atualizar membro
    updateTeamMember: async (id: string, member: UpdateTeamMemberDto): Promise<TeamMember> => {
        try {
            const { data } = await api.put(`team/${id}`, member);
            return data;
        } catch (error) {
            console.error("Erro ao atualizar membro:", error);
            throw error;
        }
    },

    // Remover membro
    removeTeamMember: async (id: string): Promise<void> => {
        try {
            await api.delete(`team/${id}`);
        } catch (error) {
            console.error("Erro ao remover membro:", error);
            throw error;
        }
    },

    // Atribuir tarefa a membro
    assignTask: async (memberId: string, assignment: AssignTaskDto): Promise<any> => {
        try {
            const { data } = await api.post(`team/${memberId}/assign-task`, assignment);
            return data;
        } catch (error) {
            console.error("Erro ao atribuir tarefa:", error);
            throw error;
        }
    }
};

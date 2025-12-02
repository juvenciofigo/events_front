import api from "./axiosClient";

export interface Task {
    id: string;
    eventId: string;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    assignedTo?: string; // User ID or Team Member ID
    assignedToName?: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskDTO {
    title: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    category: string;
    assignedTo?: string;
}

export interface UpdateTaskDTO {
    title?: string;
    description?: string;
    status?: 'pending' | 'in_progress' | 'completed';
    priority?: 'low' | 'medium' | 'high';
    dueDate?: string;
    assignedTo?: string;
    category?: string;
}

export const tasksApi = {
    getTasks: async (eventId: string) => {
        const response = await api.get(`/tasks/event/${eventId}`);
        return response.data;
    },

    createTask: async (eventId: string, task: CreateTaskDTO) => {
        const response = await api.post(`/tasks/event/${eventId}`, task);
        return response.data;
    },

    updateTask: async (id: string, task: UpdateTaskDTO) => {
        const response = await api.put(`/tasks/${id}`, task);
        return response.data;
    },

    deleteTask: async (id: string) => {
        const response = await api.delete(`/tasks/${id}`);
        return response.data;
    },

    assignTask: async (taskId: string, userId: string) => {
        const response = await api.post(`/tasks/${taskId}/assign`, { userId });
        return response.data;
    }
};

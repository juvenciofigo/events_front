import { PageTask, Task } from "@/types/tasks";
import api from "./axiosClient";



export const tasksApi = {
    getTasks: async (eventId: string): Promise<PageTask> => {
        try {
            const response = await api.get(`/tasks/event/${eventId}`);
            return response.data;
        } catch (error) {
            throw error;
        }

    },

    createTask: async (eventId: string, task: any): Promise<Task> => {
        try {

            const response = await api.post(`/tasks/event/${eventId}`, task);
            return response.data
        } catch (error) {
            throw error;
        }
        ;
    },

    updateTask: async (id: string, task: any) => {
        try {
            console.log(task);

            const response = await api.put(`/tasks/${id}`, task);
            return response.data;
        } catch (error) {
            throw error;
        }

    },

    deleteTask: async (id: string) => {
        try {
            const response = await api.delete(`/tasks/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }

    },

    assignTask: async (taskId: string, userId: string) => {
        try {
            const response = await api.post(`/tasks/${taskId}/assign`, { userId });
            return response.data;
        } catch (error) {
            throw error;
        }

    }
};

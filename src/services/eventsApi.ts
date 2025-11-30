import { PageEvent } from "@/types/events";
import api from "./axiosClient";

export const eventsApi = {
    getOrganizerEvents: async (organizerId: string, limit: number = 10, pageNumber: number = 1, sort: string = "createdAt,desc"): Promise<PageEvent> => {
        try {
            const { data } = await api.get(`events/organizer/${organizerId}?limit=${limit}&pageNumber=${pageNumber}&sort=${sort}`);
            return data;
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
            throw error;
        }
    }
}
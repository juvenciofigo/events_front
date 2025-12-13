import { Event, PageEvent } from "@/types/events";
import api from "./axiosClient";
import { EventCreateForm } from "@/schemas/validation";
import { UpcomingEvent } from "@/types/dashboard";

export const eventsApi = {
    getEvent: async (eventId: string): Promise<Event> => {
        try {
            const { data } = await api.get(`events/${eventId}`);

            return data;
        } catch (error) {
            console.error("Erro ao buscar evento:", error);
            throw error;
        }
    },

    fetchOrganizerEvents: async (organizerId: string, limit: number = 10, page: number = 1, sort: string = "createdAt"): Promise<PageEvent> => {
        try {
            const { data } = await api.get(`events/organizer/${organizerId}?limit=${limit}&page=${page}&sort=${sort}`);
            return data;
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
            throw error;
        }
    },

    createEvent: async (event: EventCreateForm): Promise<Event> => {
        try {
            if (event.image && event.image.length > 0) {
                const formData = new FormData();

                const { image, ...eventDataWithoutFile } = event;

                // Convertendo o JSON para string
                formData.append("data", JSON.stringify(eventDataWithoutFile));

                // Adicionando o arquivo
                formData.append("file", event.image[0]);

                const { data } = await api.post("events", formData);
                return data;

            } else {
                // Enviar JSON puro quando não tem imagem
                const { data } = await api.post("events", event);
                return data;
            }
        } catch (error) {
            console.error("Erro ao criar evento:", error);
            throw error;
        }
    },

    updateEvent: async (eventId: string, event: Partial<EventCreateForm>): Promise<Event> => {
        try {
            const { data } = await api.put(`events/${eventId}`, event);
            return data;
        } catch (error) {
            console.error("Erro ao atualizar evento:", error);
            throw error;
        }
    },

    // Get upcoming events
    getUpcomingEvents: async (organizerId: string): Promise<UpcomingEvent[]> => {
        try {
            const { data } = await api.get(`events/organizer/${organizerId}?upcoming=true`);
            return data;
        } catch (error) {
            console.error("Erro ao buscar eventos futuros:", error);

            throw error;
        }
    },
}
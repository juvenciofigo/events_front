import { Event, PageEvent } from "@/types/events";
import api from "./axiosClient";
import { EventCreateForm } from "@/schemas/validation";

export const eventsApi = {
    getEvent: async (eventId: string) => {
        try {
            const { data } = await api.get(`events/${eventId}`);
            return data;
        } catch (error) {
            console.error("Erro ao buscar evento:", error);
            throw error;
        }
    },

    fetchOrganizerEvents: async (organizerId: string, limit: number = 10, pageNumber: number = 1, sort: string = "createdAt"): Promise<PageEvent> => {
        try {
            const { data } = await api.get(`events/organizer/${organizerId}?limit=${limit}&pageNumber=${pageNumber}&sort=${sort}`);
            console.log(data);

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
    }
}
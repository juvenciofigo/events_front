import { PageTicket, Ticket } from "@/types/ticket";
import api from "./axiosClient";

export const ticketsApi = {
    // Get tickets for a specific event
    getEventTickets: async (eventId: string, page: number = 1, limit: number = 10): Promise<PageTicket> => {
        try {
            const { data } = await api.get(`tickets/event/${eventId}?page=${page}&limit=${limit}`);
            return data;
        } catch (error) {
            console.error("Erro ao buscar tickets do evento:", error);
            throw error;
        }
    },

    // Get ticket statistics for an event
    getTicketStats: async (eventId: string) => {
        try {
            const { data } = await api.get(`tickets/event/${eventId}/stats`);
            return data;
        } catch (error) {
            console.error("Erro ao buscar estatísticas de tickets:", error);
            throw error;
        }
    },

    // Get a single ticket by ID
    getTicket: async (ticketId: string): Promise<Ticket> => {
        try {
            const { data } = await api.get(`tickets/${ticketId}`);
            return data;
        } catch (error) {
            console.error("Erro ao buscar ticket:", error);
            throw error;
        }
    },

    // Create a new ticket
    createTicket: async (ticketData: Partial<Ticket>): Promise<Ticket> => {
        try {
            const { data } = await api.post("tickets", ticketData);
            return data;
        } catch (error) {
            console.error("Erro ao criar ticket:", error);
            throw error;
        }
    },

    // Update ticket
    updateTicket: async (ticketId: string, ticketData: Partial<Ticket>): Promise<Ticket> => {
        try {
            const { data } = await api.put(`tickets/${ticketId}`, ticketData);
            return data;
        } catch (error) {
            console.error("Erro ao atualizar ticket:", error);
            throw error;
        }
    },

    // Delete ticket
    deleteTicket: async (ticketId: string): Promise<void> => {
        try {
            await api.delete(`tickets/${ticketId}`);
        } catch (error) {
            console.error("Erro ao deletar ticket:", error);
            throw error;
        }
    },

    // Validate ticket
    validateTicket: async (ticketId: string): Promise<Ticket> => {
        try {
            const { data } = await api.post(`tickets/${ticketId}/validate`);
            return data;
        } catch (error) {
            console.error("Erro ao validar ticket:", error);
            throw error;
        }
    }
};

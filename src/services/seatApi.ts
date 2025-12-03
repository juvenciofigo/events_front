import { PageSeat, Seat } from "@/types/seat";
import api from "./axiosClient";
import { query } from "@/types/system";



export const seatsApi = {

    fetchSeats: async (eventId: string, { page, limit, sort, searchQuery }: query): Promise<PageSeat> => {
        try {
            const { data } = await api.get(`/seats/event/${eventId}?limit=${limit}&page=${page}&sort=${sort}&search=${searchQuery}`);
            return data;
        } catch (error) {
            console.error("Erro ao buscar evento:", error);
            throw error;
        }
    },

    createSeat: async (eventId: string, seat: Omit<Seat, "id">): Promise<Seat> => {
        try {
            const { data } = await api.put(`/seats/event/${eventId}`, seat);
            return data;
        } catch (error) {
            console.error("Erro ao criar assento:", error);
            throw error;
        }
    },

    updateSeat: async (seatId: string, patch: Partial<Seat>): Promise<Seat> => {
        try {
            const { data } = await api.put(`/seats/${seatId}`, patch);
            return data;
        } catch (error) {
            console.error("Erro ao editar assento:", error);
            throw error;
        }
    },

    deleteSeat: async (seatId: string): Promise<PageSeat> => {
        try {
            const { data } = await api.delete(`/seats/${seatId}`);
            return data;
        } catch (error) {
            console.error("Erro ao deletar assento:", error);
            throw error;
        }
    }

}
import api from "./axiosClient";
import { FinancialStats, PageTransaction, Transaction } from "../types/finance";


export const financialApi = {
    getEventFinancialStats: async (eventId: string): Promise<FinancialStats> => {
        try {
            const { data } = await api.get(`/financial/events/${eventId}/stats`);
            console.log(data);

            return data;
        } catch (error) {
            console.error('Erro ao buscar estatísticas financeiras:', error);
            throw error;
        }
    },

    getTransactions: async (eventId: string, limit: number = 10, page: number = 1): Promise<PageTransaction> => {
        try {
            const { data } = await api.get(`/financial/events/${eventId}/transactions?limit=${limit}&page=${page}`);
            console.log(data);
            return data;
        } catch (error) {
            console.error('Erro ao buscar transações:', error);
            throw error;
        }
    }
};

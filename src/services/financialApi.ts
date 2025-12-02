import api from "./axiosClient";

export interface FinancialStats {
    totalRevenue: number;
    netRevenue: number;
    totalFees: number;
    totalDiscounts: number;
    revenueByTicketType: {
        ticketType: string;
        revenue: number;
        quantity: number;
    }[];
    revenueByPaymentMethod: {
        method: string;
        revenue: number;
        count: number;
    }[];
    recentTransactions: {
        id: string;
        date: string;
        customerName: string;
        ticketType: string;
        amount: number;
        method: string;
        status: 'approved' | 'pending' | 'failed';
    }[];
}

export const financialApi = {
    getEventFinancialStats: async (eventId: string): Promise<FinancialStats> => {
        const response = await api.get(`/financial/event/${eventId}/stats`);
        return response.data;
    },

    getTransactions: async (eventId: string, limit: number = 10, page: number = 1) => {
        const response = await api.get(`/financial/event/${eventId}/transactions?limit=${limit}&page=${page}`);
        return response.data;
    }
};

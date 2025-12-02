import api from "./axiosClient";

export interface Expense {
    id: string;
    eventId: string;
    description: string;
    amount: number;
    category: string;
    dueDate: string;
    status: 'pending' | 'paid' | 'overdue';
    paymentDate?: string;
    paymentMethod?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateExpenseDTO {
    description: string;
    amount: number;
    category: string;
    dueDate: string;
    status?: 'pending' | 'paid';
}

export interface PayExpenseDTO {
    paymentDate: string;
    method: string;
}

export const expensesApi = {
    getExpenses: async (eventId: string) => {
        const response = await api.get(`/expenses/event/${eventId}`);
        return response.data;
    },

    getExpensesSummary: async (eventId: string) => {
        const response = await api.get(`/expenses/event/${eventId}/summary`);
        return response.data;
    },

    createExpense: async (eventId: string, expense: CreateExpenseDTO) => {
        const response = await api.post(`/expenses/event/${eventId}`, expense);
        return response.data;
    },

    updateExpense: async (id: string, expense: Partial<CreateExpenseDTO>) => {
        const response = await api.put(`/expenses/${id}`, expense);
        return response.data;
    },

    deleteExpense: async (id: string) => {
        const response = await api.delete(`/expenses/${id}`);
        return response.data;
    },

    payExpense: async (id: string, payment: PayExpenseDTO) => {
        const response = await api.post(`/expenses/${id}/pay`, payment);
        return response.data;
    }
};

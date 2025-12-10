import { ExpenseCreateForm } from "@/schemas/validation";
import api from "./axiosClient";
import { Expense, ExpensesSummary, PageExpense } from "@/types/expense";

export const expensesApi = {
    getExpenses: async (eventId: string): Promise<PageExpense> => {
        try {
            const response = await api.get(`/expenses/event/${eventId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getExpensesSummary: async (eventId: string): Promise<ExpensesSummary> => {
        try {
            const response = await api.get(`/expenses/events/${eventId}/summary`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createExpense: async (expense: ExpenseCreateForm, eventId: string): Promise<Expense> => {
        try {
            const response = await api.post(`/expenses/event/${eventId}`, expense);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateExpense: async (id: string, expense: Partial<ExpenseCreateForm>) => {
        console.log(expense);

        try {
            const response = await api.put(`/expenses/${id}`, expense);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteExpense: async (id: string) => {
        try {
            const response = await api.delete(`/expenses/${id}`);
            return response.data;
        } catch (error) {
            console.log(error)
            throw error;
        }

    },
};

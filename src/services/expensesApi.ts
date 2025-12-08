import { ExpenseCreateForm, ExpenseStatus, Priority } from "@/schemas/validation";
import api from "./axiosClient";
import { Expense, PageExpense } from "@/types/expense";
import { PaymentStatus } from "@/types/system";



// export interface CreateExpenseDTO {
//     eventId: string;
//     description: string;
//     amount: number;
//     category: string;
//     dueDate: string;
//     status?: 'pending' | 'paid';
// }

export interface PayExpenseDTO {
    paymentDate: string;
    method: string;
}

export const expensesApi = {
    getExpenses: async (eventId: string): Promise<PageExpense> => {
        try {
            const response = await api.get(`/expenses/event/${eventId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getExpensesSummary: async (eventId: string) => {
        try {
            const response = await api.get(`/expenses/event/${eventId}/summary`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createExpense: async (expense: ExpenseCreateForm, eventId: string): Promise<Expense> => {
        console.log(expense);

        try {
            const response = await api.post(`/expenses/event/${eventId}`, expense);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateExpense: async (id: string, expense: Partial<ExpenseCreateForm>) => {
        expense.paymentStatus = expense.paymentStatus?.toString() as PaymentStatus;
        expense.priority = expense.priority?.toString() as Priority;
        expense.status = expense.status?.toString() as ExpenseStatus;
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

    payExpense: async (id: string, payment: PayExpenseDTO) => {
        try {
            const response = await api.post(`/expenses/${id}/pay`, payment);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

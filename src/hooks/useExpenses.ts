import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { expensesApi, PayExpenseDTO } from "../services/expensesApi";
import { ExpenseCreateForm } from "@/schemas/validation";
import { useToast } from "@/contexts/ToastContext";

export function getExpenses(eventId: string) {
    return useQuery({
        queryKey: ['expenses', eventId],
        queryFn: () => expensesApi.getExpenses(eventId),
        enabled: !!eventId,
    });
}

export function getExpensesSummary(eventId: string) {
    return useQuery({
        queryKey: ['expenses-summary', eventId],
        queryFn: () => expensesApi.getExpensesSummary(eventId),
        enabled: !!eventId,
    });
}

export function useCreateExpense(eventId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data, eventId }: { data: ExpenseCreateForm, eventId: string }) => expensesApi.createExpense(data, eventId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses', eventId] });
            queryClient.invalidateQueries({ queryKey: ['expenses-summary', eventId] });
        },
    });
}

export function updateExpense(eventId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, expense }: { id: string, expense: ExpenseCreateForm }) => expensesApi.updateExpense(id, expense),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses', eventId] });
            queryClient.invalidateQueries({ queryKey: ['expenses-summary', eventId] });
        },
    });
}

export function deleteExpense(eventId: string) {
    const { error } = useToast()
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => expensesApi.deleteExpense(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses', eventId] });
            queryClient.invalidateQueries({ queryKey: ['expenses-summary', eventId] });
        },
    });
}


export function payExpense(eventId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payment }: { id: string, payment: PayExpenseDTO }) => expensesApi.payExpense(id, payment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses', eventId] });
            queryClient.invalidateQueries({ queryKey: ['expenses-summary', eventId] });
        },
    });
}

//     return {
//         expenses: expensesQuery.data,
//         isLoading: expensesQuery.isLoading || summaryQuery.isLoading,
//         summary: summaryQuery.data,
//         createExpense,
//         updateExpense,
//         deleteExpense,
//         payExpense,
//     };
// }

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { expensesApi, CreateExpenseDTO, PayExpenseDTO } from "../services/expensesApi";

export function useExpenses(eventId: string) {
    const queryClient = useQueryClient();

    const expensesQuery = useQuery({
        queryKey: ['expenses', eventId],
        queryFn: () => expensesApi.getExpenses(eventId),
        enabled: !!eventId,
    });

    const summaryQuery = useQuery({
        queryKey: ['expenses-summary', eventId],
        queryFn: () => expensesApi.getExpensesSummary(eventId),
        enabled: !!eventId,
    });

    const createExpense = useMutation({
        mutationFn: (expense: CreateExpenseDTO) => expensesApi.createExpense(eventId, expense),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses', eventId] });
            queryClient.invalidateQueries({ queryKey: ['expenses-summary', eventId] });
        },
    });

    const updateExpense = useMutation({
        mutationFn: ({ id, expense }: { id: string, expense: Partial<CreateExpenseDTO> }) => expensesApi.updateExpense(id, expense),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses', eventId] });
            queryClient.invalidateQueries({ queryKey: ['expenses-summary', eventId] });
        },
    });

    const deleteExpense = useMutation({
        mutationFn: (id: string) => expensesApi.deleteExpense(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses', eventId] });
            queryClient.invalidateQueries({ queryKey: ['expenses-summary', eventId] });
        },
    });

    const payExpense = useMutation({
        mutationFn: ({ id, payment }: { id: string, payment: PayExpenseDTO }) => expensesApi.payExpense(id, payment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses', eventId] });
            queryClient.invalidateQueries({ queryKey: ['expenses-summary', eventId] });
        },
    });

    return {
        expenses: expensesQuery.data,
        isLoading: expensesQuery.isLoading || summaryQuery.isLoading,
        summary: summaryQuery.data,
        createExpense,
        updateExpense,
        deleteExpense,
        payExpense,
    };
}

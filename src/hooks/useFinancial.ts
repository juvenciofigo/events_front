import { useQuery } from "@tanstack/react-query";
import { financialApi } from "../services/financialApi";

export function useFinancialStats(eventId: string) {
    return useQuery({
        queryKey: ['financial-stats', eventId],
        queryFn: () => financialApi.getEventFinancialStats(eventId),
        enabled: !!eventId,
    });
}

export function useTransactions(eventId: string, limit: number = 10, page: number = 1) {
    return useQuery({
        queryKey: ['transactions', eventId, limit, page],
        queryFn: () => financialApi.getTransactions(eventId, limit, page),
        enabled: !!eventId,
    });
}

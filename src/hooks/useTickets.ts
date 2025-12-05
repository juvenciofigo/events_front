import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ticketsApi } from "@/services/ticketsApi";
import { Ticket } from "@/types/ticket";

// Get tickets for an event
export const useEventTickets = (eventId: string, page: number = 1, limit: number = 10) => {
    return useQuery({
        queryKey: ["tickets", "event", eventId, page, limit],
        queryFn: () => ticketsApi.getEventTickets(eventId, page, limit),
        enabled: !!eventId,
    });
};

// Get ticket statistics
export const useTicketStats = (eventId: string) => {
    return useQuery({
        queryKey: ["tickets", "stats", eventId],
        queryFn: () => ticketsApi.getTicketStats(eventId),
        enabled: !!eventId,
    });
};

// Get single ticket
export const useTicket = (ticketId: string) => {
    return useQuery({
        queryKey: ["tickets", ticketId],
        queryFn: () => ticketsApi.getTicket(ticketId),
        enabled: !!ticketId,
    });
};

// Create ticket
export const useCreateTicket = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (ticketData: Partial<Ticket>) => ticketsApi.createTicket(ticketData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
        },
    });
};

// Update ticket
export const useUpdateTicket = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ ticketId, ticketData }: { ticketId: string; ticketData: Partial<Ticket> }) =>
            ticketsApi.updateTicket(ticketId, ticketData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
        },
    });
};

// Delete ticket
export const useDeleteTicket = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (ticketId: string) => ticketsApi.deleteTicket(ticketId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
        },
    });
};

// Validate ticket
export const useValidateTicket = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (ticketId: string) => ticketsApi.validateTicket(ticketId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
        },
    });
};

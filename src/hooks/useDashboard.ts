import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../services/dashboardApi";
import { useProfileStore } from "@/stores/useProfileStore";

/**
 * Hook para buscar estatísticas do dashboard do organizador
 */




export function useDashboardStats() {
    const organizerProfile = useProfileStore((state) => state.organizerProfile);

    return useQuery({
        queryKey: ["dashboard", "stats"],
        enabled: !!organizerProfile,
        queryFn: async () => {
            const data = await dashboardApi.getStats(organizerProfile!.id)
            return data
        },
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
}

/**
 * Hook para buscar dados do gráfico de vendas
 */
export function useSalesChart() {
    const organizerProfile = useProfileStore((state) => state.organizerProfile);
    return useQuery({
        queryKey: ["dashboard", "sales"],
        enabled: !!organizerProfile,
        queryFn: () => dashboardApi.getSalesChart(organizerProfile!.id),
        staleTime: 1000 * 60 * 5,
    });
}

/**
 * Hook para buscar tarefas do organizador
 */
export function useDashboardTasks() {
    const organizerProfile = useProfileStore((state) => state.organizerProfile);
    return useQuery({
        queryKey: ["dashboard", "tasks"],
        enabled: !!organizerProfile,
        queryFn: () => dashboardApi.getTasks(organizerProfile!.id),
        staleTime: 1000 * 60 * 2, // 2 minutos
    });
}

/**
 * Hook para buscar atividades recentes
 */
// export function useDashboardActivity(limit: number = 5) {
//     return useQuery({
//         queryKey: ["dashboard", "activity", limit],
//         queryFn: () => dashboardApi.getActivity(limit),
//         staleTime: 1000 * 60 * 1, // 1 minuto
//     });
// }

/**
 * Hook para buscar próximos eventos
 */
export function useUpcomingEvents() {
    const organizerProfile = useProfileStore((state) => state.organizerProfile);
    return useQuery({
        queryKey: ["dashboard", "upcoming-events"],
        enabled: !!organizerProfile,
        queryFn: () => dashboardApi.getUpcomingEvents(organizerProfile!.id),
        staleTime: 1000 * 60 * 5,
    });
}

/**
 * Hook para buscar fornecedores contratados
 */
// export function useDashboardSuppliers() {
//     return useQuery({
//         queryKey: ["dashboard", "suppliers"],
//         queryFn: dashboardApi.getSuppliers,
//         staleTime: 1000 * 60 * 5,
//     });
// }

/**
 * Hook para buscar mensagens recentes
 */
export function useDashboardMessages(limit: number = 3) {
    const organizerProfile = useProfileStore((state) => state.organizerProfile);
    return useQuery({
        queryKey: ["dashboard", "messages", limit],
        enabled: !!organizerProfile,
        queryFn: () => dashboardApi.getMessages(organizerProfile!.id, limit),
        staleTime: 1000 * 60 * 1, // 1 minuto
    });
}

/**
 * Hook para buscar dados financeiros
 */
// export function useDashboardFinancial() {
//     return useQuery({
//         queryKey: ["dashboard", "financial"],
//         queryFn: dashboardApi.getFinancialData,
//         staleTime: 1000 * 60 * 5,
//     });
// }

/**
 * Hook para buscar feedback/avaliações recentes
 */
export function useDashboardFeedback(limit: number = 2) {
    const organizerProfile = useProfileStore((state) => state.organizerProfile);
    return useQuery({
        queryKey: ["dashboard", "feedback", limit],
        enabled: !!organizerProfile,
        queryFn: () => dashboardApi.getFeedback("organizer", organizerProfile!.id, limit),
        staleTime: 1000 * 60 * 5,
    });
}

/**
 * Hook para buscar lista de espera
 */
// export function useDashboardWaitList() {
//     return useQuery({
//         queryKey: ["dashboard", "waitList"],
//         queryFn: dashboardApi.getWaitList,
//         staleTime: 1000 * 60 * 2,
//     });
// }

/**
 * Hook para buscar alertas do dashboard
 */
// export function useDashboardAlerts() {
//     return useQuery({
//         queryKey: ["dashboard", "alerts"],
//         queryFn: dashboardApi.getAlerts,
//         staleTime: 1000 * 60 * 1, // 1 minuto
//     });
// }

/**
 * Hook agregado que busca todos os dados do dashboard de uma vez
 * Útil para carregar o dashboard completo
 */
export function useDashboardData() {
    const stats = useDashboardStats();
    const salesChart = useSalesChart();
    const tasks = useDashboardTasks();
    // const activity = useDashboardActivity();
    const upcomingEvents = useUpcomingEvents();
    // const suppliers = useDashboardSuppliers();
    const messages = useDashboardMessages();
    // const financial = useDashboardFinancial();
    const feedback = useDashboardFeedback();
    // const waitList = useDashboardWaitList();
    // const alerts = useDashboardAlerts();

    return {
        stats,
        salesChart,
        tasks,
        // activity,
        upcomingEvents,
        // suppliers,
        messages,
        // financial,
        feedback,
        // waitList,
        // alerts,
        // Helper para verificar se está carregando
        isLoading: stats.isLoading || salesChart.isLoading || tasks.isLoading,
        // Helper para verificar se há erro
        hasError: stats.isError || salesChart.isError || tasks.isError,
        error: stats.error || salesChart.error || tasks.error,
    };
}

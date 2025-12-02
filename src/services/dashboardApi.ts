import {
    Activity,
    Alert,
    DashboardStats,
    Feedback,
    FinancialData,
    Message,
    SalesChartData,
    Supplier,
    Task,
    UpcomingEvent,
    WaitListPerson,
} from "@/types/dashboard";
import api from "./axiosClient";



// API Calls
export const dashboardApi = {

    // Get dashboard stats
    getStats: async (organizerId: string): Promise<DashboardStats> => {
        try {
            const { data } = await api.get(`organizers/${organizerId}/stats`);
            return data;
        } catch (error) {
            console.error("Erro ao buscar estatísticas do dashboard:", error);
            throw error;
        }
    },

    // Get sales chart data
    getSalesChart: async (organizerId: string): Promise<SalesChartData[]> => {
        try {
            const { data } = await api.get(`organizers/${organizerId}/sales`);
            return data;
        } catch (error) {
            console.error("Erro ao buscar dados do gráfico de vendas:", error);

            throw error;
        }
    },

    // Get tasks
    getTasks: async (organizerId: string): Promise<Task[]> => {
        try {
            const { data } = await api.get(`organizers/${organizerId}/tasks`);
            return data;
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);

            throw error;
        }
    },

    // Get recent activity
    // getActivity: async (limit: number = 5): Promise<Activity[]> => {
    //     const { data } = await api.get(`organizers/activity?limit=${limit}`); // ❌
    //     return data;
    // },

    // Get upcoming events
    getUpcomingEvents: async (organizerId: string): Promise<UpcomingEvent[]> => {
        try {
            const { data } = await api.get(`events/organizer/${organizerId}?upcoming=true`);
            return data;
        } catch (error) {
            console.error("Erro ao buscar eventos futuros:", error);

            throw error;
        }
    },

    // Get suppliers
    // getSuppliers: async (): Promise<Supplier[]> => {
    //     const { data } = await api.get("suppliers/contracted"); // ❌
    //     return data;
    // },

    // Get messages
    getMessages: async (organizerId: string, limit: number = 10): Promise<Message[]> => {
        try {
            const { data } = await api.get(`chats/messages/${organizerId}?limit=${limit}`);
            return data;
        } catch (error) {
            console.error("Erro ao buscar mensagens:", error);

            throw error;
        }
    },

    // Get financial data
    // getFinancialData: async (): Promise<FinancialData> => {
    //     const { data } = await api.get("organizers/financial"); // ❌
    //     return data;
    // },

    // Get feedback
    getFeedback: async (target: string, targetId: string, limit: number = 10): Promise<Feedback[]> => {
        try {
            const { data } = await api.get(`/reviews?target=${target}&targetId=${targetId}&limit=${limit}`);
            console.log(data);
            

            return data?.items;
        } catch (error) {
            console.error("Erro ao buscar feedback:", error);

            throw error;
        }
    },

    // Get waitList
    // getWaitList: async (): Promise<WaitListPerson[]> => {
    //     const { data } = await api.get("organizers/waitList/summary"); // ❌
    //     return data;
    // },

    // Get alerts
    // getAlerts: async (): Promise<Alert[]> => {
    //     const { data } = await api.get("organizers/alerts"); // ❌
    //     return data;
    // },
};

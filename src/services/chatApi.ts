import api from "./axiosClient";
import { Chat, Message } from "../types/chats";

export const chatApi = {
    getChats: async (profile: string, profileId: string, eventId?: string): Promise<Chat[]> => {
        const eventIdParam = eventId ? `&eventId=${eventId}` : '';
        console.log(profile);
        
        try {
            const { data } = await api.get(`chats/${profile}?profileId=${profileId}${eventIdParam}`);
            return data;
        } catch (error) {
            console.error("Erro ao buscar chats:", error);
            throw error;
        }
    },

    getMessages: async (chatId: string, profileId:string): Promise<Message[]> => {
        try {
            const { data } = await api.get(`chats/${chatId}/messages/${profileId}`);
            console.log(data);
            
            return data;
        } catch (error) {
            console.error("Erro ao buscar mensagens:", error);
            throw error;
        }
    },

    sendMessage: async (chatId: string, message: string): Promise<void> => {
        try {
            await api.post(`chats/${chatId}`, { message });
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
            throw error;
        }
    },
}
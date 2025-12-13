import { useQuery, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "@/services/chatApi";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Message } from "@/types/chats";

export function getChats(eventId?: string) {
    const selectedProfile = useAuthStore((state) => state.selectedProfile);

    return useQuery({
        enabled: !!selectedProfile,
        queryKey: ["chats", selectedProfile!.id],
        queryFn: () => chatApi.getChats(selectedProfile!.role!, selectedProfile!.id, eventId),
    });
}

export function useChatMessages(chatId: string) {
    const selectedProfile = useAuthStore((state) => state.selectedProfile);

    return useQuery({
        enabled: !!selectedProfile,
        queryKey: ["messages", chatId],
        queryFn: () => chatApi.getMessages(chatId, selectedProfile!.id),
    });
}



export const useChat = (chatIds: string[] = []) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        // Avoid connecting if there are no chats to subscribe to (optional, depending on requirements)
        // If we want to receive global messages, we might still connect.
        // For now, we proceed as normal but knowing we loop over chatIds.

        const socket = new SockJS('http://localhost:8080/events-livechat');
        const client = new Client({
            webSocketFactory: () => socket,
            debug: (str) => {
                // console.log(str);
            },
            onConnect: () => {
                // console.log('Connected to WebSocket');

                // Subscribe to each chat ID
                chatIds.forEach((chatId) => {
                    client.subscribe(`/topic/chat/${chatId}`, (message) => {
                        if (message.body) {
                            // Assuming message body is a single message or list, let's treat it as single for specific topics typically
                            // But keeping logical consistency with previous code which handled a list
                            const parsed = JSON.parse(message.body);
                            const incoming = Array.isArray(parsed) ? parsed : [parsed];
                            const newMessages = incoming.map(msg => ({ ...msg, chatId }));
                            setMessages((prev) => [...prev, ...newMessages]);
                        }
                    });
                });
            },
            onStompError: (frame) => {
                // console.error('Broker reported error: ' + frame.headers['message']);
                // console.error('Additional details: ' + frame.body);
            },
        });

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, [JSON.stringify(chatIds)]); // Re-run if chatIds list changes (using stringify for deep comparison check)

    // Function to send a private message (CreateChat)
    const sendMessage = (content: string, senderId: string, role: string, chatId?: string) => {

        if (clientRef.current && clientRef.current.connected) {
            const payload = {
                content: content,
                senderId: senderId,
                senderRole: role,
                chatId: chatId // Make sure backend handles this
                // other fields required by MessageDTO.Request
            };

            clientRef.current.publish({
                destination: '/app/new-message', // Matches @MessageMapping("/new-message")
                body: JSON.stringify(payload),
            });
        }
    };

    // Function to create a new chat/room
    const createChat = (data: any) => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination: '/app/new-chat', // Matches @MessageMapping("/new-chat")
                body: JSON.stringify(data),
            });
        }
    }
    return { messages, sendMessage, createChat };
};

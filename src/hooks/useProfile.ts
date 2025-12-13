import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as profileApi from "../services/profileApi";
import { organizerProfile, supplierProfile } from "../stores/useProfileStore";
import { OrganizerForm } from "@/pages/auth/RegisterOrganizer";
import { useAuthStore } from "@/stores/useAuthStore";
import { useProfileStore } from "@/stores/useProfileStore";
import { SupplierForm } from "@/pages/auth/RegisterSupplier";

import { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Message } from "@/types/chats";

export function useOrganizerRegister() {
    const qc = useQueryClient();
    return useMutation<any, Error, OrganizerForm>({
        mutationFn: profileApi.organizerRegisterApi,
        onSuccess: (data: organizerProfile) => {
            useAuthStore.getState().addProfile("organizer", data.id);
            useAuthStore.getState().setSelectedProfile({ id: data.id, role: "organizer" });
            qc.invalidateQueries();
        },
    });
}

export function useSupplierRegister() {
    const qc = useQueryClient();
    return useMutation<any, Error, SupplierForm>({
        mutationFn: profileApi.supplierRegisterApi,
        onSuccess: (data: supplierProfile) => {
            useAuthStore.getState().addProfile("supplier", data.id);
            useAuthStore.getState().setSelectedProfile({ id: data.id, role: "supplier" });
            qc.invalidateQueries();
        },
    });
}


// Hook genérico que retorna o tipo correto baseado no role
// export function useGetProfile() {
//     const selectedProfile = useAuthStore((state) => state.selectedProfile);

//     return useQuery<organizerProfile | supplierProfile, Error>({
//         queryKey: ["profile", selectedProfile?.role, selectedProfile?.id],
//         enabled: Boolean(selectedProfile?.id),

//         queryFn: async () => {
//             // This should never happen due to enabled check, but TypeScript needs it
//             if (!selectedProfile) {
//                 throw new Error("No selected profile");
//             }

//             return profileApi.getProfileApi({
//                 role: selectedProfile.role,
//                 id: selectedProfile.id,
//             });
//         },
//     });
// }

// Hook específico para perfil de organizador
export function useGetOrganizerProfile() {
    const selectedProfile = useAuthStore((state) => state.selectedProfile);

    return useQuery<organizerProfile, Error>({
        queryKey: ["profile", "organizer", selectedProfile?.id],
        enabled: Boolean(selectedProfile?.id && selectedProfile?.role === "organizer"),

        queryFn: async () => {
            if (!selectedProfile || selectedProfile.role !== "organizer") {
                throw new Error("No organizer profile selected");
            }

            const data = await profileApi.getProfileApi({
                role: "organizer",
                id: selectedProfile.id,
            }) as organizerProfile;

            useProfileStore.getState().setOrganizerProfile(data);
            return data
        },
    });
}

// Hook específico para perfil de fornecedor
export function useGetSupplierProfile() {
    const selectedProfile = useAuthStore((state) => state.selectedProfile);

    return useQuery<supplierProfile, any>({
        queryKey: ["profile", "supplier", selectedProfile?.id],
        enabled: Boolean(selectedProfile?.id && selectedProfile?.role === "supplier"),

        queryFn: async () => {
            if (!selectedProfile || selectedProfile.role !== "supplier") {
                throw new Error("No supplier profile selected");
            }

            const data = await profileApi.getProfileApi({
                role: "supplier",
                id: selectedProfile.id,
            }) as supplierProfile;

            useProfileStore.getState().setSupplierProfile(data);
            return data
        },
    });
}


interface PresenceStatus {
    userId: string;
    status: "online" | "offline";
}

export const usePresenceProfile = () => {
    const selectedProfile = useAuthStore((state) => state.selectedProfile);
    const [status, setStatus] = useState<"online" | "offline">("offline");
    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        if (!selectedProfile) return;

        const socket = new SockJS("http://localhost:8080/events-livechat");

        const client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                userId: selectedProfile.id, // <-- ESSENCIAL
            },
            debug: () => { },
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("WS conectado para presence:", selectedProfile.id);

                // Inscreve no canal de presença deste usuário

                client.subscribe(`/topic/presence/${selectedProfile.id}`, (msg) => {
                    const data: PresenceStatus = JSON.parse(msg.body);
                    setStatus(data.status);
                });
            },
            onStompError: (frame) => {
                console.error("Erro STOMP:", frame.headers["message"]);
            },
        });

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, [selectedProfile]);

    return { status };
};

export const usePresenceListener = (targetUserId?: string, initialStatus: string = "offline") => {
    const [status, setStatus] = useState<string>(initialStatus);
    const clientRef = useRef<Client | null>(null);

    // Update local status if initialStatus changes (e.g. from a fresh fetch)
    useEffect(() => {
        setStatus(initialStatus);
    }, [initialStatus]);

    useEffect(() => {
        if (!targetUserId) return;

        const socket = new SockJS("http://localhost:8080/events-livechat");

        const client = new Client({
            webSocketFactory: () => socket,
            // We don't necessarily need to identify *ourselves* to listen, 
            // but usually auth is required. Assuming anonymous or same session cookie works,
            // or if we rely on the backend allowing subscription.
            // If explicit auth is needed, we might need to pass headers.
            // For now, mirroring usePresenceProfile but purely for listening.
            debug: () => { },
            reconnectDelay: 5000,
            onConnect: () => {
                // Subscribe to the target user's presence topic
                client.subscribe(`/topic/presence/${targetUserId}`, (msg) => {
                    const data: { status: string } = JSON.parse(msg.body);
                    setStatus(data.status);
                });
            }
        });

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, [targetUserId]);

    return status;
};
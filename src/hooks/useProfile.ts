import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as profileApi from "../services/profileApi";
import { organizerProfile, supplierProfile } from "../stores/useProfileStore";
import { OrganizerForm } from "@/pages/auth/RegisterOrganizer";
import { useAuthStore } from "@/stores/useAuthStore";
import { useProfileStore } from "@/stores/useProfileStore";
import { SupplierForm } from "@/pages/auth/RegisterSupplier";

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
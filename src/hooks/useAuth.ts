import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as authApi from "../services/authApi";
import { useAuthStore } from "../stores/useAuthStore";

export function useLogin() {
    const qc = useQueryClient();
    return useMutation<any, Error, { email: string; password: string }>({
        mutationFn: authApi.loginApi,
        onSuccess(data) {
            useAuthStore.getState().login(data);
            qc.invalidateQueries();
        },
    });
}

export function useLogout() {
    const qc = useQueryClient();
    return useMutation<any, Error, void>({
        mutationFn: authApi.logoutApi,
        onSuccess() {
            useAuthStore.getState().logout();
            qc.clear();
        },
    });
}


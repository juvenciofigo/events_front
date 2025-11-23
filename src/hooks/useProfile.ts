import { useMutation, useQueryClient } from "@tanstack/react-query";


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

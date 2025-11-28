import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";

const BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

// axios instance without interceptors — used for auth endpoints (refresh/login)
export const axiosBase = axios.create({
    baseURL: BASE,
    withCredentials: true,
});

// main api instance with interceptors
const api = axios.create({
    baseURL: BASE,
    withCredentials: true,
});

// attach token before requests
api.interceptors.request.use((config) => {
    try {
        const token = useAuthStore.getState().token;
        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
    } catch (e) { }
    return config;
});

// simple refresh queue to avoid multiple refresh calls
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (val?: any) => void;
    reject: (err?: any) => void;
    config: any;
}> = [];

function processQueue(error: any, token: string | null = null) {
    failedQueue.forEach((p) => {
        if (error) {
            p.reject(error)
        } else {
            if (token && p.config.headers) {
                p.config.headers["Authorization"] = `Bearer ${token}`;
            }
            p.resolve(api(p.config));
        }
    });
    failedQueue = [];
}

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalConfig = err.config;

        if (
            err.response &&
            err.response.status === 401 &&
            !originalConfig._retry
        ) {
            originalConfig._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject, config: originalConfig });
                });
            }

            isRefreshing = true;

            try {
                // Chama o refresh — o cookie vai junto!
                const resp = await axiosBase.post("/auth/refresh");

                const newAccessToken = resp.data?.accessToken;

                if (!newAccessToken) {
                    throw new Error("No access token returned");
                }

                useAuthStore.getState().setToken(newAccessToken);

                processQueue(null, newAccessToken);
                isRefreshing = false;

                // Reenvia requisição original
                originalConfig.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return api(originalConfig);

            } catch (refreshErr) {
                processQueue(refreshErr, null);
                isRefreshing = false;

                useAuthStore.getState().logout();
                return Promise.reject(refreshErr);
            }
        }

        return Promise.reject(err);
    }
);

export default api;

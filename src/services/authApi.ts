import { axiosBase } from "./axiosClient";

export async function loginApi(payload: { email: string; password: string }) {
    try {
        const resp = await axiosBase.post("/auth/login", payload, { withCredentials: true });
        return resp.data;
    } catch (err) {
        throw err;
    }
}

export async function logoutApi() {
    const resp = await axiosBase.post("/auth/logout", {}, { withCredentials: true });
    return resp.data;
}

export async function refreshApi() {
    const resp = await axiosBase.post("/auth/refresh", {}, { withCredentials: true });
    return resp.data;
}


import { OrganizerForm } from "@/pages/auth/RegisterOrganizer";
import api from "./axiosClient";
import { SupplierForm } from "@/pages/auth/RegisterSupplier";
import { Role } from "@/stores/useAuthStore";

export async function organizerRegisterApi(payload: OrganizerForm) {
    try {
        const resp = await api.post("/organizers", payload, { withCredentials: true });
        return resp.data;
    } catch (err) {
        throw err;
    }
}

export async function supplierRegisterApi(payload: SupplierForm) {
    try {
        const resp = await api.post("suppliers", payload, { withCredentials: true });
        return resp.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function getProfileApi({ role, id }: { role: Role, id: string }) {
    try {
        const url = role === "organizer" ? "/organizers" : "/suppliers";
        const resp = await api.get(url + `/${id}/me`, { withCredentials: true });
        return resp.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
import { PageGuest } from "@/types/guest";
import api from "./axiosClient";
import { query } from "@/types/system";
import { GuestCreateForm } from "@/schemas/validation";

export const guestsApi = {
    getGuests: async (
        eventId: string,
        { page, limit, sort, searchQuery }: query

    ): Promise<PageGuest> => {
        let url = `/guests/event/${eventId}?limit=${limit}&page=${page}&sort=${sort}`;
        if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
        const { data } = await api.get(url);

        return data;
    },
    createGuest: async (data: GuestCreateForm) => {
        const response = await api.post(`/guests`, data);
        return response.data;
    },
    updateGuest: async (eventId: string, guestId: string, data: GuestCreateForm) => {
        const response = await api.put(`/guests/event/${eventId}/${guestId}`, data);
        return response.data;
    },
    deleteGuest: async (eventId: string, guestId: string) => {
        const response = await api.delete(`/guests/event/${eventId}/${guestId}`);
        return response.data;
    },
};
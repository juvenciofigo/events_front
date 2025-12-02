import { PageGuest } from "@/types/guest";
import api from "./axiosClient";

export const guestsApi = {
    getGuests: async (
        eventId: string,
        limit: number,
        pageNumber: number,
        sort: string,
        search?: string,
        status?: string,
        ticketType?: string
    ): Promise<PageGuest> => {
        let url = `/guests/event/${eventId}?limit=${limit}&pageNumber=${pageNumber}&sort=${sort}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (status && status !== 'all') url += `&status=${status}`;
        if (ticketType && ticketType !== 'all') url += `&ticketType=${ticketType}`;

        const { data } = await api.get(url);
        console.log(data);

        return data;
    },
    createGuest: async (eventId: string, guest: any) => {
        const response = await api.post(`/guests/event/${eventId}`, guest);
        return response.data;
    },
    updateGuest: async (eventId: string, guestId: string, guest: any) => {
        const response = await api.put(`/guests/event/${eventId}/${guestId}`, guest);
        return response.data;
    },
    deleteGuest: async (eventId: string, guestId: string) => {
        const response = await api.delete(`/guests/event/${eventId}/${guestId}`);
        return response.data;
    },
};
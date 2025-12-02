import api from "./axiosClient";

export const guestsApi = {
    getGuests: async (eventId: string, limit: number = 10, pageNumber: number = 1, sort: string = "createdAt,desc") => {
        const response = await api.get(`/guests/${eventId}?limit=${limit}&pageNumber=${pageNumber}&sort=${sort}`);
        return response.data;
    },
    createGuest: async (eventId: string, guest: any) => {
        const response = await api.post(`/guests/${eventId}`, guest);
        return response.data;
    },
    updateGuest: async (eventId: string, guestId: string, guest: any) => {
        const response = await api.put(`/guests/${eventId}/${guestId}`, guest);
        return response.data;
    },
    deleteGuest: async (eventId: string, guestId: string) => {
        const response = await api.delete(`/guests/${eventId}/${guestId}`);
        return response.data;
    },
};
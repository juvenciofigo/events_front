import api from "./axiosClient";

export interface Supplier {
    id: string;
    eventId: string;
    name: string;
    category: string;
    contactName: string;
    phone: string;
    email: string;
    contractValue: number;
    status: 'active' | 'pending' | 'inactive';
    createdAt: string;
    updatedAt: string;
}

export interface CreateSupplierDTO {
    name: string;
    category: string;
    contactName: string;
    phone: string;
    email: string;
    contractValue: number;
    status?: 'active' | 'pending';
}

export const suppliersApi = {
    getSuppliers: async (eventId: string) => {
        const response = await api.get(`/suppliers/event/${eventId}`);
        return response.data;
    },

    createSupplier: async (eventId: string, supplier: CreateSupplierDTO) => {
        const response = await api.post(`/suppliers/event/${eventId}`, supplier);
        return response.data;
    },

    updateSupplier: async (id: string, supplier: Partial<CreateSupplierDTO>) => {
        const response = await api.put(`/suppliers/${id}`, supplier);
        return response.data;
    },

    deleteSupplier: async (id: string) => {
        const response = await api.delete(`/suppliers/${id}`);
        return response.data;
    }
};

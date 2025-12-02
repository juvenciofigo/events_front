import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { suppliersApi, CreateSupplierDTO } from "../services/suppliersApi";

export function useSuppliers(eventId: string) {
    const queryClient = useQueryClient();

    const suppliersQuery = useQuery({
        queryKey: ['suppliers', eventId],
        queryFn: () => suppliersApi.getSuppliers(eventId),
        enabled: !!eventId,
    });

    const createSupplier = useMutation({
        mutationFn: (supplier: CreateSupplierDTO) => suppliersApi.createSupplier(eventId, supplier),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['suppliers', eventId] });
        },
    });

    const updateSupplier = useMutation({
        mutationFn: ({ id, supplier }: { id: string, supplier: Partial<CreateSupplierDTO> }) => suppliersApi.updateSupplier(id, supplier),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['suppliers', eventId] });
        },
    });

    const deleteSupplier = useMutation({
        mutationFn: (id: string) => suppliersApi.deleteSupplier(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['suppliers', eventId] });
        },
    });

    return {
        data: suppliersQuery.data,
        isLoading: suppliersQuery.isLoading,
        createSupplier,
        updateSupplier,
        deleteSupplier,
    };
}

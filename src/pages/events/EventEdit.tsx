import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventEditSchema, type EventEditForm } from "../../schemas/validation";

export default function EventEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<EventEditForm>({
        resolver: zodResolver(eventEditSchema),
        defaultValues: {
            name: "",
            type: "",
            description: "",
            date: "",
            location: "",
            capacity: 0,
        },
    });

    function onSubmit(data: EventEditForm) {
        console.log("Atualizar evento", id, data);
        navigate(`/events/${id}`);
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-6">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg dark:shadow-gray-900/50 p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Editar Evento #{id}</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome do evento</label>
                        <input
                            {...register("name")}
                            placeholder="Ex: Conferência Tech 2025"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                        />
                        {errors.name && <div className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.name.message}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo de evento</label>
                        <input
                            {...register("type")}
                            placeholder="Ex: Conferência, Workshop, Festa"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                        />
                        {errors.type && <div className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.type.message}</div>}
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descrição</label>
                        <textarea
                            {...register("description")}
                            placeholder="Descreva o evento em detalhes"
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors resize-vertical"
                        />
                        {errors.description && <div className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.description.message}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data e Hora</label>
                        <input
                            {...register("date")}
                            type="datetime-local"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                        />
                        {errors.date && <div className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.date.message}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Local</label>
                        <input
                            {...register("location")}
                            placeholder="Ex: Centro de Convenções"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                        />
                        {errors.location && <div className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.location.message}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Capacidade Total</label>
                        <input
                            {...register("capacity", { valueAsNumber: true })}
                            placeholder="0"
                            type="number"
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                        />
                        {errors.capacity && <div className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.capacity.message}</div>}
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate(`/events/${id}`)}
                            className="px-6 py-2 bg-gray-400 dark:bg-gray-600 text-white rounded-md hover:bg-gray-500 dark:hover:bg-gray-700 transition-colors font-medium">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                            disabled={isSubmitting}>
                            {isSubmitting ? "Atualizando..." : "Atualizar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

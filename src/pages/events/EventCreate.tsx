import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
    PhotoIcon,
    CalendarIcon,
    MapPinIcon,
    ArrowLeftIcon
} from "@heroicons/react/24/outline";

export default function EventCreate() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data: any) => {
        console.log("Criar evento:", data);
        // Logic to create event
        navigate("/events");
    };

    return (
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-white pb-20">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-muted hover:text-text transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                        Voltar
                    </button>
                    <h1 className="text-3xl font-black tracking-tight text-text">
                        Criar Novo Evento
                    </h1>
                    <p className="text-muted mt-2">
                        Preencha as informações abaixo para publicar seu evento.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                    {/* Basic Info Section */}
                    <div className="bg-surface/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                        <h2 className="text-xl font-bold text-text mb-6 flex items-center">
                            <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary-light flex items-center justify-center mr-3 text-sm">01</span>
                            Informações Básicas
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-muted mb-2">Nome do Evento</label>
                                <input
                                    {...register("title")}
                                    type="text"
                                    placeholder="Ex: Festival de Verão 2025"
                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-muted mb-2">Categoria</label>
                                    <select
                                        {...register("category")}
                                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                                    >
                                        <option value="">Selecione uma categoria</option>
                                        <option value="music">Música</option>
                                        <option value="tech">Tecnologia</option>
                                        <option value="art">Arte</option>
                                        <option value="business">Negócios</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-muted mb-2">Capacidade Estimada</label>
                                    <input
                                        {...register("capacity")}
                                        type="number"
                                        placeholder="Ex: 500"
                                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-muted mb-2">Descrição</label>
                                <textarea
                                    {...register("description")}
                                    rows={4}
                                    placeholder="Descreva seu evento..."
                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Date & Location Section */}
                    <div className="bg-surface/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                        <h2 className="text-xl font-bold text-text mb-6 flex items-center">
                            <span className="w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 flex items-center justify-center mr-3 text-sm">02</span>
                            Data e Local
                        </h2>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-muted mb-2 flex items-center">
                                        <CalendarIcon className="w-4 h-4 mr-2 text-slate-500" />
                                        Data de Início
                                    </label>
                                    <input
                                        {...register("startDate")}
                                        type="datetime-local"
                                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-muted mb-2 flex items-center">
                                        <CalendarIcon className="w-4 h-4 mr-2 text-slate-500" />
                                        Data de Término
                                    </label>
                                    <input
                                        {...register("endDate")}
                                        type="datetime-local"
                                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-muted mb-2 flex items-center">
                                    <MapPinIcon className="w-4 h-4 mr-2 text-slate-500" />
                                    Localização
                                </label>
                                <input
                                    {...register("location")}
                                    type="text"
                                    placeholder="Endereço completo ou nome do local"
                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media Section */}
                    <div className="bg-surface/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                        <h2 className="text-xl font-bold text-text mb-6 flex items-center">
                            <span className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center mr-3 text-sm">03</span>
                            Mídia
                        </h2>

                        <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-primary/50 transition-colors cursor-pointer bg-background/30">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                <PhotoIcon className="w-8 h-8 text-muted" />
                            </div>
                            <p className="text-text font-medium mb-1">Clique para fazer upload da capa</p>
                            <p className="text-sm text-muted">PNG, JPG até 5MB</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-text font-bold rounded-xl transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-1"
                        >
                            Criar Evento
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

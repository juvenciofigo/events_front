import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
    PhotoIcon,
    CalendarIcon,
    MapPinIcon,
    ArrowLeftIcon
} from "@heroicons/react/24/outline";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import Select from "@/components/Form/Select";

export default function EventCreate() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [category, setCategory] = useState("");

    const onSubmit = (data: any) => {
        console.log("Criar evento:", data);
        // Logic to create event
        navigate("/events");
    };

    return (
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-text flex p-2 md:px-4 justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 w-[800px] h-[500px] bg-primary/30 rounded-full blur-[120px] animate-orbit-slow"></div>
                <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-emerald-700/30 rounded-full blur-[120px] animate-orbit-slow" style={{ animationDelay: '-10s' }}></div>
            </div>

            <div className="w-full relative z-10">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Basic Info Section */}
                        <div className="bg-surface/50 rounded backdrop-blur-sm w-full">
                            <h2 className="text-xl font-bold text-text mb-6 flex items-center">
                                <span className="w-8 h-8 rounded bg-primary/20 text-primary-light flex items-center justify-center mr-3 text-sm">01</span>
                                Informações Básicas
                            </h2>

                            <div className="space-y-6">
                                <Input
                                    {...register("title")}
                                    label="Nome do Evento"
                                    type="text"
                                    isRequired
                                    placeholder="Ex: Festival de Verão 2025"
                                    InputClassName="pl-2 md:py-2 py-1"
                                    errors={errors.title}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Select
                                        label="Categoria"
                                        value={category}
                                        isRequired
                                        onChange={(e) => setCategory(e.target.value)}
                                        selectClassName="pl-2 md:py-2 py-1"
                                        options={[
                                            { value: "", label: "Selecione uma categoria" },
                                            { value: "music", label: "Música" },
                                            { value: "tech", label: "Tecnologia" },
                                            { value: "art", label: "Arte" },
                                            { value: "business", label: "Negócios" }
                                        ]}
                                    />
                                    <Input
                                        {...register("capacity")}
                                        label="Capacidade Estimada"
                                        type="number"
                                        isRequired
                                        placeholder="Ex: 500"
                                        InputClassName="pl-2 md:py-2 py-1"
                                        errors={errors.capacity}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text mb-2">Descrição</label>
                                    <textarea
                                        {...register("description")}
                                        rows={4}
                                        placeholder="Descreva seu evento..."
                                        className="w-full bg-surface/10 border-black/20 dark:bg-slate-950/80 border dark:border-white/10 rounded text-xs md:text-sm dark:text-white dark:placeholder-slate-500 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all pl-2 md:py-3 py-3 resize-none"
                                    ></textarea>
                                    {errors.description && <div className="text-xs text-red-400 mt-1">{errors.description.message}</div>}
                                </div>
                            </div>
                        </div>


                        {/* Date & Location Section */}
                        <div className="bg-surface/50 rounded backdrop-blur-sm border-t md:border-0 w-full">
                            <h2 className="text-xl font-bold text-text my-4 md:my-0 md:mb-5 flex items-center">
                                <span className="w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 flex items-center justify-center mr-3 text-sm">02</span>
                                Data e Local
                            </h2>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        {...register("startDate")}
                                        label="Data de Início"
                                        type="datetime-local"
                                        isRequired
                                        InputClassName="pl-10 md:py-2 py-1"
                                        icon={<CalendarIcon className="w-4 h-4 text-text-muted" />}
                                        errors={errors.startDate}
                                    />
                                    <Input
                                        {...register("endDate")}
                                        label="Data de Término"
                                        type="datetime-local"
                                        InputClassName="pl-10 md:py-2 py-1"
                                        icon={<CalendarIcon className="w-4 h-4 text-text-muted" />}
                                        errors={errors.endDate}
                                    />
                                </div>

                                <Input
                                    {...register("location")}
                                    label="Localização"
                                    type="text"
                                    isRequired
                                    placeholder="Endereço completo ou nome do local"
                                    InputClassName="pl-10 md:py-2 py-1"
                                    icon={<MapPinIcon className="w-4 h-4 text-text-muted" />}
                                    errors={errors.location}
                                />
                            </div>
                        </div>
                    </div>


                    {/* Media Section */}
                    <div className="bg-surface/50 rounded backdrop-blur-sm">
                        <h2 className="text-xl font-bold text-text mb-6 flex items-center">
                            <span className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center mr-3 text-sm">03</span>
                            Mídia
                        </h2>

                        <div className="border-2 border-dashed border-white/10 rounded p-8 flex flex-col items-center justify-center hover:border-primary/50 transition-colors cursor-pointer bg-background/30">
                            <div className="w-16 h-16 rounded bg-white/5 flex items-center justify-center mb-4">
                                <PhotoIcon className="w-8 h-8 text-muted" />
                            </div>
                            <p className="text-text font-medium mb-1">Clique para fazer upload da capa</p>
                            <p className="text-sm text-muted">PNG, JPG até 5MB</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-4">
                        <Button
                            type="button"
                            onClick={() => navigate(-1)}
                            variant="secondary"
                            size="sm"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            size="sm"
                        >
                            Criar Evento
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

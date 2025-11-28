import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import Header from "./Header";
import { useToast } from "@/contexts/ToastContext";
import { useOrganizerRegister } from "../../hooks/useProfile";

const organizerSchema = z.object({
    companyName: z.string().min(3, "Nome da empresa deve ter pelo menos 3 caracteres"),
    phone: z.string().length(9, "Telefone deve ter 13 caracteres"),
    description: z.string().min(20, "Descrição deve ter pelo menos 20 caracteres").optional(),
});

export type OrganizerForm = z.infer<typeof organizerSchema>;

export default function RegisterOrganizer() {
    const navigate = useNavigate();
    const toast = useToast();
    const organizerRegisterMutation = useOrganizerRegister();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<OrganizerForm>({
        resolver: zodResolver(organizerSchema),
        defaultValues: {
            companyName: "",
            phone: "",
            description: "",
        },
    });


    async function onSubmit(data: OrganizerForm) {
        organizerRegisterMutation.mutate(data, {
            onSuccess: () => {
                toast.success("Perfil de Organizador criado com sucesso!");
                navigate("/organizers");
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Erro ao criar perfil. Tente novamente.");
            },
        });
    }

    return (
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-text flex px-4 justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/30 rounded-full blur-[120px] animate-pulse"></div>
                {/* <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-950/10 rounded-full blur-[100px]"></div> */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="w-full max-w-2xl relative z-10">
                <Header
                    back={{ backLink: "/auth/role", backTitle: "Voltar para seleção de perfil" }}
                    h="📋 Registrar como Organizador"
                    p="Preencha os dados da sua empresa para criar eventos incríveis"
                />

                <div className="mt-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Company Name */}
                            <Input
                                InputClassName="pl-2"
                                {...register("companyName")}
                                label="Nome da Empresa"
                                placeholder="Minha Empresa de Eventos"
                                type="text"
                                errors={errors.companyName}
                            />
                            {/*Phone */}
                            <Input
                                icon={<div className="w-5 h-5 text-xs">+258</div>}
                                InputClassName="pl-[55px]"
                                {...register("phone")}
                                label="Telefone"
                                placeholder="8xxxxxxxx"
                                type="tel"
                                errors={errors.phone}
                            />
                        </div>


                        {/* Description */}
                        <div>
                            <label className="mb-2 text-xs font-medium text-text dark:text-slate-300 block">
                                Descrição (Opcional)
                            </label>
                            <textarea
                                {...register("description")}
                                placeholder="Conte um pouco sobre sua empresa e os tipos de eventos que você organiza..."
                                rows={4}
                                className="w-full px-3 py-2 bg-slate-900/10 border-black/20 dark:bg-slate-950/80 border dark:border-white/10 rounded text-xs md:text-sm dark:text-white dark:placeholder-slate-500 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all resize-none"
                            />
                            {errors.description && (
                                <div className="text-xs text-red-400 mt-1">{errors.description.message}</div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            size="md"
                            className="self-end"
                        >
                            {isSubmitting ? "Criando perfil..." : "Criar Perfil de Organizador"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

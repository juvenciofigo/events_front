import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import Header from "./Header";
import { useToast } from "@/contexts/ToastContext";
import Select from "@/components/Form/Select";

const supplierSchema = z.object({
    companyName: z.string().min(3, "Nome da empresa deve ter pelo menos 3 caracteres"),
    // cnpj: z.string().min(14, "CNPJ inválido").max(18, "CNPJ inválido"),
    // phone: z.string().min(10, "Telefone inválido"),
    // category: z.string().min(1, "Selecione uma categoria"),
    // address: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
    // city: z.string().min(2, "Cidade inválida"),
    // state: z.string().min(2, "Estado inválido").max(2, "Use a sigla do estado (ex: SP)"),
    // minPrice: z.string().min(1, "Informe o preço mínimo"),
    description: z.string().min(20, "Descrição deve ter pelo menos 20 caracteres"),
});

export type SupplierForm = z.infer<typeof supplierSchema>;

const SERVICE_CATEGORIES = [
    { value: "", label: "Selecione uma categoria" },
    { value: "Buffet", label: "Buffet" },
    { value: "Música", label: "Música / DJ" },
    { value: "Fotografia", label: "Fotografia" },
    { value: "Local", label: "Local / Espaço" },
    { value: "Decoração", label: "Decoração" },
    { value: "Segurança", label: "Segurança" },
    { value: "Transporte", label: "Transporte" },
    { value: "Iluminação", label: "Iluminação / Som" },
    { value: "Outros", label: "Outros Serviços" },
];
import { useSupplierRegister } from "../../hooks/useProfile";
export default function RegisterSupplier() {
    const navigate = useNavigate();
    const toast = useToast();
    const supplierRegisterMutation = useSupplierRegister();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<SupplierForm>({
        resolver: zodResolver(supplierSchema),
        defaultValues: {
            companyName: "",
            description: "",
            // cnpj: "",
            // phone: "",
            // category: "",
            // address: "",
            // city: "",
            // state: "",
            // minPrice: "",
        },
    });

    // const categoryValue = watch("category");

    // async function onSubmit(data: SupplierForm) {
    //     try {
    //         // TODO: Call API to register suppliers
    //         console.log("Registering suppliers:", data);

    //         // Simulate API call
    //         await new Promise(resolve => setTimeout(resolve, 1500));

    //         toast.success("Perfil de Fornecedor criado com sucesso!");

    //         // Navigate to suppliers dashboard
    //         navigate("/suppliers");
    //     } catch (error: any) {
    //         toast.error(error?.response?.data?.message || "Erro ao criar perfil. Tente novamente.");
    //     }
    // }


    async function onSubmit(data: SupplierForm) {
        supplierRegisterMutation.mutate(data, {
            onSuccess: () => {
                toast.success("Perfil de Fornecedor criado com sucesso!");
                navigate("/suppliers");
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
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/30 rounded-full blur-[120px] animate-pulse"></div>
                {/* <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-950/10 rounded-full blur-[100px]"></div> */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="w-full max-w-2xl relative z-10">
                <Header
                    h="🏢 Registrar como Fornecedor"
                    p="Cadastre sua empresa e ofereça serviços para eventos"
                />

                <div className="mt-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        {/* Company Name */}
                        <Input
                            InputClassName="pl-2"
                            {...register("companyName")}
                            label="Nome da Empresa"
                            placeholder="Minha Empresa de Serviços"
                            type="text"
                            errors={errors.companyName}
                        />

                        {/* CNPJ and Phone */}
                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                InputClassName="pl-2"
                                {...register("cnpj")}
                                label="CNPJ"
                                placeholder="00.000.000/0000-00"
                                type="text"
                                errors={errors.cnpj}
                            />
                            <Input
                                InputClassName="pl-2"
                                {...register("phone")}
                                label="Telefone"
                                placeholder="(00) 00000-0000"
                                type="tel"
                                errors={errors.phone}
                            />
                        </div> */}

                        {/* Category and Min Price */}
                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Select
                                    selectClassName="pl-2"
                                    {...register("category")}
                                    label="Categoria de Serviço"
                                    options={SERVICE_CATEGORIES}
                                    value={categoryValue}
                                />
                                {errors.category && (
                                    <div className="text-xs text-red-400 mt-1">{errors.category.message}</div>
                                )}
                            </div>
                            <Input
                                InputClassName="pl-2"
                                {...register("minPrice")}
                                label="Preço Mínimo (R$)"
                                placeholder="1000"
                                type="number"
                                errors={errors.minPrice}
                            />
                        </div> */}

                        {/* Address */}
                        {/* <Input
                            InputClassName="pl-2"
                            {...register("address")}
                            label="Endereço"
                            placeholder="Rua, número, bairro"
                            type="text"
                            errors={errors.address}
                        /> */}

                        {/* City and State */}
                        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                                <Input
                                    InputClassName="pl-2"
                                    {...register("city")}
                                    label="Cidade"
                                    placeholder="São Paulo"
                                    type="text"
                                    errors={errors.city}
                                />
                            </div>
                            <Input
                                InputClassName="pl-2"
                                {...register("state")}
                                label="Estado"
                                placeholder="SP"
                                type="text"
                                errors={errors.state}
                            />
                        </div> */}

                        {/* Description */}
                        <div>
                            <label className="mb-2 text-xs font-medium text-text dark:text-slate-300 block">
                                Descrição dos Serviços *
                            </label>
                            <textarea
                                {...register("description")}
                                placeholder="Descreva os serviços que sua empresa oferece, diferenciais, experiência..."
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
                            fullWidth
                            className="mt-2"
                        >
                            {isSubmitting ? "Criando perfil..." : "Criar Perfil de Fornecedor"}
                        </Button>
                    </form>

                    {/* Back Link */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate("/auth/role")}
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                        >
                            ← Voltar para seleção de perfil
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

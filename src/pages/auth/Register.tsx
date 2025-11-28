import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterForm } from "../../schemas/validation";
import { SparklesIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import Header from "./Header";
import { useToast } from "@/contexts/ToastContext";

export default function Register() {
    const navigate = useNavigate();
    const toast = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(data: RegisterForm) {
        try {
            // TODO: Call backend registration API
            console.log("Registrar novo usuário", data);

            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success("Conta criada com sucesso!");
            // Navegar para seleção de perfil
            navigate("/auth/role");
        } catch (error: any) {
            toast.error(error?.message || "Erro ao criar conta. Tente novamente.");
        }
    }

    return (
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-text flex justify-center px-4 md:p-0 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/30 rounded-full blur-[120px] animate-pulse"></div>
                {/* <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-950/10 rounded-full blur-[100px]"></div> */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>
            
            <div className="w-full max-w-md relative z-10">
                {/* Header */}

                <Header h="Criar Conta" p="Comece sua jornada conosco" />

                {/* Form */}
                {/* <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded p-6 shadow-2xl shadow-black/50"> */}
                <div className="mt-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <Input
                            InputClassName="pl-2"
                            {...register("name")}
                            label="Nome Completo"
                            placeholder="Seu nome completo"
                            type="text"
                            errors={errors.name}
                        />

                        <Input
                            InputClassName="pl-2"
                            {...register("email")}
                            label="Email"
                            placeholder="seu@email.com"
                            type="email"
                            errors={errors.email}
                        />

                        <Input
                            InputClassName="pl-2"
                            {...register("password")}
                            label="Senha"
                            placeholder="••••••••"
                            type="password"
                            errors={errors.password}
                        />

                        <Input
                            InputClassName="pl-2"
                            {...register("confirmPassword")}
                            label="Confirmar Senha"
                            placeholder="••••••••"
                            type="password"
                            errors={errors.confirmPassword}
                        />

                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            fullWidth
                        >
                            {isSubmitting ? "Criando conta..." : "Criar Conta"}
                        </Button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-white/10 text-center">
                        <p className="text-sm text-muted">
                            Já tem uma conta?{" "}
                            <Link
                                to="/auth/login"
                                className="text-primary hover:text-primary-hover font-semibold transition-colors"
                            >
                                Fazer Login
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-muted">
                        Ao criar uma conta, você concorda com nossos{" "}
                        <Link to="/terms" className="text-primary hover:text-primary-hover transition-colors">
                            Termos de Serviço
                        </Link>{" "}
                        e{" "}
                        <Link to="/privacy" className="text-primary hover:text-primary-hover transition-colors">
                            Política de Privacidade
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

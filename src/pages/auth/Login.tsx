import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../../hooks/useAuth";
import { loginSchema, type LoginForm } from "../../schemas/validation";
import { SparklesIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import Header from "@/pages/auth/Header";

export default function Login() {
    const navigate = useNavigate();
    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Usar o estado de loading da mutation do React Query
    const isSubmitting = loginMutation.isPending;

    function onSubmit(data: LoginForm) {
        (loginMutation as any).mutate(
            { email: data.email, password: data.password },
            {
                onSuccess: () => {
                    navigate("/auth/role");
                },
            }
        );
    }

    return (
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-text flex px-4 justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10"></div>

            <div className="w-full max-w-md relative z-10">
                <Header h="Bem-vindo de volta" p="Acesse sua conta para gerenciar seus eventos" />

                <div >
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <Input
                            {...register("email")}
                            label="Email"
                            placeholder="seu@email.com"
                            type="email"
                            errors={errors.email}
                        />

                        <Input
                            {...register("password")}
                            label="Senha"
                            placeholder="••••••••"
                            type="password"
                            errors={errors.password}
                        />
                        <Link
                            to="/auth/forgot"
                            className="text-xs text-primary hover:text-primary-hover transition-colors"
                        >
                            Esqueceu a senha?
                        </Link>

                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            fullWidth={false}
                            size="md"
                            className="self-end"
                        >
                            {isSubmitting ? "Entrando..." : "Entrar"}
                        </Button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-white/10 text-center">
                        <p className="text-muted text-xs">
                            Não tem uma conta?{" "}
                            <Link
                                to="/auth/register"
                                className="text-link hover:text-link-hover font-bold transition-colors"
                            >
                                Criar conta
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

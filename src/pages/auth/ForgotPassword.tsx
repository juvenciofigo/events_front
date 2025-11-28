import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SparklesIcon, ArrowLeftIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import Header from "./Header";
import { useToast } from "@/contexts/ToastContext";

const forgotPasswordSchema = z.object({
    email: z.string().email("Email inválido"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [emailSent, setEmailSent] = React.useState(false);
    const toast = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordForm>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(data: ForgotPasswordForm) {
        try {
            // TODO: Call backend forgot password API
            console.log("Recuperar senha para:", data.email);

            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success("Email de recuperação enviado com sucesso!");
            setEmailSent(true);
        } catch (error: any) {
            toast.error(error?.message || "Erro ao enviar email. Tente novamente.");
        }
    }

    if (emailSent) {
        return (
            <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-text flex items-center justify-center p-4 relative overflow-hidden">
                {/* Background Effects */}
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/30 rounded-full blur-[120px] animate-pulse"></div>
                    {/* <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-950/10 rounded-full blur-[100px]"></div> */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                </div>
                <div className="w-full max-w-md relative z-10">
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded p-6 shadow-2xl shadow-black/50 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-success/20 rounded-full mb-4">
                            <EnvelopeIcon className="w-8 h-8 text-success" />
                        </div>

                        <h2 className="text-2xl font-bold text-text mb-2">Email Enviado!</h2>
                        <p className="text-sm text-muted mb-6">
                            Enviamos um link de recuperação de senha para seu email.
                            Verifique sua caixa de entrada e spam.
                        </p>

                        <Button
                            onClick={() => navigate("/auth/login")}
                            fullWidth
                        >
                            Voltar para Login
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-text flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10"></div>

            <div className="w-full max-w-md relative z-10">
                {/* Header */}
                <Header h="Esqueceu a Senha?" p="Digite seu email e enviaremos um link para redefinir sua senha" />

                {/* Form */}
                <div className="mt-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <Input
                            InputClassName="pl-2"
                            {...register("email")}
                            label="Email"
                            placeholder="seu@email.com"
                            type="email"
                            errors={errors.email}
                        />

                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            fullWidth
                        >
                            {isSubmitting ? "Enviando..." : "Enviar Link de Recuperação"}
                        </Button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-white/10 text-center">
                        <p className="text-sm text-muted">
                            Lembrou sua senha?{" "}
                            <Link
                                to="/auth/login"
                                className="text-link hover:text-link-hover font-semibold transition-colors"
                            >
                                Fazer Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

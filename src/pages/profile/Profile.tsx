import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileForm } from "../../schemas/validation";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";

export default function Profile() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProfileForm>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            bio: "",
            avatar: "",
        },
    });

    async function onSubmit(data: ProfileForm) {
        console.log("Atualizar perfil", data);
        // TODO: Call backend to update profile
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-2xl mx-auto bg-surface/50 backdrop-blur-xl rounded-sm shadow-2xl shadow-black/50 p-6 border border-white/10">
                <h2 className="text-2xl font-bold mb-4 text-text">Meu Perfil</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 gap-4">
                    <Input
                        {...register("name")}
                        label="Nome Completo"
                        placeholder="Seu nome completo"
                        errors={errors.name}
                    />

                    <Input
                        {...register("email")}
                        label="Email"
                        placeholder="seu@email.com"
                        type="email"
                        errors={errors.email}
                    />

                    <Input
                        {...register("phone")}
                        label="Telefone"
                        placeholder="(11) 98765-4321"
                        type="tel"
                        errors={errors.phone}
                    />

                    <div>
                        <label className="block text-xs font-medium text-muted mb-1">Bio</label>
                        <textarea
                            {...register("bio")}
                            placeholder="Conte um pouco sobre você..."
                            rows={4}
                            className="w-full px-3 py-2 text-sm border border-white/10 rounded-sm bg-background/50 text-text placeholder-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                        />
                        {errors.bio && <div className="text-xs text-error mt-1">{errors.bio.message}</div>}
                    </div>

                    <Input
                        {...register("avatar")}
                        label="URL do Avatar"
                        placeholder="https://exemplo.com/avatar.jpg"
                        type="url"
                        errors={errors.avatar}
                    />

                    <div className="flex gap-2 pt-2">
                        <Button
                            type="button"
                            variant="secondary"
                            className="flex-1"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            className="flex-1"
                        >
                            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

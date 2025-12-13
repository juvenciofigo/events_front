import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, SelectedProfile } from "../../stores/useAuthStore";
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Header from "./Header";
import Button from "@/components/Form/Button";
import { usePresenceProfile } from "@/hooks/useProfile";

type ProfileOption = {
    type: "organizer" | "supplier";
    label: string;
    emoji: string;
    desc: string;
    hasRole: boolean;
    profileId?: string;
};

export default function RoleSelect() {
    const navigate = useNavigate();
    const setSelectedProfile = useAuthStore((s) => s.setSelectedProfile);
    const profiles = useAuthStore((s) => s.profiles);
    const user = useAuthStore((s) => s.user);
    const [selected, setSelected] = React.useState<SelectedProfile | null>(null);

    React.useEffect(() => {
        if (!user) {
            navigate("/auth/login");
        }
    }, [user, navigate]);

    const profileOptions: ProfileOption[] = useMemo(() => {
        return [
            {
                type: "organizer",
                label: "Organizador",
                emoji: "📋",
                desc: "Criar e gerenciar eventos",
                hasRole: !!profiles?.organizer,
                profileId: profiles?.organizer || undefined,
            },
            {
                type: "supplier",
                label: "Fornecedor",
                emoji: "🏢",
                desc: "Oferecer serviços para eventos",
                hasRole: !!profiles?.supplier,
                profileId: profiles?.supplier || undefined,
            },
        ];
    }, [profiles]);

    const hasAnyRole = profileOptions.some(p => p.hasRole);
    // const hasBothRoles = profileOptions.every(p => p.hasRole);

    function handleSelectProfile(option: ProfileOption) {

        if (option.hasRole && option.profileId) {
            // User already has this role, navigate to it
            setSelected({ id: option.profileId, role: option.type });
        } else {
            // User doesn't have this role, navigate to registration page
            handleRequestRole(option.type);
        }
    }

    function handleRequestRole(roleType: "organizer" | "supplier") {
        // Navigate to role-specific registration page
        if (roleType === "organizer") {
            navigate("/auth/register-organizers");
        } else {
            navigate("/auth/register-suppliers");
        }
    }
   

    React.useEffect(() => {
        if (selected) {
            setSelectedProfile(selected);
            if (selected?.role === "organizer") {
                navigate("/dashboard/organizers");
            } else if (selected?.role === "supplier") {
                navigate("/dashboard/suppliers");
            }
        }
    }, [selected, setSelectedProfile, navigate]);

    return (
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-text flex px-4 justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/30 rounded-full blur-[120px] animate-pulse"></div>
                {/* <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-950/10 rounded-full blur-[100px]"></div> */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="w-full max-w-2xl flex flex-col">
                <Header
                    back={{ backLink: "/auth/login", backTitle: "Voltar para login" }}
                    h={hasAnyRole ? "Escolha seu Perfil" : "Crie seu Perfil"}
                    p={hasAnyRole
                        ? "Selecione como você deseja acessar a plataforma ou adicione um novo perfil"
                        : "Escolha o tipo de perfil que deseja criar"
                    }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:grow  py-2">
                    {profileOptions.map((option) => (
                        <div
                            key={option.type}
                            onClick={() => handleSelectProfile(option)}
                            className={`
                                group relative p-2 h-fit self-center border rounded cursor-pointer text-center transition-all
                                ${option.hasRole
                                    ? "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10 hover:border-green-400 dark:hover:border-green-600 hover:shadow-lg hover:shadow-green-500/10"
                                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-fuchsia-400 dark:hover:border-fuchsia-600 hover:shadow-lg hover:shadow-fuchsia-500/10"
                                }
                                hover:-translate-y-1
                            `}
                        >
                            {/* Status Badge */}
                            <div className="absolute top-3 right-3">
                                {option.hasRole ? (
                                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-medium">
                                        <CheckCircleIcon className="h-3 w-3" />
                                        Ativo
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs font-medium">
                                        <PlusCircleIcon className="h-3 w-3" />
                                        Criar
                                    </div>
                                )}
                            </div>

                            {/* Emoji */}
                            <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                                {option.emoji}
                            </div>

                            {/* Title */}
                            <div className={`font-bold text-lg transition-colors ${option.hasRole
                                ? "text-green-700 dark:text-green-400"
                                : "text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light"
                                }`}>
                                {option.label}
                            </div>

                            {/* Description */}
                            <div className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                                {option.desc}
                            </div>

                            {/* Action Button */}
                            <Button
                                size="sm"
                                fullWidth
                                variant={option.hasRole ? "primary" : "secondary"}>
                                {option.hasRole ? (
                                    <>
                                        <CheckCircleIcon className="h-4 w-4" />
                                        Acessar
                                    </>
                                ) : (
                                    <>
                                        <PlusCircleIcon className="h-4 w-4" />
                                        Criar
                                    </>
                                )}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

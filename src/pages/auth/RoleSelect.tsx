import React, { useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore, SelectedProfile } from "../../stores/useAuthStore";
import { SparklesIcon } from "@heroicons/react/24/outline";
import Header from "./Header";

type AvailableProfile = {
    id: string;
    Profile: "organizer" | "supplier";
    label: string;
    emoji: string;
    desc: string;
};

export default function ProfileSelect() {
    const navigate = useNavigate();
    const setProfile = useAuthStore((s) => s.setProfile);
    const profiles = useAuthStore((s) => s.profiles);
    const user = useAuthStore((s) => s.user);
    const [selected, setSelected] = React.useState<SelectedProfile | null>(null);

    React.useEffect(() => {
        if (!user) {
            navigate("/auth/login");
        }
    }, [user]);

    const availableProfiles = useMemo(() => {
        const Profiles: AvailableProfile[] = [];
        if (profiles?.organizer) {
            Profiles.push({
                id: profiles?.organizer,
                Profile: "organizer",
                label: "Organizador",
                emoji: "📋",
                desc: "Criar e gerencia eventos",
            });
        }

        if (profiles?.supplier) {
            Profiles.push({
                id: profiles?.supplier,
                Profile: "supplier",
                label: "Fornecedor",
                emoji: "🏢",
                desc: "Oferecer serviços",
            });
        }
        return Profiles;
    }, [profiles]);

    function handleSelectProfile(ProfileId: string, profile: "organizer" | "supplier") {
        setSelected({ id: ProfileId, profile });
    }

    React.useEffect(() => {
        if (selected) {
            setProfile(selected);
            navigate(`/${selected?.profile}`);
        }
    }, [selected]);

    return (
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-text flex px-4 justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10"></div>

            <div className="w-full max-w-lg">

                <Header h="Escolha seu Perfil" p="Selecione como você deseja acessar a plataforma" />

                <div className={`grid gap-4 ${availableProfiles.length <= 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                    {availableProfiles.map((Profile) => (
                        <div
                            key={Profile.id}
                            onClick={() => handleSelectProfile(Profile.id, Profile.Profile)}
                            className="group p-6 border border-border-color bg-surface rounded-sm cursor-pointer text-center transition-all hover:border-primary/50 hover:bg-surface-hover hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
                        >
                            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{Profile.emoji}</div>
                            <div className="font-bold text-lg text-text group-hover:text-primary transition-colors">{Profile.label}</div>
                            <div className="text-sm text-muted mt-2 group-hover:text-text-secondary transition-colors">{Profile.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

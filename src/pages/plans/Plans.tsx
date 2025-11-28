import Button from "@/components/Form/Button";
import MultiStateBadge from "@/components/transitions/MultiStateBadge";
import PathMorphing, { MENU_PATHS,CHECK_ARROW_PATHS } from "@/components/transitions/PathMorphing";
import PriceSwitcher from "@/components/transitions/PriceSwitcher";
import React from "react";

export default function Plans() {
    const [price, setPrice] = React.useState(29);
    
    const [badgeState, setBadgeState] = React.useState<"idle" | "loading" | "success" | "error">("idle");

    const togglePrice = () => setPrice(p => p === 29 ? 290 : 29);

    const cycleBadge = () => {
        const states: ("idle" | "loading" | "success" | "error")[] = ["idle", "loading", "success", "error"];
        const currentIndex = states.indexOf(badgeState);
        setBadgeState(states[(currentIndex + 1) % states.length]);
    };

    const plans = [
        {
            name: "Bronze",
            price: "R$29/mês",
            features: ["Listar eventos", "Até 100 participantes", "Suporte por email"]
        },
        {
            name: "Silver",
            price: "R$79/mês",
            features: ["Listar eventos", "Até 500 participantes", "Mais armazenamento", "Suporte prioritário"]
        },
        {
            name: "Gold",
            price: "R$199/mês",
            features: ["Eventos ilimitados", "Participantes ilimitados", "Armazenamento ilimitado", "Suporte 24/7", "Analytics avançado"]
        },
    ];

    return (
        <div className="min-h-screen bg-background p-6">
            {/* Demo Section for Transitions */}
            <div className="max-w-6xl mx-auto mb-12 p-6 bg-surface/30 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-text mb-6">Componentes de Transição (Demo)</h3>

                <div className="flex flex-wrap gap-8 items-center">
                    {/* Price Switcher Demo */}
                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-muted">Price Switcher</span>
                        <div className="flex items-center gap-4">
                            <PriceSwitcher price={price} className="text-2xl font-bold text-white" />
                            <Button size="sm" variant="secondary" onClick={togglePrice}>
                                Mudar Preço
                            </Button>
                        </div>
                    </div>

                    {/* Path Morphing Demo */}
                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-muted">Path Morphing (Click icon)</span>
                        <div className="p-2 bg-white/5 rounded-lg">
                            <PathMorphing paths={MENU_PATHS} color="white" />
                        </div>
                    </div>

                    {/* Multi State Badge Demo */}
                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-muted">Multi State Badge</span>
                        <div className="flex items-center gap-4">
                            <MultiStateBadge state={badgeState} />
                            <Button size="sm" variant="secondary" onClick={cycleBadge}>
                                Próximo Estado
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-text text-center">Escolha seu Plano</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((p) => (
                        <div
                            key={p.name}
                            className="p-6 bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm shadow-lg hover:border-primary/30 transition-all">
                            <h3 className="text-2xl font-bold text-text mb-2">{p.name}</h3>
                            <p className="text-2xl text-primary font-bold mb-6">{p.price}</p>
                            <ul className="mt-4 space-y-3 text-sm text-muted mb-8">
                                {p.features.map((f) => (
                                    <li key={f} className="flex items-start">
                                        <span className="text-primary mr-2 mt-0.5">✓</span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button fullWidth>
                                Assinar
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

import React from "react";
import {
    StarIcon,
    FunnelIcon,
} from "@heroicons/react/24/outline";

export default function Reviews() {
    const reviews = [
        { id: 1, author: "Ana Silva", rating: 5, comment: "Evento incrível! Organização perfeita, tudo saiu como planejado. Recomendo muito!", event: "Workshop Design", time: "2h atrás", date: "26/01/2025" },
        { id: 2, author: "Carlos Lima", rating: 4, comment: "Muito bom, mas poderia ter mais opções de coffee break. No geral, valeu a pena!", event: "Tech Summit", time: "1 dia", date: "25/01/2025" },
        { id: 3, author: "Beatriz Costa", rating: 5, comment: "Simplesmente perfeito! Meu casamento foi um sonho realizado. Obrigada por tudo!", event: "Casamento Silva & Souza", time: "2 dias", date: "24/01/2025" },
        { id: 4, author: "Pedro Santos", rating: 3, comment: "Bom evento, mas o som estava muito alto em alguns momentos. Poderia melhorar.", event: "Festival de Verão", time: "3 dias", date: "23/01/2025" },
        { id: 5, author: "Juliana Alves", rating: 5, comment: "Adorei! Tudo muito bem organizado, equipe atenciosa e local lindo.", event: "Aniversário 50 anos", time: "5 dias", date: "21/01/2025" },
        { id: 6, author: "Roberto Lima", rating: 4, comment: "Evento legal, boa programação. Só achei um pouco caro para o que foi oferecido.", event: "Tech Summit", time: "1 semana", date: "19/01/2025" },
    ];

    const stats = {
        total: reviews.length,
        average: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
        fiveStars: reviews.filter(r => r.rating === 5).length,
        fourStars: reviews.filter(r => r.rating === 4).length,
        threeStars: reviews.filter(r => r.rating === 3).length,
    };

    return (
        <div className="min-h-screen bg-background text-text p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-black tracking-tight text-text mb-2">
                        Avaliações e Feedback
                    </h1>
                    <p className="text-muted">Veja o que os participantes estão dizendo sobre seus eventos</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-text">{stats.total}</div>
                        <div className="text-xs text-muted">Total</div>
                    </div>
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="flex items-center gap-1">
                            <div className="text-2xl font-black text-warning">{stats.average}</div>
                            <StarIcon className="w-5 h-5 text-warning fill-warning" />
                        </div>
                        <div className="text-xs text-muted">Média</div>
                    </div>
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-success">{stats.fiveStars}</div>
                        <div className="text-xs text-muted">5 Estrelas</div>
                    </div>
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-primary">{stats.fourStars}</div>
                        <div className="text-xs text-muted">4 Estrelas</div>
                    </div>
                    <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-4">
                        <div className="text-2xl font-black text-warning">{stats.threeStars}</div>
                        <div className="text-xs text-muted">3 Estrelas</div>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6 hover:border-primary/30 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-text font-bold">
                                        {review.author.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text">{review.author}</h3>
                                        <div className="flex gap-1 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.rating ? 'text-warning fill-warning' : 'text-muted'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-muted">{review.time}</div>
                                    <div className="text-xs text-text-disabled">{review.date}</div>
                                </div>
                            </div>

                            <p className="text-sm text-text mb-3">{review.comment}</p>

                            <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                                <span className="text-xs text-muted">Evento:</span>
                                <span className="text-xs font-bold text-primary">{review.event}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

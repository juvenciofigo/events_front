import React from "react";
import { useParams } from "react-router-dom";

export default function ServiceDetails() {
    const { id } = useParams();
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Detalhes do Serviço</h2>
            <div className="p-6 bg-surface/50 backdrop-blur-xl border border-white/10 rounded-xl">
                <p className="text-text-muted">Detalhes do serviço e álbum — em desenvolvimento</p>
            </div>
        </div>
    );
}

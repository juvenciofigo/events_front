import React from "react";
import { useParams } from "react-router-dom";

export default function EventAlbum() {
    const { id } = useParams();

    return (
        <div>
            <h2 className="text-2xl mb-4">Álbum do Evento {id}</h2>
            <div className="p-4 border rounded">Componente de upload / galeria aqui</div>
        </div>
    );
}

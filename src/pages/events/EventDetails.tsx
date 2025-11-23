import React from "react";
import { useParams, Link } from "react-router-dom";

export default function EventDetails() {
    const { id } = useParams();

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl">Detalhes do Evento {id}</h2>
                <div className="flex gap-2">
                    <Link
                        to={`/events/${id}/edit`}
                        className="px-3 py-2 bg-yellow-500 text-white rounded">
                        Editar
                    </Link>
                    <Link
                        to={`/events/${id}/album`}
                        className="px-3 py-2 bg-gray-600 text-white rounded">
                        Album
                    </Link>
                </div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                <p>Nome: —</p>
                <p>Tipo: —</p>
                <p>Datas: —</p>
                <p>Local: —</p>
                <p>Capacidade: —</p>
                <p>Status: draft</p>
            </div>
        </div>
    );
}

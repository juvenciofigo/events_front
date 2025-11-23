import React from "react";
import { useParams } from "react-router-dom";

export default function ChatRoom() {
    const { chatId } = useParams();

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-2xl mb-4">Chat {chatId}</h2>
            <div className="flex-1 p-4 bg-white dark:bg-gray-800 rounded mb-4">Mensagens (placeholder)</div>
            <div className="flex gap-2">
                <input
                    className="flex-1 border p-2 rounded"
                    placeholder="Digite uma mensagem"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded">Enviar</button>
            </div>
        </div>
    );
}

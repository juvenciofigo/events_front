import React from "react";
import { Link } from "react-router-dom";

export default function ChatList() {
    return (
        <div>
            <h2 className="text-2xl mb-4">Chats</h2>
            <div className="space-y-2">
                <Link
                    to="/chat/1"
                    className="block p-3 bg-white dark:bg-gray-800 rounded">
                    Chat do Evento #1
                </Link>
            </div>
        </div>
    );
}

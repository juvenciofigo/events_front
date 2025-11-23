import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl mb-2">404</h1>
                <p className="mb-4">Página não encontrada</p>
                <Link
                    to="/"
                    className="text-blue-600">
                    Voltar para home
                </Link>
            </div>
        </div>
    );
}

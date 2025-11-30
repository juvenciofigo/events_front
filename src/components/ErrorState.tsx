import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
    fullScreen?: boolean;
}

export default function ErrorState({
    title = "Ops! Algo deu errado",
    message = "Não foi possível carregar as informações. Tente novamente.",
    onRetry,
    fullScreen = false
}: ErrorStateProps) {
    const containerClasses = fullScreen
        ? "min-h-screen flex items-center justify-center bg-background p-4"
        : "flex flex-col items-center justify-center p-8 text-center h-full";

    return (
        <div className={containerClasses}>
            <div className="bg-error/10 p-4 rounded-full mb-4">
                <ExclamationTriangleIcon className="h-10 w-10 text-error" />
            </div>
            <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
            <p className="text-text-muted mb-6 max-w-md text-center">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors font-medium shadow-sm"
                >
                    Tentar Novamente
                </button>
            )}
        </div>
    );
}

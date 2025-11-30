import React from 'react';

interface LoadingProps {
    fullScreen?: boolean;
    text?: string;
}

export default function Loading({ fullScreen = false, text = "Carregando..." }: LoadingProps) {
    const containerClasses = fullScreen
        ? "fixed inset-0 flex items-center justify-center bg-background/80 z-50 backdrop-blur-sm"
        : "flex flex-col items-center justify-center p-8";

    return (
        <div className={`min-h-full ${containerClasses}`}>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            {text && <p className="mt-4 text-text-muted font-medium">{text}</p>}
        </div>
    );
}

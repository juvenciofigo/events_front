import React from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function Card({ children, className = "" }: Props) {
    return <div className={`p-4 bg-white dark:bg-surface text-black dark:text-white rounded shadow ${className}`}>{children}</div>;
}

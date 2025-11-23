import React from "react";

export default function Breadcrumbs({ items }: { items: Array<{ label: string; to?: string }> }) {
    return (
        <nav className="text-sm text-gray-500 mb-4">
            {items.map((it, idx) => (
                <span
                    key={idx}
                    className="mr-2">
                    {it.label}
                    {idx < items.length - 1 && " / "}
                </span>
            ))}
        </nav>
    );
}

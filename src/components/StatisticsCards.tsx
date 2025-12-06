import React from 'react';

interface StatisticsCardsProps {
    data: any;
    title?: any;
    icon?: any;
    color?: string;
    description?: any;
}

export function StatisticsCards({ data, title, icon, color, description }: StatisticsCardsProps) {
    return (
        <div className={`border flex justify-center items-center flex-col border-borderColor rounded p-1 gap-1 bg-surface/50 bg-gradient-to-br from-${color} to-transparent`}>
            <div className="flex items-center justify-between w-full px-2">
                <div className="text-muted text-sm whitespace-nowrap">{title}</div>
                {icon}
            </div>
            <div className="text-xl lg:text-2xl font-black text-text">{data}</div>
            <div className="text-xs text-text-muted whitespace-nowrap">{description}</div>
        </div>
    )
}

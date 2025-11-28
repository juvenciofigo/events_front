import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface data {
    stats: any | null,
    stats2: any | null,
    icon: React.ReactNode,
    percent: string | null,
    p1: string | null,
    p2: string | null,
    onClick?: () => void | null;
}

export default function CardDashboard({ icon, p1, p2, percent, stats, stats2, onClick }: data) {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };
    return (
        <div onClick={handleClick} className="bg-surface/50 backdrop-blur-xl border border-borderColor rounded p-4 hover:border-primary/30 transition-colors group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-1 bg-primary/10 rounded border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    {icon}
                </div>
                {percent && (
                    <span className="flex items-center text-xs font-bold text-success bg-success/10 px-2 py-1 rounded border border-success/20">
                        <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                        {percent}
                    </span>
                )}
            </div>
            <div className="text-xl font-black text-text-">{stats2}</div>
            <div className="text-sm text-muted">{p1}</div>
            <div className="text-xs text-text-muted mt-1">{p2}</div>
        </div>
    )
}

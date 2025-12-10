import React from 'react';
import { CreditCardIcon } from "@heroicons/react/24/outline";
import { formatCurrency } from '@/utils';

interface BreakdownItem {
    id: string;
    label: string;
    value: number;
    quantity: number;
    icon?: React.ReactNode;
    color?: string;
}

interface FinancialBreakdownProps {
    title: string;
    icon: React.ReactNode;
    items: BreakdownItem[];
    totalValue: number;
    emptyMessage?: string;
    variant?: 'default' | 'compact';
    className?: string;
}

export const FinancialBreakdown: React.FC<FinancialBreakdownProps> = ({
    title,
    icon,
    items,
    totalValue,
    emptyMessage = "Nenhum dado disponível.",
    variant = 'default',
    className = ''
}) => {
    const isCompact = variant === 'compact';


    // Default colors to cycle through if not provided
    const defaultColors = ['bg-purple-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-red-500', 'bg-orange-500'];

    return (
        <div className={`border-t border-borderColor pt-3 ${className}`}>
            <h3 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                {icon}
                {title}
            </h3>
            <div className={isCompact ? "grid grid-cols-1 md:grid-cols-2 gap-2" : "space-y-4"}>
                {items?.map((item, index) => {
                    const percentage = totalValue > 0 ? (item.value / totalValue) * 100 : 0;
                    const color = item.color || defaultColors[index % defaultColors.length];
                    const itemIcon = item.icon;

                    return (
                        <div
                            key={item.id}
                            className={`bg-white/5 rounded border border-borderColor ${isCompact ? 'p-3 text-sm' : 'p-4'}`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    {itemIcon ? (
                                        <>
                                            {itemIcon}
                                        </>
                                    ) : (
                                        <div className={`w-3 h-3 rounded-full ${color}`}></div>
                                    )}
                                    <span className="font-semibold text-text capitalize">{item.label}</span>
                                </div>
                                <span className={`font-bold ${isCompact ? 'text-text' : 'text-green-400'}`}>
                                    {formatCurrency(item.value)}
                                </span>
                            </div>
                            <div className="flex justify-between text-xs text-text-muted mb-2">
                                <span>{item.quantity} {isCompact ? 'transações' : 'vendidos'}</span>
                                <span>{percentage.toFixed(1)}% do total</span>
                            </div>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className={`h-full ${color}`} style={{ width: `${percentage}%` }}></div>
                            </div>
                        </div>
                    );
                })}
                {(!items || items.length === 0) && (
                    <div className={isCompact ? "col-span-full text-center text-text-muted py-8" : "text-center text-text-muted py-8"}>
                        {emptyMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

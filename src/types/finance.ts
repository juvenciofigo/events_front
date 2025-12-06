import { Page, PaymentMethod } from "./system";

export interface Transaction {
    id: string;
    date: string;
    guestName: string;
    guestId: string;
    seatName: string;
    amount: number;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
}

export interface PageTransaction extends Page<Transaction> { }

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface FinancialStats {
    totalRevenue: number;
    netRevenue: number;
    totalExpenses: number;
    totalFees: number;
    totalDiscounts: number;
    revenueBySeat: {
        seatName: string;
        revenue: number;
        quantity: number;
    }[];
    revenueByPaymentMethod: {
        method: string;
        revenue: number;
        quantity: number;
    }[];
    recentTransactions: Transaction[];
}
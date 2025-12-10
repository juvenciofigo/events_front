import { ProgressStatus } from "@/types/system";
import { Page, PaymentStatus } from "./system";

export interface Expense {
    id: string;
    title: string;
    category: string;
    description: string;
    amount: number;
    priority: string;
    status: ProgressStatus;
    paymentStatus: PaymentStatus;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface ExpensesSummary {
    totalExpenses: number;
    pendingExpenses: number;
    totalAmount: number;
}

export interface PageExpense extends Page<Expense> { }

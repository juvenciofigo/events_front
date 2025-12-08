import { ExpenseStatus } from "@/schemas/validation";
import { Page, PaymentStatus } from "./system";

export interface Expense {
    id: string;
    title: string;
    category: string;
    description: string;
    amount: number;
    priority: string;
    status: ExpenseStatus;
    paymentStatus: PaymentStatus;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface PageExpense extends Page<Expense> { }

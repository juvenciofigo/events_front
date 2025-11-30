// Types
export interface DashboardStats {
    totalEvents: number;
    ticketsSold: number;
    revenue: number;
    guests: number;
    hasEvents: boolean;
    hasPaidEvents: boolean;
    hasPrivateEvents: boolean;
}

export interface SalesChartData {
    day: string;
    sales: number;
}

export interface Task {
    id: number;
    title: string;
    event: string;
    deadline: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    taskStatus: "PENDING" | "IN_PROGRESS" | "DONE";
}

export interface Activity {
    id: number;
    type: "sale" | "confirmation" | "added" | "declined";
    name: string;
    initials: string;
    action: string;
    event: string;
    amount?: number;
    time: string;
}

export interface Supplier {
    id: number;
    name: string;
    service: string;
    status: "confirmed" | "pending" | "cancelled";
    payment: "paid" | "pending" | "partial" | "refunded";
}

export interface Message {
    id: number;
    from: string;
    message: string;
    event: string;
    time: string;
    unread: boolean;
}

export interface FinancialData {
    revenue: number;
    expenses: number;
    profit: number;
    projectedProfit: number;
}

export interface Feedback {
    id: number;
    author: string;
    rating: number;
    comment: string;
    event: string;
    time: string;
}

export interface WaitListPerson {
    id: number;
    name: string;
    email: string;
    event: string;
    position: number;
}

export interface Alert {
    id: number;
    type: "warning" | "success" | "info";
    message: string;
    action: string;
}

export interface UpcomingEvent {
    id: string;
    title: string;
    date: string;
    location: string | null;
    estimatedGuest: number;
}

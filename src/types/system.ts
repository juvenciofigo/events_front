export interface Page<T> {
    items: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
}

export interface query {
    page: number,
    limit: number,
    sort: string,
    searchQuery?: string,
}

export enum PaymentMethod {
    MPESA = "MPESA",
    // MKESH = "MKESH",
    // EMOLA = "EMOLA",
    // CARD = "CARD",
    // PAYPAL = "PAYPAL",
}

export enum PaymentStatus {
    PAID = "PAID",
    PENDING = "PENDING",
}

export const PaymentMethods = [
    { label: "MPESA", value: PaymentMethod.MPESA },
    // { label: "MKESH", value: PaymentMethod.MKESH },
    // { label: "EMOLA", value: PaymentMethod.EMOLA },
    // { label: "CARD", value: PaymentMethod.CARD },
    // { label: "PAYPAL", value: PaymentMethod.PAYPAL },
]

export enum Priority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}

export enum ProgressStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}

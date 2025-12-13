import { Page } from "./system";

export interface Event {
    id: string;
    title: string;
    category: string;
    isPublic: boolean;
    dateStart: string;
    dateEnd?: string;
    description?: string;
    coverImage?: string;
    location?: string;
    status?: string;
    budgetEstimated?: number;
    budgetSpent?: number;
    estimatedGuest?: number;
}


export interface PageEvent extends Page<Event> { }

import { Page } from "./system";

export interface Event {
    id: string;
    title: string;
    description?: string;
    dateStart: string;
    dateEnd?: string;
    location?: string;
    status?: string;
    coverImage?: string;
    category: string;
    budgetEstimated?: number;
    budgetSpent?: number;
    isPublic: boolean;
    estimatedGuest?: number;
}


export interface PageEvent extends Page<Event> { }

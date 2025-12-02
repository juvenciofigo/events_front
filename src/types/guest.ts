import { Page } from "./system";
import { Ticket } from "./ticket";

export interface Guest {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    ticket: Ticket;
    createdAt: string;
    updatedAt: string;
}

export interface PageGuest extends Page<Guest> { }

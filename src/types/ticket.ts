import { Seat } from "./seat";
import { Page } from "./system";

export interface Ticket {
    id: string;
    name: string;
    price: number;
    ticketCode: string;
    accessToken: string;
    totalPeople: number;
    notes: string;
    ticketStatus: string;
    sentAt: string;
    respondedAt: string;
    seat: Seat;
    createdAt: string;
    updatedAt: string;
}

export interface PageTicket extends Page<Ticket> { }
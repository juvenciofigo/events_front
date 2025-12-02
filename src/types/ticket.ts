import { Seat } from "./seat";
import { Page } from "./system";

type TicketStatus = 'PENDING' | 'CONFIRMED' | 'VALIDATED' | 'DECLINED';

export interface Ticket {
    id: string;
    ticketCode: string;
    accessToken: string;
    totalPeople: number;
    notes: string;
    ticketStatus: TicketStatus;
    sentAt: string;
    respondedAt: string;
    seat: Seat;
    createdAt: string;
    updatedAt: string;
}


export interface PageTicket extends Page<Ticket> { }
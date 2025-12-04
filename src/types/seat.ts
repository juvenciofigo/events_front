import { number } from "zod";
import { Page } from "./system";

export interface Seat {
    id: string;
    name: string;
    description?: string;
    totalSeats?: number;
    isPaid: boolean;
    price?: number | null;
    availableSeats?: number;
    layoutPositionX: number;
    layoutPositionY: number;
    createdAt: string;
    updatedAt: string;
}

export interface PageSeat extends Page<Seat> { }
import { Page } from "./system";

export interface Seat {
    id: string;
    name: string;
    description: string;
    totalSeats: number;
    availableSeats: number;
    layoutPositionX: number;
    layoutPositionY: number;
    createdAt: string;
    updatedAt: string;
}

export interface PageSeat extends Page<Seat> { }
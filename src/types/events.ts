import { Page } from "./system";

export interface Event {
    id: string;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
    organizer_id: string;
    category_id: string;
    image: string;
    status: string;
    attendees_count?: number;
}

export interface PageEvent extends Page<Event> { }

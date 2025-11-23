// Simple localStorage-backed mock API for events and seats
// simple id generator to avoid extra deps
function genId() {
    return String(Date.now()) + Math.floor(Math.random() * 1000);
}

const EVENTS_KEY = "mock_events_v1";

type EventData = {
    id: string;
    name: string;
    type?: string;
    description?: string;
    date?: string;
    location?: string;
    capacity?: number;
};

export async function getEvents(): Promise<EventData[]> {
    const raw = localStorage.getItem(EVENTS_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw) as EventData[];
    } catch {
        return [];
    }
}

export async function getEvent(id: string): Promise<EventData | null> {
    const all = await getEvents();
    return all.find((e) => e.id === id) ?? null;
}

export async function createEvent(data: Omit<EventData, "id">): Promise<EventData> {
    const all = await getEvents();
    const item: EventData = { ...(data as any), id: genId() };
    const next = [item, ...all];
    localStorage.setItem(EVENTS_KEY, JSON.stringify(next));
    return item;
}

export async function updateEvent(id: string, patch: Partial<EventData>): Promise<EventData | null> {
    const all = await getEvents();
    let updated: EventData | null = null;
    const next = all.map((e) => {
        if (e.id === id) {
            updated = { ...e, ...patch };
            return updated;
        }
        return e;
    });
    localStorage.setItem(EVENTS_KEY, JSON.stringify(next));
    return updated;
}

// Seats stored per event
function seatsKey(eventId: string) {
    return `mock_seats_v1:${eventId}`;
}

type Seat = { id: string; name: string; x: number; y: number; paid?: boolean; price?: number; totalSeats?: number; availableSeats?: number };

export async function getSeats(eventId: string): Promise<Seat[]> {
    const raw = localStorage.getItem(seatsKey(eventId));
    if (!raw) return [];
    try {
        return JSON.parse(raw) as Seat[];
    } catch {
        return [];
    }
}

export async function createSeat(eventId: string, seat: Omit<Seat, "id">): Promise<Seat> {
    const all = await getSeats(eventId);
    const s: Seat = { ...seat, id: genId() };
    const next = [...all, s];
    localStorage.setItem(seatsKey(eventId), JSON.stringify(next));
    return s;
}

export async function updateSeat(eventId: string, seatId: string, patch: Partial<Seat>): Promise<Seat | null> {
    const all = await getSeats(eventId);
    let updated: Seat | null = null;
    const next = all.map((s) => {
        if (s.id === seatId) {
            updated = { ...s, ...patch };
            return updated;
        }
        return s;
    });
    localStorage.setItem(seatsKey(eventId), JSON.stringify(next));
    return updated;
}

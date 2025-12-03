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


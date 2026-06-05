import { Event } from "../models/eventModel";

let events: Event[] = [];

export const getAllEvents = (): Event[] => {
    return events;
};

export const getEventById = (id: string): Event | undefined => {
    return events.find((event) => event.id === id);
};

export const createEvent = (eventData: Event): Event => {
    const now = new Date().toISOString();

    const newEvent: Event = {
        id: Date.now().toString(),
        ...eventData,
        createdAt: now,
        updatedAt: now,
    };

    events.push(newEvent);
    return newEvent;
};

export const updateEvent = (
    id: string,
    eventData: Partial<Event>
): Event | undefined => {
    const eventIndex = events.findIndex((event) => event.id === id);

    if (eventIndex === -1) {
        return undefined;
    }

    events[eventIndex] = {
        ...events[eventIndex],
        ...eventData,
        id,
        updatedAt: new Date().toISOString(),
    };

    return events[eventIndex];
};

export const deleteEvent = (id: string): boolean => {
    const originalLength = events.length;
    events = events.filter((event) => event.id !== id);

    return events.length < originalLength;
};

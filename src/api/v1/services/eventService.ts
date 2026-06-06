import { Event } from "../models/eventModel";
import {
    createEventDocument,
    deleteEventDocument,
    getAllEventDocuments,
    getEventDocumentById,
    updateEventDocument,
} from "../repositories/eventRepository";

export const getAllEvents = async (): Promise<Event[]> => {
    return getAllEventDocuments();
};

export const getEventById = async (
    id: string
): Promise<Event | null> => {
    return getEventDocumentById(id);
};

export const createEvent = async (
    eventData: Event
): Promise<Event> => {
    return createEventDocument(eventData);
};

export const updateEvent = async (
    id: string,
    eventData: Partial<Event>
): Promise<Event | null> => {
    return updateEventDocument(id, eventData);
};

export const deleteEvent = async (
    id: string
): Promise<boolean> => {
    return deleteEventDocument(id);
};

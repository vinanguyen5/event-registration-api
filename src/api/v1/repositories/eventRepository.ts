import { db } from "../../../../config/firebaseConfig";
import { Event } from "../models/eventModel";

const COLLECTION_NAME = "events";

export const getAllEventDocuments = async (): Promise<Event[]> => {
    const snapshot = await db.collection(COLLECTION_NAME).get();

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Event, "id">),
    }));
};

export const getEventDocumentById = async (
    id: string
): Promise<Event | null> => {
    const doc = await db.collection(COLLECTION_NAME).doc(id).get();

    if (!doc.exists) {
        return null;
    }

    return {
        id: doc.id,
        ...(doc.data() as Omit<Event, "id">),
    };
};

export const createEventDocument = async (
    eventData: Event
): Promise<Event> => {
    const now = new Date().toISOString();

    const eventToCreate: Omit<Event, "id"> = {
        ...eventData,
        createdAt: now,
        updatedAt: now,
    };

    const docRef = await db.collection(COLLECTION_NAME).add(eventToCreate);

    return {
        id: docRef.id,
        ...eventToCreate,
    };
};

export const updateEventDocument = async (
    id: string,
    eventData: Partial<Event>
): Promise<Event | null> => {
    const docRef = db.collection(COLLECTION_NAME).doc(id);
    const existingDoc = await docRef.get();

    if (!existingDoc.exists) {
        return null;
    }

    const updatedData = {
        ...eventData,
        updatedAt: new Date().toISOString(),
    };

    await docRef.update(updatedData);

    const updatedDoc = await docRef.get();

    return {
        id: updatedDoc.id,
        ...(updatedDoc.data() as Omit<Event, "id">),
    };
};

export const deleteEventDocument = async (
    id: string
): Promise<boolean> => {
    const docRef = db.collection(COLLECTION_NAME).doc(id);
    const existingDoc = await docRef.get();

    if (!existingDoc.exists) {
        return false;
    }

    await docRef.delete();
    return true;
};

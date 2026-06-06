import { Request, Response } from "express";
import {
    createEvent,
    deleteEvent,
    getAllEvents,
    getEventById,
    updateEvent,
} from "../services/eventService";

export const getEvents = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const events = await getAllEvents();

        res.status(200).json({
            message: "Events retrieved successfully",
            data: events,
        });
    } catch {
        res.status(500).json({
            message: "Failed to retrieve events",
        });
    }
};

export const getEvent = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = req.params.id as string;
        const event = await getEventById(id);

        if (!event) {
            res.status(404).json({
                message: "Event not found",
            });
            return;
        }

        res.status(200).json({
            message: "Event retrieved successfully",
            data: event,
        });
    } catch {
        res.status(500).json({
            message: "Failed to retrieve event",
        });
    }
};

export const addEvent = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const event = await createEvent(req.body);

        res.status(201).json({
            message: "Event created successfully",
            data: event,
        });
    } catch {
        res.status(500).json({
            message: "Failed to create event",
        });
    }
};

export const editEvent = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = req.params.id as string;
        const event = await updateEvent(id, req.body);

        if (!event) {
            res.status(404).json({
                message: "Event not found",
            });
            return;
        }

        res.status(200).json({
            message: "Event updated successfully",
            data: event,
        });
    } catch {
        res.status(500).json({
            message: "Failed to update event",
        });
    }
};

export const removeEvent = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = req.params.id as string;
        const deleted = await deleteEvent(id);

        if (!deleted) {
            res.status(404).json({
                message: "Event not found",
            });
            return;
        }

        res.status(200).json({
            message: "Event deleted successfully",
        });
    } catch {
        res.status(500).json({
            message: "Failed to delete event",
        });
    }
};

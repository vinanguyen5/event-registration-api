import { Request, Response } from "express";
import {
    createEvent,
    deleteEvent,
    getAllEvents,
    getEventById,
    updateEvent,
} from "../services/eventService";

export const getEvents = (_req: Request, res: Response): void => {
    res.status(200).json({
        message: "Events retrieved successfully",
        data: getAllEvents(),
    });
};

export const getEvent = (req: Request, res: Response): void => {
    const id = req.params.id as string;
    const event = getEventById(id);

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
};

export const addEvent = (req: Request, res: Response): void => {
    const event = createEvent(req.body);

    res.status(201).json({
        message: "Event created successfully",
        data: event,
    });
};

export const editEvent = (req: Request, res: Response): void => {
    const id = req.params.id as string;
    const event = updateEvent(id, req.body);

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
};

export const removeEvent = (req: Request, res: Response): void => {
    const id = req.params.id as string;
    const deleted = deleteEvent(id);

    if (!deleted) {
        res.status(404).json({
            message: "Event not found",
        });
        return;
    }

    res.status(200).json({
        message: "Event deleted successfully",
    });
};

import { Router } from "express";
import {
    addEvent,
    editEvent,
    getEvent,
    getEvents,
    removeEvent,
} from "../controllers/eventController";
import { validateRequest } from "../middleware/validateRequest";
import {
    createEventSchema,
    updateEventSchema,
} from "../validation/eventValidation";

const router = Router();

/**
 * @openapi
 * /events:
 *   get:
 *     summary: Get all events
 *     description: Returns a list of all event registrations.
 *     tags:
 *       - Events
 *     responses:
 *       "200":
 *         description: Events retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Events retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Event"
 */
router.get("/", getEvents);

/**
 * @openapi
 * /events/{id}:
 *   get:
 *     summary: Get one event
 *     description: Returns a single event by ID.
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Event ID.
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       "200":
 *         description: Event retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event retrieved successfully
 *                 data:
 *                   $ref: "#/components/schemas/Event"
 *       "404":
 *         description: Event not found.
 */
router.get("/:id", getEvent);

/**
 * @openapi
 * /events:
 *   post:
 *     summary: Create a new event
 *     description: Creates a new event registration record.
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateEvent"
 *     responses:
 *       "201":
 *         description: Event created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event created successfully
 *                 data:
 *                   $ref: "#/components/schemas/Event"
 *       "400":
 *         description: Validation error.
 */
router.post("/", validateRequest(createEventSchema), addEvent);

/**
 * @openapi
 * /events/{id}:
 *   put:
 *     summary: Update an event
 *     description: Updates an existing event by ID.
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Event ID.
 *         schema:
 *           type: string
 *           example: "1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateEvent"
 *     responses:
 *       "200":
 *         description: Event updated successfully.
 *       "400":
 *         description: Validation error.
 *       "404":
 *         description: Event not found.
 */
router.put("/:id", validateRequest(updateEventSchema), editEvent);

/**
 * @openapi
 * /events/{id}:
 *   delete:
 *     summary: Delete an event
 *     description: Deletes an event by ID.
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Event ID.
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       "200":
 *         description: Event deleted successfully.
 *       "404":
 *         description: Event not found.
 */
router.delete("/:id", removeEvent);

export default router;

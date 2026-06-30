import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - date
 *         - capacity
 *       properties:
 *         id:
 *           type: string
 *           description: Unique event identifier.
 *           example: "1"
 *         name:
 *           type: string
 *           description: Name of the event.
 *           example: "Tech Workshop"
 *         date:
 *           type: string
 *           format: date-time
 *           description: Future date and time of the event.
 *           example: "2026-09-15T18:00:00.000Z"
 *         capacity:
 *           type: integer
 *           minimum: 5
 *           description: Maximum number of attendees.
 *           example: 50
 *         registrationCount:
 *           type: integer
 *           minimum: 0
 *           description: Number of currently registered attendees.
 *           example: 10
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - cancelled
 *             - completed
 *           example: active
 *         category:
 *           type: string
 *           enum:
 *             - conference
 *             - workshop
 *             - meetup
 *             - seminar
 *             - general
 *             - networking
 *           example: workshop
 *
 *     CreateEvent:
 *       type: object
 *       required:
 *         - name
 *         - date
 *         - capacity
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           example: "Tech Workshop"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2026-09-15T18:00:00.000Z"
 *         capacity:
 *           type: integer
 *           minimum: 5
 *           example: 50
 *         registrationCount:
 *           type: integer
 *           minimum: 0
 *           example: 0
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - cancelled
 *             - completed
 *           example: active
 *         category:
 *           type: string
 *           enum:
 *             - conference
 *             - workshop
 *             - meetup
 *             - seminar
 *             - general
 *             - networking
 *           example: workshop
 *
 *     UpdateEvent:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           example: "Updated Tech Workshop"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2026-10-01T18:00:00.000Z"
 *         capacity:
 *           type: integer
 *           minimum: 5
 *           example: 75
 *         registrationCount:
 *           type: integer
 *           minimum: 0
 *           example: 12
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - cancelled
 *             - completed
 *           example: active
 *         category:
 *           type: string
 *           enum:
 *             - conference
 *             - workshop
 *             - meetup
 *             - seminar
 *             - general
 *             - networking
 *           example: networking
 *
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Validation failed
 *         details:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "name is required"
 */
export const createEventSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required(),

    date: Joi.date()
        .iso()
        .greater("now")
        .required(),

    capacity: Joi.number()
        .integer()
        .min(5)
        .required(),

    registrationCount: Joi.number()
        .integer()
        .min(0)
        .max(Joi.ref("capacity"))
        .default(0),

    status: Joi.string()
        .valid("active", "cancelled", "completed")
        .default("active"),

    category: Joi.string()
        .valid("conference", "workshop", "meetup", "seminar", "general", "networking")
        .default("general"),
});

export const updateEventSchema = createEventSchema.fork(
    ["name", "date", "capacity"],
    (schema) => schema.optional()
);

import Joi from "joi";

export const createEventSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.empty": "Name is required",
            "string.min": "Name must be at least 3 characters",
            "string.max": "Name must be less than or equal to 100 characters",
            "any.required": "Name is required",
        }),

    description: Joi.string()
        .min(10)
        .max(500)
        .required()
        .messages({
            "string.empty": "Description is required",
            "string.min": "Description must be at least 10 characters",
            "string.max": "Description must be less than or equal to 500 characters",
            "any.required": "Description is required",
        }),

    date: Joi.string()
        .isoDate()
        .required()
        .messages({
            "string.empty": "Date is required",
            "string.isoDate": "Date must be a valid ISO date",
            "any.required": "Date is required",
        }),

    location: Joi.string()
        .min(3)
        .max(150)
        .required()
        .messages({
            "string.empty": "Location is required",
            "string.min": "Location must be at least 3 characters",
            "string.max": "Location must be less than or equal to 150 characters",
            "any.required": "Location is required",
        }),

    capacity: Joi.number()
        .integer()
        .min(1)
        .max(1000)
        .required()
        .messages({
            "number.base": "Capacity must be a number",
            "number.integer": "Capacity must be an integer",
            "number.min": "Capacity must be at least 1",
            "number.max": "Capacity must be less than or equal to 1000",
            "any.required": "Capacity is required",
        }),

    category: Joi.string()
        .valid("conference", "workshop", "seminar", "webinar")
        .required()
        .messages({
            "any.only": "Category must be one of conference, workshop, seminar, webinar",
            "any.required": "Category is required",
            "string.empty": "Category is required",
        }),

    status: Joi.string()
        .valid("draft", "published", "cancelled")
        .default("draft")
        .messages({
            "any.only": "Status must be one of draft, published, cancelled",
        }),

    price: Joi.number()
        .min(0)
        .max(10000)
        .default(0)
        .messages({
            "number.base": "Price must be a number",
            "number.min": "Price must be at least 0",
            "number.max": "Price must be less than or equal to 10000",
        }),

    organizerEmail: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Organizer email is required",
            "string.email": "Organizer email must be a valid email address",
            "any.required": "Organizer email is required",
        }),
});

export const updateEventSchema = createEventSchema.fork(
    [
        "name",
        "description",
        "date",
        "location",
        "capacity",
        "category",
        "organizerEmail",
    ],
    (schema) => schema.optional()
);

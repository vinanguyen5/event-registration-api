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

router.get("/", getEvents);
router.get("/:id", getEvent);
router.post("/", validateRequest(createEventSchema), addEvent);
router.put("/:id", validateRequest(updateEventSchema), editEvent);
router.delete("/:id", removeEvent);

export default router;

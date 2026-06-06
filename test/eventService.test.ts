import {
    createEvent,
    deleteEvent,
    getAllEvents,
    getEventById,
    updateEvent,
} from "../src/api/v1/services/eventService";
import { Event } from "../src/api/v1/models/eventModel";

describe("eventService", () => {
    const sampleEvent: Event = {
        name: "Tech Workshop",
        description: "A beginner friendly technology workshop",
        date: "2026-07-15T18:00:00.000Z",
        location: "Winnipeg",
        capacity: 50,
        category: "workshop",
        status: "published",
        price: 25,
        organizerEmail: "vina@example.com",
    };

    it("should create an event", () => {
        // Arrange & Act
        const event = createEvent(sampleEvent);

        // Assert
        expect(event.id).toBeDefined();
        expect(event.name).toBe("Tech Workshop");
    });

    it("should get all events", () => {
        // Arrange
        createEvent(sampleEvent);

        // Act
        const events = getAllEvents();

        // Assert
        expect(events.length).toBeGreaterThan(0);
    });

    it("should get an event by id", () => {
        // Arrange
        const createdEvent = createEvent(sampleEvent);

        // Act
        const foundEvent = getEventById(createdEvent.id as string);

        // Assert
        expect(foundEvent).toBeDefined();
        expect(foundEvent?.id).toBe(createdEvent.id);
    });

    it("should update an event", () => {
        // Arrange
        const createdEvent = createEvent(sampleEvent);

        // Act
        const updatedEvent = updateEvent(createdEvent.id as string, {
            name: "Updated Tech Workshop",
        });

        // Assert
        expect(updatedEvent).toBeDefined();
        expect(updatedEvent?.name).toBe("Updated Tech Workshop");
    });

    it("should delete an event", () => {
        // Arrange
        const createdEvent = createEvent(sampleEvent);

        // Act
        const deleted = deleteEvent(createdEvent.id as string);

        // Assert
        expect(deleted).toBe(true);
    });
});

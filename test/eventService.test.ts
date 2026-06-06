import {
    createEvent,
    deleteEvent,
    getAllEvents,
    getEventById,
    updateEvent,
} from "../src/api/v1/services/eventService";
import { Event } from "../src/api/v1/models/eventModel";
import {
    createEventDocument,
    deleteEventDocument,
    getAllEventDocuments,
    getEventDocumentById,
    updateEventDocument,
} from "../src/api/v1/repositories/eventRepository";

jest.mock("../src/api/v1/repositories/eventRepository");

const mockCreateEventDocument = createEventDocument as jest.Mock;
const mockDeleteEventDocument = deleteEventDocument as jest.Mock;
const mockGetAllEventDocuments = getAllEventDocuments as jest.Mock;
const mockGetEventDocumentById = getEventDocumentById as jest.Mock;
const mockUpdateEventDocument = updateEventDocument as jest.Mock;

describe("eventService", () => {
    const sampleEvent: Event = {
        id: "abc123",
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

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create an event using the repository", async () => {
        // Arrange
        mockCreateEventDocument.mockResolvedValue(sampleEvent);

        // Act
        const event = await createEvent(sampleEvent);

        // Assert
        expect(mockCreateEventDocument).toHaveBeenCalledWith(sampleEvent);
        expect(event.id).toBe("abc123");
        expect(event.name).toBe("Tech Workshop");
    });

    it("should get all events using the repository", async () => {
        // Arrange
        mockGetAllEventDocuments.mockResolvedValue([sampleEvent]);

        // Act
        const events = await getAllEvents();

        // Assert
        expect(mockGetAllEventDocuments).toHaveBeenCalled();
        expect(events).toHaveLength(1);
    });

    it("should get an event by id using the repository", async () => {
        // Arrange
        mockGetEventDocumentById.mockResolvedValue(sampleEvent);

        // Act
        const event = await getEventById("abc123");

        // Assert
        expect(mockGetEventDocumentById).toHaveBeenCalledWith("abc123");
        expect(event?.id).toBe("abc123");
    });

    it("should update an event using the repository", async () => {
        // Arrange
        const updatedEvent = {
            ...sampleEvent,
            name: "Updated Tech Workshop",
        };
        mockUpdateEventDocument.mockResolvedValue(updatedEvent);

        // Act
        const event = await updateEvent("abc123", {
            name: "Updated Tech Workshop",
        });

        // Assert
        expect(mockUpdateEventDocument).toHaveBeenCalledWith("abc123", {
            name: "Updated Tech Workshop",
        });
        expect(event?.name).toBe("Updated Tech Workshop");
    });

    it("should delete an event using the repository", async () => {
        // Arrange
        mockDeleteEventDocument.mockResolvedValue(true);

        // Act
        const deleted = await deleteEvent("abc123");

        // Assert
        expect(mockDeleteEventDocument).toHaveBeenCalledWith("abc123");
        expect(deleted).toBe(true);
    });
});

import { createEventSchema } from "../src/api/v1/validation/eventValidation";

describe("createEventSchema", () => {
    const validEvent = {
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

    it("should validate a valid event", () => {
        // Arrange & Act
        const result = createEventSchema.validate(validEvent);

        // Assert
        expect(result.error).toBeUndefined();
    });

    it("should require the name field", () => {
        // Arrange
        const invalidEvent = {
            ...validEvent,
            name: undefined,
        };

        // Act
        const result = createEventSchema.validate(invalidEvent);

        // Assert
        expect(result.error?.details[0].message).toBe("Name is required");
    });

    it("should reject invalid category values", () => {
        // Arrange
        const invalidEvent = {
            ...validEvent,
            category: "party",
        };

        // Act
        const result = createEventSchema.validate(invalidEvent);

        // Assert
        expect(result.error?.details[0].message).toBe(
            "Category must be one of conference, workshop, seminar, webinar"
        );
    });

    it("should reject capacity below minimum", () => {
        // Arrange
        const invalidEvent = {
            ...validEvent,
            capacity: 0,
        };

        // Act
        const result = createEventSchema.validate(invalidEvent);

        // Assert
        expect(result.error?.details[0].message).toBe(
            "Capacity must be at least 1"
        );
    });
});

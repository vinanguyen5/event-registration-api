import { createEventSchema } from "../src/api/v1/validation/eventValidation";

describe("createEventSchema", () => {
    const validEvent = {
        name: "Tech Conference 2027",
        date: "2027-12-25T09:00:00.000Z",
        capacity: 200,
        registrationCount: 50,
        status: "active",
        category: "conference",
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
            date: "2027-12-25T09:00:00.000Z",
            capacity: 200,
        };

        // Act
        const result = createEventSchema.validate(invalidEvent);

        // Assert
        expect(result.error?.details[0].message).toBe("\"name\" is required");
    });

    it("should reject names shorter than 3 characters", () => {
        // Arrange
        const invalidEvent = {
            ...validEvent,
            name: "AB",
        };

        // Act
        const result = createEventSchema.validate(invalidEvent);

        // Assert
        expect(result.error?.details[0].message).toBe(
            "\"name\" length must be at least 3 characters long"
        );
    });

    it("should reject capacity below 5", () => {
        // Arrange
        const invalidEvent = {
            ...validEvent,
            capacity: 4,
        };

        // Act
        const result = createEventSchema.validate(invalidEvent);

        // Assert
        expect(result.error?.details[0].message).toBe(
            "\"capacity\" must be greater than or equal to 5"
        );
    });

    it("should apply default values", () => {
        // Arrange
        const eventWithoutOptionalFields = {
            name: "ABC",
            date: "2027-12-25T09:00:00.000Z",
            capacity: 100,
        };

        // Act
        const result = createEventSchema.validate(eventWithoutOptionalFields);

        // Assert
        expect(result.value.registrationCount).toBe(0);
        expect(result.value.status).toBe("active");
        expect(result.value.category).toBe("general");
    });
});

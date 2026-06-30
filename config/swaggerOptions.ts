import swaggerJsdoc from "swagger-jsdoc";

const swaggerServerUrl =
    process.env.SWAGGER_SERVER_URL || "http://localhost:3000/api/v1";

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Event Registration API Documentation",
            version: "1.0.0",
            description:
                "API documentation for the Event Registration application.",
        },
        servers: [
            {
                url: swaggerServerUrl,
                description: "API server",
            },
        ],
    },
    apis: [
        "./src/api/v1/routes/*.ts",
        "./src/api/v1/validation/*.ts",
        "./src/api/v1/models/*.ts",
    ],
};

export const generateSwaggerSpec = (): object => {
    return swaggerJsdoc(swaggerOptions);
};

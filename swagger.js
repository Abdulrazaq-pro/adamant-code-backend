import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:5000", // your base URL
      },
    ],
  },
  apis: ["./routes/*.js"], // path to your route files with docs
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };

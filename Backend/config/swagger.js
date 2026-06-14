const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Project Management API",
      version: "1.0.0",
      description: "REST API for a Project Management System with RBAC",
    },
    servers: [
      {
        url: "/api/v1",
        description: "API Base URL",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "Sahil" },
            email: { type: "string", example: "sahil@example.com" },
            password: { type: "string", example: "password123" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "sahil@example.com" },
            password: { type: "string", example: "password123" },
          },
        },
        CreateProjectRequest: {
          type: "object",
          required: ["title"],
          properties: {
            title: { type: "string", example: "CRM System" },
            description: { type: "string", example: "A CRM project" },
          },
        },
        UpdateRoleRequest: {
          type: "object",
          required: ["role"],
          properties: {
            role: { type: "string", enum: ["USER", "MANAGER", "ADMIN"] },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs available at /api-docs");
};

module.exports = { swaggerDocs };
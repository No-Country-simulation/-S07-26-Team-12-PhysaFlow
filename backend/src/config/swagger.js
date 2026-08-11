import swaggerJsdoc from "swagger-jsdoc";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "PhysaFlow API",
      version: "1.0.0",
      description:
        "Backend API para el Stranded Capacity Calculator de PhysaFlow",
    },
    contact: {
      name: "PhysaFlow Team",
    },
    license: {
      name: "MIT",
    },
    servers: [
      // TODO: añadir servidor de prod cuando se despliegue con docker
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Development server",
      },
    ],

    // ── Tags ────────────────────────────────────────────
    // Organizan los endpoints en Swagger UI por categoría
    tags: [
      { name: "Health", description: "Estado del servidor" },
      { name: "Lead", description: "Gestión de leads" },
      { name: "Calculation", description: "Cálculos de capacidad varada" },
      { name: "SharedResult", description: "Resultados compartidos" },
    ],

    // ── Components ──────────────────────────────────────
    components: {
      schemas: {
        // ── Modelos ────────────────────────────────────
        Lead: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "d290f1ee-6c54-4b01-90e6-d701748f0851",
            },
            name: {
              type: "string",
              example: "Juan Pérez",
            },
            email: {
              type: "string",
              format: "email",
              example: "juan@example.com",
            },
            source: {
              type: "string",
              enum: ["direct", "shared"],
              example: "direct",
            },
            status: {
              type: "string",
              enum: ["new", "contacted", "converted"],
              example: "new",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Calculation: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            },
            lead_id: {
              type: "string",
              format: "uuid",
              example: "d290f1ee-6c54-4b01-90e6-d701748f0851",
            },
            facility_size_mw: {
              type: "number",
              format: "float",
              example: 100,
            },
            utilization_percentage: {
              type: "number",
              format: "float",
              example: 75.5,
            },
            cooling_type: {
              type: "string",
              enum: ["air", "liquid", "immersion"],
              example: "liquid",
            },
            stranded_capacity_percent: {
              type: "number",
              format: "float",
              example: 12.3,
            },
            stranded_capacity_mw: {
              type: "number",
              format: "float",
              example: 12.3,
            },
            annual_loss_min: {
              type: "number",
              format: "float",
              example: 50000,
            },
            annual_loss_max: {
              type: "number",
              format: "float",
              example: 80000,
            },
            formula_version: {
              type: "string",
              example: "1.0.0",
            },
            calculator_type: {
              type: "string",
              enum: ["basic", "advanced"],
              example: "advanced",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        SharedResult: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
            },
            calculation_id: {
              type: "string",
              format: "uuid",
              example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            },
            view_count: {
              type: "integer",
              example: 0,
            },
            share_token: {
              type: "string",
              example: "abc123xyz789",
            },
            expiresAt: {
              type: "string",
              format: "date-time",
              example: "2026-08-10T12:00:00.000Z",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },

      // ── Respuestas reutilizables ─────────────────────
      // Sprint 2: usar desde endpoints con $ref:
      //   400: { $ref: '#/components/responses/BadRequest' }
      //   404: { $ref: '#/components/responses/NotFound' }
      //   422: { $ref: '#/components/responses/ValidationError' }
      //   500: { $ref: '#/components/responses/InternalServerError' }
      responses: {
        BadRequest: {
          description: "Datos de entrada inválidos",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: false,
                  },
                  message: {
                    type: "string",
                    example: "Datos de entrada inválidos",
                  },
                  error: {
                    type: "string",
                    example: "El campo email es requerido",
                  },
                },
              },
            },
          },
        },
        NotFound: {
          description: "Recurso no encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: false,
                  },
                  message: {
                    type: "string",
                    example: "Recurso no encontrado",
                  },
                  error: {
                    type: "string",
                    example: "No se encontró el registro con el id especificado",
                  },
                },
              },
            },
          },
        },
        ValidationError: {
          description: "Error de validación",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: false,
                  },
                  message: {
                    type: "string",
                    example: "Error de validación",
                  },
                  errors: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        field: {
                          type: "string",
                          example: "email",
                        },
                        message: {
                          type: "string",
                          example: "El formato del email no es válido",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        InternalServerError: {
          description: "Error interno del servidor",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: false,
                  },
                  message: {
                    type: "string",
                    example: "Error interno del servidor",
                  },
                  error: {
                    type: "string",
                    example: "Error inesperado",
                  },
                },
              },
            },
          },
        },
      },

      // TODO: agregar securitySchemes cuando se implemente autenticación (Sprint 2+)
      // securitySchemes: {
      //   bearerAuth: {
      //     type: "http",
      //     scheme: "bearer",
      //     bearerFormat: "JWT",
      //   },
      // },
    },
  },

  // Lee automáticamente los archivos js en src/routes para documentar endpoints
  apis: [join(__dirname, "..", "routes", "**", "*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

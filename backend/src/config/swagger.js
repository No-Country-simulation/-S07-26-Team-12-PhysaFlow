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
      // TODO:añadir servidor de prod cuando se despliegue con docker
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Development server",
      },
    ],
    components: {},
    schemas: {
      /*
      TODO: Actualizar schemas cuando se definan los modelos de BD en src/models/

      Calculation
      Lead
      SharedResult

      Luego utilizarlos en las rutas usando:
      schema:
      $ref: '#/components/schemas/Calculation'
      */
    },
  },
  //esto es para actualizar las rutas de acuerdo a los archivos js en src/routes
  apis: [join(__dirname, "..", "routes", "**", "*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import indexRouter from "./routes/index.routes.js";
import swaggerSpec from "./config/swagger.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Rutas madres
app.use("/api", indexRouter);

// TODO: en prod deshabilitar /api-docs o proteger con auth
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "PhysaFlow API Docs",
  }),
);

app.use("/health", () => {
  res.status(200).json("✅ El servidor esta corriendo correctamente");
});

// Lenvantar el servidor node.js y de base de datos
app.listen(PORT, () => {
  console.log("✅ El servidor esta corriendo correctamente");
});

import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import indexRouter from "./routes/index.routes.js";
import "./models/index.models.js";

import { sequelize, connectDB } from "./config/database.js";

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
const startServer = async () => {
  await connectDB(); // TODO: reemplazar sync() con migraciones cuando los modelos esten estables
  await sequelize.sync({ alter: true });
  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  });
};

startServer();

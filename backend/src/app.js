import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import { sequelize, connectDB } from "./config/database.js";
import "./models/index.models.js";
import indexRouter from "./routes/index.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import AppError from "./utils/AppError.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
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

app.use("/health", (req, res) => {
  res.status(200).json("✅ El servidor esta corriendo correctamente");
});

// Middleware centralizado de errores
app.use(errorHandler);

// Lenvantar el servidor node.js y de base de datos
const startServer = async () => {
  await connectDB();

  await sequelize.sync({ alter: true });
  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  });
};

startServer();

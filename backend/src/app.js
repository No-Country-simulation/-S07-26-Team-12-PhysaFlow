import "dotenv/config";
import express from "express";
import cors from "cors";
import indexRouter from "./src/routes/index.router";
import { errorHandler } from "./src/middlewares/errorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors());

app.use("/api.health", indexRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("✅ El servidor esta corriendo correctamente")
})
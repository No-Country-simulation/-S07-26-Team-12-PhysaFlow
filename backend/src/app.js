import "dotenv/config";
import express from "express";
import cors from "cors";
import indexRouter from "./src/routes/index.router";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors());

app.use("/api", indexRouter);

app.use("/health", () => {
    res.status(200).json("✅ El servidor esta corriendo correctamente")
})

app.listen(PORT, () => {
    console.log("✅ El servidor esta corriendo correctamente")
})
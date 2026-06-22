import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import eventRoutes from "./api/v1/routes/eventRoutes";
import { getHelmetConfig } from "../config/helmetConfig";
import { getCorsOptions } from "../config/corsConfig";
import setupSwagger from "../config/swagger";

dotenv.config();

const app = express();

app.use(getHelmetConfig());
app.use(cors(getCorsOptions()));
app.use(express.json());
app.use(morgan("dev"));

setupSwagger(app);

app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Event Registration API is running",
    });
});

app.use("/api/v1/events", eventRoutes);

export default app;

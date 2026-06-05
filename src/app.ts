import express from "express";
import cors from "cors";
import morgan from "morgan";
import eventRoutes from "./api/v1/routes/eventRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Event Registration API is running",
    });
});

app.use("/api/v1/events", eventRoutes);

export default app;

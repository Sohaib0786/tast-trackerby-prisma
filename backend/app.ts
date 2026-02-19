import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";

const app: Application = express();

/* -------------------------- Middleware -------------------------- */

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// JSON parser
app.use(express.json());

/* ---------------------------- Routes ---------------------------- */

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({ message: "API is running 🚀" });
});

// Auth routes
app.use("/api/auth", authRoutes);

// Task routes
app.use("/api/tasks", taskRoutes);

/* ------------------------ 404 Handler --------------------------- */

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

/* --------------------- Global Error Handler --------------------- */

app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Server Error:", err.message);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
);

export default app;

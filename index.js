import express from "express";
import cors from "cors";
import dbRegistrationRouter from "./database-route/database-register.js";
import dbAuthRouter from "./database-route/database-authentication.js";

const app = express();

app.use(express.json());
app.use("/v1/registration", dbRegistrationRouter);
app.use("/v1/authentication", dbAuthRouter);
app.use(
  cors({
    origin: "https://next-js-demo-lilac-one.vercel.app", // Allow only your frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Explicitly include OPTIONS for preflight
    credentials: true,
  }),
);

// Home route - HTML
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

// Example API endpoint - JSON
app.get("/api-data", (req, res) => {
  res.json({
    message: "Here is some sample API data",
    items: ["apple", "banana", "cherry"],
  });
});

// Health check
app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

export default app;

import express from "express";
import cors from "cors";
import dbRegistrationRouter from "./database-route/database-register.js";
import dbAuthRouter from "./database-route/database-authentication.js";

const app = express();
const corsOptions = {
  origin: "https://next-js-demo-lilac-one.vercel.app", // Allow only your frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Explicitly include OPTIONS for preflight
  credentials: true,
};

// Enable cors
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Body parser
app.use(express.json());

// API Call
app.use("/v1/registration", dbRegistrationRouter);
app.use("/v1/authentication", dbAuthRouter);

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

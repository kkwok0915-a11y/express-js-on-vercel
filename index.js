import express from "express";
import cors from "cors";
import dbRegistrationRouter from "./database-route/database-register.js";
import dbAuthRouter from "./database-route/database-authentication.js";
import oauthRoute from "./oauth-route/oauth-route.js";
import dbMockDataRoute from "./database-route/database-data.js";

const app = express();
const corsOptions = {
  origin: [
    process.env.WEB_APP_ENDPOINT,
    "https://github.com",
    "http://localhost:3000",
  ], // Allow only your frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Explicitly include OPTIONS for preflight
  allowedHeaders: ["Content-Type", "Authorization"],
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
app.use("/v1/auth", oauthRoute);
app.use("/v1/api-data", dbMockDataRoute);

// Home route - HTML
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

// Health check
app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

export default app;

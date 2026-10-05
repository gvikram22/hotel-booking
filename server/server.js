import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

const app = express();

connectDB();

app.use(cors());

// Clerk webhook MUST come before express.json()
app.use(
    "/api/clerk",
    express.raw({ type: "application/json" }),
    clerkWebhooks
);

// Normal JSON requests
app.use(express.json());

// Clerk middleware for normal application routes
app.use(clerkMiddleware());

app.get("/", (req, res) => {
    res.send("API is working fine");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
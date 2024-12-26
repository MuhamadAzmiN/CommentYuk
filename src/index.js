import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./lib/db.js";
import { comment, deleteAllComments, getComments } from "./controller/comment.controller.js";
import cors from "cors";

dotenv.config();

const app = express();
const server = createServer(app); // Create HTTP server with Express
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

// REST Routes
app.post("/api/comments", comment);
app.get("/api/get/comments", getComments);
app.delete("/api/delete/comments", deleteAllComments);

// Socket.IO Connection Handl
const PORT = process.env.PORT || 3000;

// Start server
server.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await connectDB();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
});
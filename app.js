import express from "express";
import { userRoutes, postRoutes } from "./routes/index.js";
import { globalErrorHandler } from "./utilities/index.js";

// Main app instance
const app = express();

// Accepting JSON entries
app.use(express.json());

// Routing
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// Default route (localhost:PORT/)
app.get("/", (req, res) => { return res.status(200).send("Welcome!") });

// Global error handling
app.use(globalErrorHandler);

// Running the server
app.listen(process.env.PORT, () => console.log("server is running on port:", process.env.PORT));
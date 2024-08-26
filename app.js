import express from "express";
import { userRoutes, postRoutes } from "./routes/index.js";
import { globalErrorHandler, logger } from "./utilities/index.js";
import morgan from "morgan";

// Main app instance
const app = express();

// Accepting JSON entries
app.use(express.json());

// Logger ( combining morgan auto logging with winston level logging )
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Routing
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// Default route (localhost:PORT/)
app.get("/", (req, res) => { return res.status(200).send("Welcome!") });

// Global error handling
app.use(globalErrorHandler);

// Running the server
app.listen(process.env.PORT, () => logger.info(`server is running on port: ${process.env.PORT}`));
import express from "express";
import { userRoutes, postRoutes } from "./routes/index.js";

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// Default route (localhost:PORT/)
app.get("/", (req, res) => { return res.status(200).send("Welcome!") });

// Running the server
app.listen(process.env.PORT, () => console.log("server is running on port:", process.env.PORT));
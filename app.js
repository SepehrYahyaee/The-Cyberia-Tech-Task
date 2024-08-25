import express from "express";

const app = express();

app.use(express.json());


// Default route (localhost:PORT/)
app.get("/", (req, res) => { return res.status(200).send("Welcome!") });

// Running the server
app.listen(process.env.PORT, () => console.log("server is running on port: ", process.env.PORT));
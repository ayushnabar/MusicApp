import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db";
import errorHandler from "./middleware/errorHandler";
import { PORT } from "./constants/env";
import { OK } from "./constants/https";
import { authRoutes } from "./routes/auth.routes";
const app = express();
app.use(express.json()); // to parse JSON
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded data
app.use(cors())

app.get("/", (req, res) => {
    throw new Error("Test error")
    res.status(OK).send("Hello World!");
})

app.use("/auth", authRoutes)

app.use(errorHandler);
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
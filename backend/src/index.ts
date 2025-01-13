import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db";

const app = express();
app.use(express.json()); // to parse JSON
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded data
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
})

app.listen(3000, () => {
    connectDB();
    console.log("Server is running on http://localhost:3000");
});
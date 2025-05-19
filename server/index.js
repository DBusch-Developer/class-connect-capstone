import 'dotenv/config';
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import blogRouter from "./blog/index.js"

const app = express();
app.use(express.json())
const port = 8080;

app.use(cors())

const mongoURL = process.env.MONGODB_CONNECTION_STRING || ""
console.log("mongoURL", mongoURL)
const mainDB = async () => {
    await mongoose.connect(mongoURL)
    console.log(`Connected to ${mongoURL}`)
}
mainDB().catch(err => console.log(err))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/blog", blogRouter)

app.listen(port, () => {
  console.log(`classConnect Blog server listening on port ${port}`);
});

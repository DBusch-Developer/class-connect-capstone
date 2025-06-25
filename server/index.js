import "dotenv/config";
import express from "express";
import axios from "axios";
import cors from "cors";
import mongoose from "mongoose";
import blogRouter from "./blog/index.js";
import userRouter from "./users/index.js";

const app = express();
app.use(express.json({ limit: "5000kb" }));
app.use(cors({ origin: "http://localhost:3030" }));
const port = process.env.PORT || 8080;
const VITE_OLLAMA_API_URL = "http://localhost:11434/api/generate";

const mongoURL = process.env.MONGODB_CONNECTION_STRING || "";
console.log("mongoURL", mongoURL);
const mainDB = async () => {
  await mongoose.connect(mongoURL);
  console.log(`Connected to ${mongoURL}`);
};
mainDB().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/models", (req, res) => {
  const models = ["gemma3:12b", "mistral:7b", "deepseek-coder-v2"];
  res.json(models);
});

let isLoading = false;

app.post("/ollama", async (req, res) => {
  try {
    isLoading = true;
    const response = await axios.post(VITE_OLLAMA_API_URL, {
      model: req.body.model,
      prompt: req.body.prompt,
    });
    console.log(response);
    let responseText = "";
    const responseLines = response.data.split("\n");
    for (const d of responseLines) {
      try {
        const obj = JSON.parse(d);
        responseText += obj.response;
      } catch (err) {
        console.log("This llama won't hunt!");
      } finally {
        isLoading = false;
      }
    }
    res.json({ response: responseText });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.use("/blog", blogRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`classConnect Blog server listening on port ${port}`);
});

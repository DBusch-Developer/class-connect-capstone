import "dotenv/config";
import express from "express";
import axios from "axios";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./strategies/jwtStrategy.js" // Passport JWT Strategy
import "./strategies/local-strategy.js"; // Passport local strategy
import blogRouter from "./blog/index.js";
import authRouter from "./auth/index.js";
import userRouter from "./user/userIndex.js";

const app = express();
const port = process.env.PORT || 8080;
const VITE_OLLAMA_API_URL = "http://localhost:11434/api/generate";
const cookieSecret = process.env.COOKIE_SECRET || "secret";


app.use(express.json({ limit: "5000kb" }));
app.use(cookieParser(cookieSecret));

// CORS
// Get whitelisted domains from env
const whitelist = process.env.WHITELISTED_DOMAINS
? process.env.WHITELISTED_DOMAINS.split(",")
: []

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    }
    else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
}

// Use CORS
app.use(cors(corsOptions));
app.use(cors({ origin: "http://localhost:3030" }));

// Sessions 
app.use(session({}));

// Add Passport
app.use(passport.initialize());
app.use(passport.session());

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
app.use("/auth", authRouter);
app.use("/users", userRouter);

app.all("/*splat", (req, res) => {
  res.status(404).json({
    success: false,
    data: "404",
  });
});



try {
  const mongoURL = process.env.MONGODB_CONNECTION_STRING || "";
  await mongoose.connect(mongoURL);

  console.log(`Login starter connected to the database ${mongoURL}`);

  app.listen(port, () => {
    console.log(`classConnect Blog server listening on port ${port}`);
  });
} catch (err) {
  console.log(err);
}
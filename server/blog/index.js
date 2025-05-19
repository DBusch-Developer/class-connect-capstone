import express from "express";
import blogCreate from "./blogCreate.js";
import blogGetMany from "./blogGetMany.js";
import blogGetOne from "./blogGetOne.js";
import blogUpdate from "./blogUpdate.js";
import blogDelete from "./blogDelete.js";

const blogRouter = express.Router();

// Create blog API
blogRouter.post("/", blogCreate);

// Read all blogs
blogRouter.get("/", blogGetMany);

// Read one blog
blogRouter.get("/:id", blogGetOne);

// Update one blog
blogRouter.put("/:id", blogUpdate);

// Delete one blog
blogRouter.delete("/:id", blogDelete);


export default blogRouter;

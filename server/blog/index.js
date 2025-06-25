import express from "express";
import blogCreate from "./blogCreate.js";
import blogGetMany from "./blogGetMany.js";
import blogGetOne from "./blogGetOne.js";
import blogUpdate from "./blogUpdate.js";
import blogDelete from "./blogDelete.js";
import blogCommentCreate from "./blogCommentCreate.js";
import blogCommentDelete from "./blogCommentDelete.js";

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

//Blog Comment Create
blogRouter.post("/:id/comments", blogCommentCreate);

//Blog Comment Delete
blogRouter.delete("/:id/comments/:commentId", blogCommentDelete);

export default blogRouter;

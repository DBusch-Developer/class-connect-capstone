import mongoose from "mongoose";
import { Schema } from "mongoose";

const blogSchema = new Schema({
  title: String,
  author: String,
  authorTitle: String,
  profilePhoto: String,
  category: String,
  readTime: String,
  body: String,
  coverPhoto: String,
  date: { type: Date, default: Date.now },
  comment: String
});

export default blogSchema;

import mongoose from "mongoose";
import { Schema } from "mongoose";

const blogSchema = new Schema({
  title: String,
  author: String,
  profilePhoto: String,
  category: String,
  readTime: String,
  body: String,
  coverPhoto: String,
  date: { type: Date, default: Date.now },
  comments: [
    {
      username: String,
      comment: String,
      timeStamp: { type: Date, default: Date.now },
    },
  ],
  isPublished: Boolean,
  isArchived: Boolean,
});

export default blogSchema;

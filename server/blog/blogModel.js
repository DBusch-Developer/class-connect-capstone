import mongoose from "mongoose";
import blogSchema from "./blogSchema.js";

blogSchema.set("toJSON", {
    transform: (doc, ret, options) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

const blogModel = mongoose.model("Blog", blogSchema)

export default blogModel
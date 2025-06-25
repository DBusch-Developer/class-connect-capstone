import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  token: {
    type: String,
    default: "",
  },
});

const userSchema = new Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  role: [String],
  avatar: {
    type: String,
    default: "",
  },
  token: {
    type: [String],
  },
});

export default userSchema;

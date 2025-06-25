import express from "express";
import userCreate from "./userCreate.js";
import userLogin from "./userLogin.js";
import userMe from "./userMe.js";
import userLogout from "./userLogout.js";
import userGetAll from "./userGetAll.js";
import userGetOne from "./userGetOne.js";

const userRouter = express.Router();

userRouter.post("/", userCreate);
userRouter.post("/login", userLogin);
userRouter.get("/me/:token", userMe)
userRouter.get("/logout/:token", userLogout);
userRouter.get("/list", userGetAll);
userRouter.get("/user/:username", userGetOne);

export default userRouter;

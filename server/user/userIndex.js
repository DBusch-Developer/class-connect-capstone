// import express from "express"
import { Router } from "express";
import passport from "passport";
import userCreate from "./userCreate.js";
import userGetAll from "./userGetAll.js";
import userGetOne from "./userGetOne.js";
import userMe from "./userMe.js";
const userRouter = Router();

userRouter.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  userCreate
);

userRouter.get("/list", userGetAll);
userRouter.get("/user/:username", userGetOne);
userRouter.get("/me/:token", userMe);

export default userRouter;

// import express from "express"
import { Router } from "express";
import passport from "passport";
import login from "./login.js";
import status from "./status.js";
import logout from "./logout.js";

const authRouter = Router();

authRouter.post("/login", passport.authenticate("local"), login);
authRouter.get(
  "/status",
  passport.authenticate("jwt", { session: false }),
  status
);
authRouter.post("/logout/:username", logout);

export default authRouter;

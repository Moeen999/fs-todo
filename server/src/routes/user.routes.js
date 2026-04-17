import express from "express";
import {
  createUser,
  getProfile,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", getProfile);
userRouter.post("/logout", logoutUser);

export default userRouter;

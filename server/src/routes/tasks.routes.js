import express from "express";
import { createTodo, getTodos } from "../controllers/tasks.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const tasksRouter = express.Router();

tasksRouter.post("/create-task",authMiddleware, createTodo);
tasksRouter.get("/get-todos", authMiddleware, getTodos);

export default tasksRouter;

import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodoTitle,
} from "../controllers/tasks.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const tasksRouter = express.Router();

tasksRouter.post("/create-task", authMiddleware, createTodo);
tasksRouter.get("/get-todos", authMiddleware, getTodos);
tasksRouter.put("/update-title/:id", authMiddleware, updateTodoTitle);
tasksRouter.delete("/delete-task/:id", authMiddleware, deleteTodo);

export default tasksRouter;

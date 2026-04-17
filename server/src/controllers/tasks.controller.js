import TodoModel from "../models/tasks.model.js";

const createTodo = async (req, res) => {
  const { title } = req.body;

  if (!title) return res.status(400).json({ message: "Title is required" });

  const todo = await TodoModel.create({
    title,
    user: req.userId,
  });

  res.status(201).json(todo);
};

const getTodos = async (req, res) => {
  const todos = await TodoModel.find({ user: req.userId }).sort({
    createdAt: -1,
  });
  res.json(todos);
};

export { createTodo, getTodos };

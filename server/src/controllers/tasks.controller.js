import TodoModel from "../models/tasks.model.js";

const createTodo = async (req, res) => {
  const { title } = req.body;

  if (!title) return res.status(400).json({ message: "Title is required" });
  const existingTodo = await TodoModel.findOne({ title, user: req.userId });
  if (existingTodo) {
    return res.status(400).json({ message: "Title already exists" });
  }

  const todo = await TodoModel.create({
    title,
    user: req.userId,
    status: "pending",
  });

  res
    .status(201)
    .json({ success: true, message: "Todo created successfully", todo });
};

const getTodos = async (req, res) => {
  const todos = await TodoModel.find({ user: req.userId }).sort({
    createdAt: -1,
  });
  res.json(todos);
};

const updateTodoTitle = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const todo = await TodoModel.findOneAndUpdate(
    { _id: id, user: req.userId },
    { title },
    { new: true },
  );

  if (!todo) return res.status(404).json({ message: "Todo not found" });

  res
    .status(200)
    .json({ success: true, message: "Todo updated successfully", todo });
};

const updateTododStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const todo = await TodoModel.findOneAndUpdate(
    { _id: id, user: req.userId },
    { status },
    { new: true },
  );

  if (!todo) return res.status(404).json({ message: "Todo not found" });

  res
    .status(200)
    .json({ success: true, message: "Status updated successfully", todo });
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  const todo = await TodoModel.findOneAndDelete({
    _id: id,
    user: req.userId,
  });

  if (!todo) return res.status(404).json({ message: "Todo not found" });

  res.json({ success: true, message: "Todo deleted successfully" });
};

export { createTodo, getTodos, updateTodoTitle, updateTododStatus, deleteTodo };

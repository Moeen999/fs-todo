import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import configs from "./config/config.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRouter from "./src/routes/user.routes.js";
import tasksRouter from "./src/routes/tasks.routes.js";

const app = express();
app.use(
  cors({
    origin: configs.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
connectDB();
const PORT = configs.PORT;

// ! API Routes
app.use("/api/user", userRouter);
app.use("/api/tasks", tasksRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Chore Chuckles!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

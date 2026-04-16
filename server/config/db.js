import mongoose from "mongoose";
import configs from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(configs.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;

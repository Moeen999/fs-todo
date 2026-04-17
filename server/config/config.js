import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("Mongo URI is not defined");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT secret is not defined");
}

const configs = {
  MONGO_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
};

export default configs;

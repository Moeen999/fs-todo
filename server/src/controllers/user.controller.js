import configs from "../../config/config.js";
import sessionModel from "../models/session.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import crypto from "crypto"


const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "user with this email already exists" });
    }

    const saltValue = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltValue);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const refreshToken = jwt.sign(
      {
        id: newUser._id,
      },
      configs.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    //! Sessions
    const session = await sessionModel.create({
      user: newUser._id,
      refreshToken: refreshTokenHash,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const accessToken = jwt.sign(
      {
        id: newUser._id,
        sessionId: session._id,
      },
      configs.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, //! this line refers to that the script of js which will run on the browser side will never be able to read the cookies data
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    await newUser.save();
    res.status(201).json({
      message: "Account created Successfully",
      user: {
        username: newUser.name,
        email: newUser.email,
        todos: newUser.todoData,
      },
      accessToken,
    });
  } catch (error) {
    console.log("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log("Error logging in user:", error);
    res.status(500).json({ message: "Error logging in user" });
  }
};

export { createUser, loginUser };

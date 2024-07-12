import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateUserData = ({ name, email, password, confirmPassword }) => {
  if (!name || !email || !password || !confirmPassword) {
    throw { status: 400, message: "All fields are required" };
  }

  if (!emailRegex.test(email)) {
    throw { status: 400, message: "Invalid email address" };
  }

  if (password !== confirmPassword) {
    throw { status: 400, message: "Passwords do not match" };
  }

  if (password.length < 6) {
    throw {
      status: 400,
      message: "Password must be at least 6 characters long",
    };
  }
};

const checkUserExists = async (email) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw { status: 400, message: "User already exists" };
  }
};

const findAll = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ message: "success", data: users });
  } catch (err) {
    res.status(500).json({ message: "error", data: err });
  }
};

const store = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    validateUserData({ name, email, password, confirmPassword });
    await checkUserExists(email);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    res.status(201).json({ message: "User created" });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal server error", data: err });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    let userToken = jwt.sign({ user: existUser._id }, process.env.JWT_TOKEN, {
      expiresIn: "1h",
    });
    res.cookie("userToken", userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.json({ message: "Login success", data: existUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

const logout = (req, res) => {
  res.clearCookie("userToken");
  res.json({ message: "logout successful" });
};

export default { findAll, store, login, logout };

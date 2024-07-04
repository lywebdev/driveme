import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";

const findAll = (req, res) => {
  User.find()
    .then((users) => {
      console.log(users);
      res.json({ message: "success", data: users });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "error", data: err });
    });
};

const storeUser = (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  console.log("Received data:", req.body);

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  console.log("Checking if user exists");

  User.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser) {
        console.log("User already exists");
        return Promise.reject({ status: 400, message: "User already exists" });
      } else {
        console.log("Hashing password");
        return bcrypt.hash(password, 10);
      }
    })
    .then((hashedPassword) => {
      if (!hashedPassword) {
        return res.status(400).json({ message: "Internal server error" });
      }

      console.log("Creating new user with hashed password:", hashedPassword);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      console.log("Saving new user to database", newUser);
      return newUser.save();
    })
    .then((savedUser) => {
      if (savedUser) {
        console.log("User created:", savedUser);
        res.status(201).json({ message: "User created" });
      }
    })
    .catch((err) => {
      // Handle errors
      console.error("Internal server error:", err);
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: "Internal server error", data: err });
      }
    });
};

export default { getAllUsers, storeUser };

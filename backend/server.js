import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

import "./config/db/mongoose.js";

const app = express();

app.use(morgan("dev"));

app.listen(3000, () => console.log("Server is running on port 3000"));

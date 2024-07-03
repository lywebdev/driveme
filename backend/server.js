import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import routes from "./config/routes/index.js"
import bodyParser from "body-parser";

dotenv.config();

import "./config/db/mongoose.js";

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use("/", routes);


app.listen(3000, () => console.log("Server is running on port 3000"));

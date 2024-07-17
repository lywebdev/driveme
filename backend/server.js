import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';
import routes from "./config/routes/index.js";

dotenv.config();

import "./config/db/mongoose.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

app.use("/api", routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

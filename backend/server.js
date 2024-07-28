import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';
import routes from "./config/routes/index.js";
import path, { dirname } from 'path';

dotenv.config();

import "./config/db/mongoose.js";
import {fileURLToPath} from "url";

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api", routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

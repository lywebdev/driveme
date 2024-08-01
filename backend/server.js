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
import urls from "./config/urls.js";

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
    urls.driveMe,
    urls.secureDriveMe,
    urls.wwwDriveMe,
    urls.wwwSecureDriveMe,
    process.env.CLIENT_URL,
];

const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};


app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (process.env.IS_PROD === "yes") {
    app.use('/', routes);
} else {
    app.use("/api", routes);
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

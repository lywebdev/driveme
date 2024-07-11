import mongoose from "mongoose";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
});

const dbURI = process.env.MONGODB_URI;

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => console.log(err));

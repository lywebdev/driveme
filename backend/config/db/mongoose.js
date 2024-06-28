import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI)
  .then(() => {console.log("DB is connected")})
  .catch(err => console.log(err))
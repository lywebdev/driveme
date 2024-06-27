const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");

require("dotenv").config();

require("./config/db/mongoose.js");
const app = express()

app.use(morgan("dev"));

app.listen(3000, () => console.log("Server is running on port 3000"))
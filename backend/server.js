//Imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
//initialize dotenv
require("dotenv").config();
//initialize database
require("./config/mongoose.js");
//Initializing app
const app = express()
//Middleware for html responses during development
app.use(morgan("dev"));

app.listen(3000, () => console.log("Server is running on port 3000"))
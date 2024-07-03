import express from "express";
import userFunctions from "../../controller/userFunctions.js";
const router = express.Router();

router.get("/allusers", userFunctions.getAllUsers)

router.post("/postuser", userFunctions.postUser)

export default router
import express from "express";
import userFunctions from "../../controller/usersController.js";
const router = express.Router();

router.get("/", userFunctions.getAllUsers);

router.post("/", userFunctions.postUser);

export default router;

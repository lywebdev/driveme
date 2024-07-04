import express from "express";
import usersController from "../../controller/usersController.js";
const router = express.Router();

router.get("/", usersController.findAll);

router.post("/", usersController.store);

export default router;

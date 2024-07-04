import express from "express";
import userRoutes from "./usersRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);

export default router;

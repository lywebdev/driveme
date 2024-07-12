import express from "express";
import usersRoutes from "./usersRoutes.js";
import transportTypeRoutes from "./transportTypeRoutes.js";

const router = express.Router();

router.use("/users", usersRoutes);
router.use("/transport-types", transportTypeRoutes);

export default router;

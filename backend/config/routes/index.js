import express from "express";
import usersRoutes from "./usersRoutes.js";
import transportTypeRoutes from "./transportTypeRoutes.js";
import transportsRoutes from "./transportsRoutes.js";

const router = express.Router();

router.use("/users", usersRoutes);
router.use("/transport-types", transportTypeRoutes);
router.use("/transports", transportsRoutes)

export default router;

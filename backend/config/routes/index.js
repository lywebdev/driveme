import express from "express";
import usersRoutes from "./usersRoutes.js";
import { publicTransportTypeRoutes, adminTransportTypeRoutes } from "./transportTypeRoutes.js";
import { publicTransportsRoutes, adminTransportsRoutes } from "./transportsRoutes.js";

const router = express.Router();

// Public routes
router.use("/users", usersRoutes);
router.use("/transport-types", publicTransportTypeRoutes);
router.use("/transports", publicTransportsRoutes);

// Admin routes 
router.use("/admin/transport-types", adminTransportTypeRoutes);
router.use("/admin/transports", adminTransportsRoutes);

export default router;
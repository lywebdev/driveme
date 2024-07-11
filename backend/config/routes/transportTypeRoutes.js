import express from "express";
import transportTypeController from "../../controller/transportTypeController.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

router.use(adminAuth.isAdmin);

router.get("/", transportTypeController.findAll);

router.post("/", transportTypeController.store);

router.delete("/:id", transportTypeController.destroy);

router.put("/:id", transportTypeController.update);

export default router;

import express from "express";
import transportTypeController from "../../controller/transportTypeController.js";
import adminAuth from "../../middlewares/adminAuth.js";

const router = express.Router();

router.use(adminAuth.isAdmin);

router.get("/", transportTypeController.all);
router.post("/", transportTypeController.create);
router.delete("/:id", transportTypeController.remove);
router.put("/:id", transportTypeController.update);

export default router;

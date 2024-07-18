import express from "express";
import transportTypeController from "../../controller/transportTypeController.js";
import adminAuth from "../../middlewares/adminAuth.js";

const router = express.Router();

router.get("/", transportTypeController.all);

router.use(adminAuth.isAdmin);

router.post("/", transportTypeController.create);
router.delete("/:id", transportTypeController.remove);
router.put("/:id", transportTypeController.update);

export default router;

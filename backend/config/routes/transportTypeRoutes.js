import express from "express";
import transportTypeController from "../../controller/transportTypeController.js";
import auth from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", transportTypeController.all);

router.use(auth.isAdmin);

router.post("/", transportTypeController.create);
router.delete("/:id", transportTypeController.remove);
router.put("/:id", transportTypeController.update);

export default router;

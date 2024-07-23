import express from "express";
import transportController from "../../controller/transportController.js";
import auth from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", transportController.all);

router.use(auth.isAdmin);

router.post("/", transportController.create);
router.delete("/:id", transportController.remove);
router.put("/:id", transportController.update);

export default router;
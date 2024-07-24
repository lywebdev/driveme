import express from "express";
import transportController from "../../controller/transportController.js";
import auth from "../../middlewares/auth.js";

//Public routes
const publicRouter = express.Router();

publicRouter.get("/", transportController.all);

//Admin routes
const adminRouter = express.Router();

adminRouter.use(auth.isAdmin);

adminRouter.post("/", transportController.create);
adminRouter.delete("/:id", transportController.remove);
adminRouter.put("/:id", transportController.update);

export {
  publicRouter as publicTransportsRoutes,
  adminRouter as adminTransportsRoutes,
};

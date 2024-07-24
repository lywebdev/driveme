import express from "express";
import transportTypeController from "../../controller/transportTypeController.js";
import auth from "../../middlewares/auth.js";

//Public routes
const publicRouter = express.Router();

publicRouter.get("/", transportTypeController.all);
//Admin routes
const adminRouter = express.Router();
adminRouter.use(auth.isAdmin);

adminRouter.post("/", transportTypeController.create);
adminRouter.delete("/:id", transportTypeController.remove);
adminRouter.put("/:id", transportTypeController.update);

export {
  publicRouter as publicTransportTypeRoutes,
  adminRouter as adminTransportTypeRoutes,
};

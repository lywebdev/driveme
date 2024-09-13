import express from "express";
import adminTransportRouter from "./entities/transport/admin.js";
import adminTransportTypeRouter from "./entities/transportType/admin.js";
import adminUserRouter from "./entities/user/admin.js";
import list from "./list.js";
import adminSlotRouter from "./entities/slot/admin.js";
import auth from "../../middlewares/auth.js";
import orderController from "../../controllers/orderController.js";

const adminRouter = express.Router();

adminRouter.use(list.transports, adminTransportRouter);
adminRouter.use(list.transportTypes, adminTransportTypeRouter);
adminRouter.use(list.users, adminUserRouter);
adminRouter.use(list.slots, adminSlotRouter);

adminRouter.get('/orders', auth.isAdmin, orderController.findAll);



export default adminRouter;
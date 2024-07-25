import express from "express";
import adminTransportRouter from "./entities/transport/admin.js";
import adminTransportTypeRouter from "./entities/transportType/admin.js";
import adminUserRouter from "./entities/user/admin.js";
import list from "./list.js";

const adminRouter = express.Router();

adminRouter.use(list.transports, adminTransportRouter);
adminRouter.use(list.transportTypes, adminTransportTypeRouter);
adminRouter.use(list.users, adminUserRouter);



export default adminRouter;
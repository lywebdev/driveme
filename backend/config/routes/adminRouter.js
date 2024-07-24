import express from "express";
import adminTransportRouter from "./entities/transport/admin.js";
import adminTransportTypeRouter from "./entities/transportType/admin.js";
import auth from "../../middlewares/auth.js";
import list from "./list.js";
import {groupRouters} from "../../utils/routesHelper.js";
import adminUserRouter from "./entities/user/admin.js";

const adminRouter = express.Router();

groupRouters(adminRouter, [
    [list.transports, adminTransportRouter],
    [list.transportTypes, adminTransportTypeRouter],
    [list.users, adminUserRouter],
], auth.isAdmin);



export default adminRouter;
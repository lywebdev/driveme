import express from "express";
import publicTransportRouter from "./entities/transport/public.js";
import list from "./list.js";
import publicTransportTypeRouter from "./entities/transportType/public.js";
import publicUserRouter from "./entities/user/public.js";

const publicRouter = express.Router();

publicRouter.use(list.transports, publicTransportRouter);
publicRouter.use(list.transportTypes, publicTransportTypeRouter);
publicRouter.use(list.users, publicUserRouter);



export default publicRouter;
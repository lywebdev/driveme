import express from "express";
import publicTransportRouter from "./entities/transport/public.js";
import list from "./list.js";
import publicTransportTypeRouter from "./entities/transportType/public.js";
import publicUserRouter from "./entities/user/public.js";
import publicTransportLocationRouter from "./entities/transportLocation/public.js";
import stripeController from "../../controllers/stripeController.js";
import publicPaymentRouter from "./entities/payment/public.js";
import publicOrderRouter from "./entities/order/public.js";

const publicRouter = express.Router();

publicRouter.use(list.transports, publicTransportRouter);
publicRouter.use(list.transportTypes, publicTransportTypeRouter);
publicRouter.use(list.transportLocations, publicTransportLocationRouter);
publicRouter.use(list.users, publicUserRouter);
publicRouter.use(list.payments, publicPaymentRouter);
publicRouter.use(list.orders, publicOrderRouter);

publicRouter.post(`${list.transactions}/create-payment-intent`, stripeController.createPaymentIntent);


export default publicRouter;
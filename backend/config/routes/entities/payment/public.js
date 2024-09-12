import express from "express";
import paymentController from "../../../../controllers/paymentController.js";

const publicPaymentRouter = express.Router();

publicPaymentRouter.post('/', paymentController.create);



export default publicPaymentRouter;
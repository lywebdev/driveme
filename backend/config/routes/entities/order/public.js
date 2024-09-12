import express from "express";
import orderController from "../../../../controllers/orderController.js";

const publicOrderRouter = express.Router();

publicOrderRouter.get('/', orderController.findByClientSecret);
publicOrderRouter.post('/', orderController.create);



export default publicOrderRouter;
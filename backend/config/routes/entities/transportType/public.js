import express from "express";
import transportTypeController from "../../../../controllers/transportTypeController.js";

const publicTransportTypeRouter = express.Router();

publicTransportTypeRouter.get('/', transportTypeController.all);



export default publicTransportTypeRouter;
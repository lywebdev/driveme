import express from "express";
import transportController from "../../../../controllers/transportController.js";

const publicTransportRouter = express.Router();

publicTransportRouter.get('/', transportController.all);



export default publicTransportRouter;
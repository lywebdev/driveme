import express from "express";
import transportLocationController from "../../../../controllers/transportLocationController.js";

const publicTransportLocationRouter = express.Router();

publicTransportLocationRouter.get('/cities', transportLocationController.allCities);



export default publicTransportLocationRouter;
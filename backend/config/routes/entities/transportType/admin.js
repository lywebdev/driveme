import express from "express";
import transportTypeController from "../../../../controllers/transportTypeController.js";

const adminTransportTypeRouter = express.Router();

adminTransportTypeRouter.post('/', transportTypeController.create);
adminTransportTypeRouter.put('/:id', transportTypeController.update);
adminTransportTypeRouter.delete('/:id', transportTypeController.remove);



export default adminTransportTypeRouter;
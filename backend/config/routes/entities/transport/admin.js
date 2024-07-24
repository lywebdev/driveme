import express from "express";
import transportController from "../../../../controllers/transportController.js";

const adminTransportRouter = express.Router();

adminTransportRouter.post('/', transportController.create);
adminTransportRouter.put('/:id', transportController.update);
adminTransportRouter.delete('/:id', transportController.remove);



export default adminTransportRouter;
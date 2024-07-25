import express from "express";
import transportTypeController from "../../../../controllers/transportTypeController.js";
import auth from "../../../../middlewares/auth.js";

const adminTransportTypeRouter = express.Router();

adminTransportTypeRouter.post('/', auth.isAdmin, transportTypeController.create);
adminTransportTypeRouter.put('/:id', auth.isAdmin, transportTypeController.update);
adminTransportTypeRouter.delete('/:id', auth.isAdmin, transportTypeController.remove);



export default adminTransportTypeRouter;
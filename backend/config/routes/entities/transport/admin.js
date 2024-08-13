import express from "express";
import transportController from "../../../../controllers/transportController.js";
import auth from './../../../../middlewares/auth.js';

const adminTransportRouter = express.Router();

adminTransportRouter.post('/', auth.isAdmin, transportController.create);
adminTransportRouter.put('/:id', auth.isAdmin, transportController.update);
adminTransportRouter.delete('/:id', auth.isAdmin, transportController.remove);



export default adminTransportRouter;
import express from "express";
import auth from './../../../../middlewares/auth.js';
import slotController from "../../../../controllers/slotController.js";

const adminSlotRouter = express.Router();

adminSlotRouter.post('/', slotController.create);


export default adminSlotRouter;
import express from "express";
import slotController from "../../../../controllers/slotController.js";
import auth from "../../../../middlewares/auth.js";

const adminSlotRouter = express.Router();

adminSlotRouter.post('/', auth.isAdmin, slotController.create);



export default adminSlotRouter;
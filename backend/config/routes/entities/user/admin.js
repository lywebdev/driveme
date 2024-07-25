import express from "express";
import usersController from './../../../../controllers/usersController.js';
import auth from "../../../../middlewares/auth.js";

const adminUserRouter = express.Router();

adminUserRouter.get('/', auth.isAdmin, usersController.findAll);



export default adminUserRouter;
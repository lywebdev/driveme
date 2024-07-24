import express from "express";
import usersController from './../../../../controllers/usersController.js';

const adminUserRouter = express.Router();

adminUserRouter.get('/', usersController.findAll);



export default adminUserRouter;
import express from "express";
import usersController from "../../../../controllers/usersController.js";

const privateUserRouter = express.Router();

privateUserRouter.get('/logout', usersController.logout);



export default privateUserRouter;
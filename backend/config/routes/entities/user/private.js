import express from "express";
import usersController from "../../../../controllers/usersController.js";
import auth from "../../../../middlewares/auth.js";

const privateUserRouter = express.Router();

privateUserRouter.get('/logout', auth.isUserLoggedIn, usersController.logout);



export default privateUserRouter;
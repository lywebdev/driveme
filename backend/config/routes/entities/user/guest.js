import express from "express";
import usersController from "../../../../controllers/usersController.js";

const guestUserRouter = express.Router();

guestUserRouter.post('/login', usersController.login);
guestUserRouter.post('/', usersController.store);



export default guestUserRouter;
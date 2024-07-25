import express from "express";
import usersController from "../../../../controllers/usersController.js";
import auth from './../../../../middlewares/auth.js';

const guestUserRouter = express.Router();

guestUserRouter.post('/login', auth.isNotAuthorized, usersController.login);
guestUserRouter.post('/', auth.isNotAuthorized, usersController.store);



export default guestUserRouter;
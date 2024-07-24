import express from "express";
import usersController from "../../../../controllers/usersController.js";

const publicUserRouter = express.Router();

publicUserRouter.get('/refresh-tokens', usersController.refreshTokens);



export default publicUserRouter;
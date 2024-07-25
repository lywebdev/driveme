import express from "express";
import privateUserRouter from "./entities/user/private.js";
import list from "./list.js";

// Routes for authorized users only are posted here

const privateRouter = express.Router();

privateRouter.use(list.users, privateUserRouter);



export default privateRouter;
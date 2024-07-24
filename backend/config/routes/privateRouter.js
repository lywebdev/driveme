import express from "express";
import auth from "../../middlewares/auth.js";
import privateUserRouter from "./entities/user/private.js";
import list from "./list.js";
import {groupRouters} from "../../utils/routesHelper.js";

// Routes for authorized users only are posted here

const privateRouter = express.Router();

groupRouters(privateRouter, [
    [list.users, privateUserRouter],
], auth.isUserLoggedIn);



export default privateRouter;
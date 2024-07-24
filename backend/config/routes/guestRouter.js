import express from "express";
import auth from "../../middlewares/auth.js";
import list from "./list.js";
import guestUserRouter from "./entities/user/guest.js";
import {groupRouters} from "../../utils/routesHelper.js";

const guestRouter = express.Router();

groupRouters(guestRouter, [
    [list.users, guestUserRouter],
], auth.isNotAuthorized);



export default guestRouter;
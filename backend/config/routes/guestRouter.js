import express from "express";
import list from "./list.js";
import guestUserRouter from "./entities/user/guest.js";

const guestRouter = express.Router();

guestRouter.use(list.users, guestUserRouter);



export default guestRouter;
import express from "express";
import adminRouter from "./adminRouter.js";
import guestRouter from "./guestRouter.js";
import privateRouter from "./privateRouter.js";
import publicRouter from "./publicRouter.js";

const router = express.Router();

router.use('/admin', adminRouter);
router.use('/', guestRouter);
router.use('/', privateRouter);
router.use('/', publicRouter);


export default router;
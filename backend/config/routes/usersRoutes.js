import express from "express";
import usersController from "../../controller/usersController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Public routes
router.post("/login", usersController.login);

// Routes that require the user to be logged in
router.use(auth.isUserLoggedIn);

router.get("/", usersController.findAll);
router.post("/", usersController.store);
router.get("/logout", usersController.logout);

export default router;

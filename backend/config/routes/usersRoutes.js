import express from "express";
import usersController from "../../controller/usersController.js";
import auth from "../../middlewares/loginAuth.js";

const router = express.Router();

// Public routes
router.post("/login", auth.isUserLoggedOut, usersController.login);
router.post("/",auth.isUserLoggedOut, usersController.store);

// Routes that require the user to be logged in
router.use(auth.isUserLoggedIn);
router.get("/", usersController.findAll);
router.get("/logout", usersController.logout);

export default router;

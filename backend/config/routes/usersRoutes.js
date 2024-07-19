import express from "express";
import usersController from "../../controller/usersController.js";
import auth from "../../middlewares/auth.js";

const router = express.Router();

// Public routes
router.post("/login", auth.isNotAuthorized, usersController.login);
router.post("/", auth.isNotAuthorized, usersController.store);

router.get('/refresh-tokens', usersController.refreshTokens);

// Routes that require the user to be logged in
router.use(auth.isUserLoggedIn);
router.get("/", usersController.findAll);
router.get("/logout", usersController.logout);

export default router;

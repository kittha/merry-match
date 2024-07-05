import express from "express";
import { registerUser } from "../../../controllers/auth.controller.mjs";
// import {
//   loginUser,
//   logoutUser,
//   forgotPassword,
//   resetPassword,
// } from "../../../controllers/auth.controller.mjs";
import { validateUsernamePassword } from "../../../middlewares/username-password.validation.mjs";

const router = express.Router();

router.post("/register", [validateUsernamePassword], registerUser);
// router.post("/login", loginUser);
// router.post("/logout", logoutUser);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);

export default router;

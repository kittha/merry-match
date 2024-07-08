import express from "express";
import {
  registerUser,
  loginUser,
  fetchUser,
} from "../../../controllers/auth.controller.mjs";
// import {
// logoutUser,
//   forgotPassword,
//   resetPassword,
// } from "../../../controllers/auth.controller.mjs";
import { validateUsernamePassword } from "../../../middlewares/username-password.validation.mjs";

const router = express.Router();

router.post("/register", [], registerUser);
router.post("/login", loginUser);
// router.post("/logout", logoutUser);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);
router.get("/:tokenId", fetchUser);

export default router;

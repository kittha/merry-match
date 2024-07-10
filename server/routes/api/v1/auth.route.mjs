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
import { validateSignUp } from "../../../middlewares/signUp.validation.mjs";
import { validateSignIn } from "../../../middlewares/signIn.validation.mjs";
import { avatarUpload } from "../../../middlewares/multer.middleware.mjs";

const router = express.Router();

router.post("/register", [validateSignUp, avatarUpload], registerUser);
router.post("/login", [validateSignIn], loginUser);
// router.post("/logout", logoutUser);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);
router.get("/:tokenId", fetchUser);

export default router;

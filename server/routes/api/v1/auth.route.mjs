import express from "express";
import {
  registerUser,
  loginUser,
  fetchUser,
  refreshUserSession,
} from "../../../controllers/auth.controller.mjs";
// import {
//   forgotPassword,
//   resetPassword,
// } from "../../../controllers/auth.controller.mjs"; // TODO : prepare to delete
import { avatarUpload } from "../../../middlewares/multer.middleware.mjs";
import { validatePicture } from "../../../middlewares/picture.validation.mjs";
import { validateSignUpInput } from "../../../middlewares/signUpInput.validation.mjs";
import { ageValidator } from "../../../middlewares/age.validation.mjs";
import { validateEmailRegex } from "../../../middlewares/emailRegex.validation.mjs";
import { validateUsernameLength } from "../../../middlewares/usernameLength.validation.mjs";
import { validatePasswordLength } from "../../../middlewares/passwordLength.validation.mjs";
import { validateSignInInput } from "../../../middlewares/signInInput.validation.mjs";
import { checkUserDoesNotExist } from "../../../middlewares/checkUserDoesNotExist.middleware.mjs";

const router = express.Router();

// avatarUploadMiddleware must come first!
// If not, the header "multipart/form-data" will cause error to other function
router.post(
  "/register",
  [
    avatarUpload,
    validatePicture,
    validateSignUpInput,
    ageValidator,
    validateEmailRegex,
    validateUsernameLength,
    validatePasswordLength,
    checkUserDoesNotExist,
  ],
  registerUser
);
router.post(
  "/login",
  [validateSignInInput, validateEmailRegex, validatePasswordLength],
  loginUser
);
router.get("/:tokenId", fetchUser);
router.post("/refresh-token", refreshUserSession);

export default router;

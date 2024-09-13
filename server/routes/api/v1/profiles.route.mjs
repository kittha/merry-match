import express from "express";
import {
  getUserProfileById,
  updateUserProfileById,
  deleteUserById,
} from "../../../controllers/profile.controller.mjs";
import { ageValidator } from "../../../middlewares/age.validation.mjs";
import { validatePicture } from "../../../middlewares/picture.validation.mjs";
import { bioCharacterLength } from "../../../middlewares/bio.validation.mjs";
import { validateHobbiesArrayLength } from "../../../middlewares/hobbyArrayLength.validation.mjs";
import { blockEmailChange } from "../../../middlewares/blockEmailChange.middleware.mjs";
import { checkResourceOwnerByReqParam } from "../../../middlewares/checkResourceOwnerByReqParam.mjs";
import { avatarUpload } from "../../../middlewares/multer.middleware.mjs";

const router = express.Router();

router.get("/:userId", getUserProfileById);

router.put("/:userId", [], updateUserProfileById);

router.delete("/:userId", [], deleteUserById);

export default router;

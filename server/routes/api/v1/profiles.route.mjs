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

const router = express.Router();

// router.get("/", getAllProfiles);

router.get("/:userId", getUserProfileById);

router.put(
  "/:userId",
  [
    validatePicture,
    ageValidator,
    bioCharacterLength,
    validateHobbiesArrayLength,
    blockEmailChange,
  ],
  updateUserProfileById
);

router.delete("/:userId", deleteUserById);

export default router;

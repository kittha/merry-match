import express from "express";
import {
  uploadAvatar,
  getUserAvatar,
} from "../../../controllers/profile.controller.mjs";
import { avatarUpload } from "../../../middlewares/multer.middleware.mjs";
// import {
//   getAllProfiles,
//   getUserProfileById,
//   updateUserProfileById,
//   deleteUserProfile,
// } from "../../../controllers/profile.controller.mjs";

const router = express.Router();

// router.get("/", getAllProfiles);

// router.get("/:userId", getUserProfileById);

router.get("/:userId/get-avatar", getUserAvatar);

router.post("/:userId/upload-avatar", [avatarUpload], uploadAvatar);

// router.put("/:userId", updateUserProfileById);

// router.delete("/:userId", deleteUserProfile);

export default router;

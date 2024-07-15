import express from "express";

import {
  getUserProfileById,
  updateUserProfileById,
  deleteUserById,
} from "../../../controllers/profile.controller.mjs";

const router = express.Router();

// router.get("/", getAllProfiles);

router.get("/:userId", getUserProfileById);

router.put("/:userId", updateUserProfileById);

router.delete("/:userId", deleteUserById);

export default router;

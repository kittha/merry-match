import express from "express";
import {
  getMerryLists,
  updateStatus,
} from "../../../controllers/merrylist.controller.mjs";
const router = express.Router();
router.get("/:userId", getMerryLists);
router.patch("/:userId", updateStatus);
export default router;

import express from "express";
import { addMerry, undoMerry } from "../../../controllers/merry.controller.mjs";
import {
  getMerryLimitByUserId,
  getAvailableClicksTodayByUserId,
} from "../../../controllers/merry-limit.controller.mjs";

const router = express.Router();

router.get("/merry-limit/:userId", getMerryLimitByUserId);
router.get("/available-clicks/:userId", getAvailableClicksTodayByUserId);
router.post("/addMerry", addMerry);
router.delete("/undoMerry", undoMerry);

export default router;

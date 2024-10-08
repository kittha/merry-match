import express from "express";
import {
  addMerry,
  undoMerry,
  getMatchListByUserId,
  // getAvailableMatchesByUserId,
  getMatchListByUserIdFilter,
} from "../../../controllers/merry.controller.mjs";
import {
  getMerryLimitByUserId,
  getAvailableClicksTodayByUserId,
} from "../../../controllers/merry-limit.controller.mjs";
import { checkResourceOwnerByReqParam } from "../../../middlewares/checkResourceOwnerByReqParam.mjs";
import { checkResourceOwnerAddUndoMerry } from "../../../middlewares/checkResourceOwnerAddUndoMerry.mjs";

const router = express.Router();

router.get("/available-clicks/:userId", [], getAvailableClicksTodayByUserId);
// router.get("/available-matches/:userId", getAvailableMatchesByUserId);
router.get("/merry-limit/:userId", [], getMerryLimitByUserId);
router.get("/match/:userId", [], getMatchListByUserId);
router.get("/match/filter/:userId", [], getMatchListByUserIdFilter);
router.post("/addMerry", [], addMerry);
router.post("/undoMerry", [], undoMerry);

export default router;

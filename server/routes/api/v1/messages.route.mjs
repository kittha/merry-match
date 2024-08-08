import express from "express";
import {
  checkLastMessage,
  getChatHistory,
  sendMessage,
} from "../../../controllers/chat.controller.mjs";
import { checkResourceOwnerByReqParam } from "../../../middlewares/checkResourceOwnerByReqParam.mjs";
import { checkResourceOwnerByMatchId } from "../../../middlewares/checkResourceOwnerByMatchId.mjs";

const router = express.Router();

router.get("/last/:userId", [checkResourceOwnerByReqParam], checkLastMessage);
router.get("/:matchId", [checkResourceOwnerByMatchId], getChatHistory);
router.post("/:matchId", [checkResourceOwnerByMatchId], sendMessage);

export default router;

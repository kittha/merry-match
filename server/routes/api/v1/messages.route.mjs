import express from "express";
import {
  checkLastMessage,
  getChatHistory,
  sendMessage,
} from "../../../controllers/chat.controller.mjs";
import { checkResourceOwnerByReqParam } from "../../../middlewares/checkResourceOwnerByReqParam.mjs";
import { checkResourceOwnerByMatchId } from "../../../middlewares/checkResourceOwnerByMatchId.mjs";
import { avatarUpload } from "../../../middlewares/multer.middleware.mjs";

const router = express.Router();

router.get("/last/:userId", [], checkLastMessage);
router.get("/:matchId", [], getChatHistory);
router.post("/:matchId", [avatarUpload], sendMessage);

export default router;

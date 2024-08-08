import express from "express";
import {
  checkLastMessage,
  getChatHistory,
  sendMessage,
} from "../../../controllers/chat.controller.mjs";

const router = express.Router();

router.get("/last/:userId", checkLastMessage);
router.get("/:matchId", getChatHistory);
router.post("/:matchId", sendMessage);

export default router;

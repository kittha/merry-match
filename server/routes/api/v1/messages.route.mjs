import express from "express";
import {
  getChatHistory,
  sendMessage,
} from "../../../controllers/chat.controller.mjs";

const router = express.Router();

router.get("/:matchId", getChatHistory);
router.post("/:matchId", sendMessage);

// router.get("/:userId", getUserMessages);

// router.delete("/:userId", deleteMessage);

export default router;

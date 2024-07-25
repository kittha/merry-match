import express from "express";
import {
  getChatHistory,
  sendMessage,
} from "../../../controllers/message.controller.mjs";

const router = express.Router();

router.get("/:matchId", getChatHistory);

// router.get("/:userId", getUserMessages);

// router.post("/:userId", sendMessages);

// router.delete("/:userId", deleteMessage);

export default router;

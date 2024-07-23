import express from "express";
import {
  processPayment,
  handleWebhook,
} from "../../../controllers/payment.controller.mjs";

const router = express.Router();

router.post("/checkout", processPayment);
router.post("/webhook", handleWebhook);

export default router;

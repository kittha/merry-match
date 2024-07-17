import express from "express";
import { processPayment } from "../../../controllers/payment.controller.mjs";

const router = express.Router();

router.post("/checkout", processPayment);
// router.post("/webhook", watchPaymentStatus);
// router.post("/unsubscribe", changeSubscriptionState);

export default router;

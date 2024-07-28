import express from "express";

import { processPayment } from "../../../controllers/payment.controller.mjs";

const router = express.Router();

router.post("/checkout", processPayment);

export default router;

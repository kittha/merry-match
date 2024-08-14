import express from "express";

import { processPayment } from "../../../controllers/payment.controller.mjs";
import { checkResourceOwnerByReqBody } from "../../../middlewares/checkResourceOwnerByReqBody.mjs";

const router = express.Router();

router.post("/checkout", [], processPayment);

export default router;

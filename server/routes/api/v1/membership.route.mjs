import express from "express";
import { getMembershipData } from "../../../controllers/membership.controller.mjs";
import { generateBillingHistoryPDF } from "../../../controllers/pdf.controller.mjs";
const router = express.Router();

router.get("/:userId", getMembershipData);
router.get("/:userId/pdf", generateBillingHistoryPDF);
export default router;

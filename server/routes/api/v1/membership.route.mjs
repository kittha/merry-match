import express from "express";
import {
  getMembershipData,
  cancelUserPackage,
} from "../../../controllers/membership.controller.mjs";
import { generateBillingHistoryPDF } from "../../../controllers/pdf.controller.mjs";
import { checkResourceOwnerByReqParam } from "../../../middlewares/checkResourceOwnerByReqParam.mjs";

const router = express.Router();

router.get("/:userId", [], getMembershipData);
router.get("/:userId/pdf", [], generateBillingHistoryPDF);
router.delete("/:userId/cancel", [], cancelUserPackage);
export default router;

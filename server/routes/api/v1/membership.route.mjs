import express from "express";
import {
  getMembershipData,
  cancelUserPackage,
} from "../../../controllers/membership.controller.mjs";
import { generateBillingHistoryPDF } from "../../../controllers/pdf.controller.mjs";
import { checkResourceOwnerByReqParam } from "../../../middlewares/checkResourceOwnerByReqParam.mjs";

const router = express.Router();

router.get("/:userId", [checkResourceOwnerByReqParam], getMembershipData);
router.get(
  "/:userId/pdf",
  [checkResourceOwnerByReqParam],
  generateBillingHistoryPDF
);
router.delete(
  "/:userId/cancel",
  [checkResourceOwnerByReqParam],
  cancelUserPackage
);
export default router;

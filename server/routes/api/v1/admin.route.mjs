import express from "express";
import {
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
} from "../../../controllers/admin.controller.mjs";

const router = express.Router();

router.get("/", getAllComplaints);
router.get("/:complaintId", getComplaintById);
router.put("/:complaintId/status", updateComplaintStatus);

export default router;

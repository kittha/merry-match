import express from "express";
import {
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
  createPackage,
  updatePackageById,
  deletePackageById,
  getComplaintsByParam,
  getComplaintsByStatus,
} from "../../../controllers/admin.controller.mjs";
import { validateComplaintStatus } from "../../../middlewares/complaintStatus.validation.mjs";
import { validatePackageData } from "../../../middlewares/packageData.validation.mjs";
import { avatarUpload } from "../../../middlewares/multer.middleware.mjs";

const router = express.Router();

router.get("/complaints", getAllComplaints);
router.get("/complaints/param", getComplaintsByParam);
router.get("/complaints/list", getComplaintsByStatus);
router.get("/complaint/:complaintId", getComplaintById);
router.put(
  "/complaint/:complaintId/status",
  [validateComplaintStatus],
  updateComplaintStatus
);

router.post("/package", [avatarUpload, validatePackageData], createPackage);

router.put(
  "/:packageId",
  [avatarUpload, validatePackageData],
  updatePackageById
);

router.delete("/:packageId", deletePackageById);

export default router;

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
import authenticateAdmin from "../../../middlewares/authenticateAdmin.middleware.mjs";
import { validatePackageData } from "../../../middlewares/packageData.validation.mjs";
import { avatarUpload } from "../../../middlewares/multer.middleware.mjs";

const router = express.Router();
// TODO add middleware to chk Authentication & Authorization; chk input validation
router.get("/complaints", getAllComplaints);
router.get("/complaints/param", getComplaintsByParam);
router.get("/complaints/list", getComplaintsByStatus);
router.get("/complaint/:complaintId", getComplaintById);
router.put(
  "/complaint/:complaintId/status",
  [validateComplaintStatus],
  updateComplaintStatus
);

router.post(
  "/package",
  [avatarUpload, authenticateAdmin, validatePackageData],
  createPackage
);

router.put(
  "/:packageId",
  [avatarUpload, authenticateAdmin, validatePackageData],
  updatePackageById
);

router.delete("/:packageId", [authenticateAdmin], deletePackageById);

export default router;

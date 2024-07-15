import express from "express";
import {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackageById,
  deletePackageById,
} from "../../../controllers/package.controller.mjs";
import authenticateAdmin from "../../../middlewares/authenticateAdmin.middleware.mjs";
import { validatePackageData } from "../../../middlewares/validatePackageData.validation.mjs";

const router = express.Router();

router.get("/", getAllPackages);

router.get("/:packageId", getPackageById);

router.post("/", [authenticateAdmin, validatePackageData], createPackage);

router.put(
  "/:packageId",
  [authenticateAdmin, validatePackageData],
  updatePackageById
);

router.delete("/:packageId", [authenticateAdmin], deletePackageById);

export default router;

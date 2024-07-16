import express from "express";
import {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackageById,
  deletePackageById,
} from "../../../controllers/package.controller.mjs";
import supabaseAuthIsAdminMiddleware from "../../../middlewares/supabaseAuthIsAdminMiddleware.mjs";
import { validatePackageData } from "../../../middlewares/validatePackageData.validation.mjs";

const router = express.Router();

router.get("/", getAllPackages);

router.get("/:packageId", getPackageById);

// TODO: add IsAdmin Middleware
router.post("/", [validatePackageData], createPackage);

// TODO: add IsAdmin Middleware
router.put("/:packageId", [validatePackageData], updatePackageById);

// TODO: add IsAdmin Middleware
router.delete("/:packageId", [], deletePackageById);

export default router;

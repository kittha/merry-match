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

router.post(
  "/",
  [supabaseAuthIsAdminMiddleware, validatePackageData],
  createPackage
);

router.put(
  "/:packageId",
  [supabaseAuthIsAdminMiddleware, validatePackageData],
  updatePackageById
);

router.delete(
  "/:packageId",
  [supabaseAuthIsAdminMiddleware],
  deletePackageById
);

export default router;

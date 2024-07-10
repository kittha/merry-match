import express from "express";
import {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackageById,
} from "../../../controllers/package.controller.mjs";
// import {
//   createPackage,
//   deletePackageById,
// } from "../../../controllers/package.controller.mjs";
import supabaseAuthIsAdminMiddleware from "../../../middlewares/supabaseAuthIsAdminMiddleware.mjs";

const router = express.Router();

router.get("/", getAllPackages);

router.get("/:packageId", getPackageById);

// add IsAdmin Middleware
router.post("/", [], createPackage);

// add IsAdmin Middleware
router.put("/:packageId", [], updatePackageById);

// router.delete("/:packageId",[supabaseAuthIsAdminMiddleware], deletePackageById);

export default router;

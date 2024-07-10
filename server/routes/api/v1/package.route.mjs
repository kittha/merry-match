import express from "express";
import {
  getAllPackages,
  getPackageByParams,
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

router.get("/:packageName", getPackageByParams);

// add IdAdmin Middleware
router.post("/", [], createPackage);

// add IdAdmin Middleware
router.put("/:packageId", [], updatePackageById);

// router.delete("/:packageId",[supabaseAuthIsAdminMiddleware], deletePackageById);

export default router;

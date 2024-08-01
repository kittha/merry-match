import express from "express";
import {
  getAllPackages,
  getPackageById,
  getPackagesByParam,
} from "../../../controllers/package.controller.mjs";

const router = express.Router();

router.get("/", getPackagesByParam);

router.get("/:packageId", getPackageById);

export default router;

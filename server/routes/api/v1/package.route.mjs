import express from "express";
import {
  getAllPackages,
  getPackageById,
} from "../../../controllers/package.controller.mjs";

const router = express.Router();

router.get("/", getAllPackages);

router.get("/:packageId", getPackageById);

export default router;

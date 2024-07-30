import express from "express";
import { getMembershipPackage } from "../../../controllers/membership.controller.mjs";

const router = express.Router();

router.get("/:userId", getMembershipPackage);

export default router;

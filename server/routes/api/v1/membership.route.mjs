import express from "express";
import { getMembershipData } from "../../../controllers/membership.controller.mjs";

const router = express.Router();

router.get("/:userId", getMembershipData);

export default router;

import express from "express";
import { getMatchInformation } from "../../../controllers/matching.controller.mjs";

const router = express.Router();

router.get("/:matchId", getMatchInformation);

export default router;

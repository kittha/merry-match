import express from "express";
import { getMatchInformation } from "../../../controllers/matching.controller.mjs";
import { checkResourceOwnerByReqParam } from "../../../middlewares/checkResourceOwnerByReqParam.mjs";

const router = express.Router();

router.get("/:matchId", [], getMatchInformation);

export default router;

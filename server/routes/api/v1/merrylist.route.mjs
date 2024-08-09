import express from "express";
import { getMerryLists } from "../../../controllers/merrylist.controller.mjs";
import { checkResourceOwnerByReqParam } from "../../../middlewares/checkResourceOwnerByReqParam.mjs";

const router = express.Router();

router.get("/:userId", [checkResourceOwnerByReqParam], getMerryLists);

export default router;

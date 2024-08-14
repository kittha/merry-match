import express from "express";
import { fileComplaint } from "../../../controllers/complaints.controller.mjs";
import { checkResourceOwnerByReqBody } from "../../../middlewares/checkResourceOwnerByReqBody.mjs";

const router = express.Router();

router.post("/", [], fileComplaint);

export default router;

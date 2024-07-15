import express from "express";
import { fileComplaint } from "../../../controllers/complaints.controller.mjs";

const router = express.Router();

router.post("/", fileComplaint);

export default router;

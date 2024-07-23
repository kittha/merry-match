import express from "express";
import { getMerryLists } from "../../../controllers/merrylist.controller.mjs";
const router = express.Router();
router.get("/", getMerryLists);
export default router;

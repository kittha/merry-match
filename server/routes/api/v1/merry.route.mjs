import express from "express";
import { addMerry, undoMerry } from "../../../controllers/merry.controller.mjs";

const router = express.Router();

router.post("/", addMerry);
router.delete("/", undoMerry);

export default router;

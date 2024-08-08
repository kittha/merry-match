import express from "express";

import adminRoutes from "./admin.route.mjs";
import authRoutes from "./auth.route.mjs";
import fileComplaint from "./complaints.route.mjs";
import matchRoutes from "./match.route.mjs";
import membershipRoutes from "./membership.route.mjs";
import merryRoutes from "./merry.route.mjs";
import messagesRoutes from "./messages.route.mjs";
import merryListRoutes from "./merrylist.route.mjs";
import packageRoutes from "./package.route.mjs";
import paymentRoutes from "./payment.route.mjs";
import profilesRoutes from "./profiles.route.mjs";
import authenticateUser from "../../../middlewares/authenticateUser.middleware.mjs";
import authenticateAdmin from "../../../middlewares/authenticateAdmin.middleware.mjs";

const router = express.Router();

router.use("/admin", [authenticateAdmin], adminRoutes);
router.use("/auth", authRoutes);
router.use("/complaints", [authenticateUser], fileComplaint);
router.use("/membership", [authenticateUser], membershipRoutes);
router.use("/merry", [authenticateUser], merryRoutes);

router.use("/match", [authenticateUser], matchRoutes);
router.use("/messages", [authenticateUser], messagesRoutes);
router.use("/merry-list", [authenticateUser], merryListRoutes);

router.use("/packages", [authenticateUser], packageRoutes);
router.use("/payment", [authenticateUser], paymentRoutes);
router.use("/profiles", [authenticateUser], profilesRoutes);

export default router;

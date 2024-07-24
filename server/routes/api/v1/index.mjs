import express from "express";

import adminRoutes from "./admin.route.mjs";
import authRoutes from "./auth.route.mjs";
import fileComplaint from "./complaints.route.mjs";
// import membershipRoutes from "./membership.route.mjs";
import merryRoutes from "./merry.route.mjs";
// import merryListRoutes from "./merrylist.route.mjs"
import messagesRoutes from "./messages.route.mjs";
import packageRoutes from "./package.route.mjs";
import paymentRoutes from "./payment.route.mjs";
import profilesRoutes from "./profiles.route.mjs";
// import searchRoutes from "./search.route.mjs";
// import transactionRoutes from "./transaction.route.mjs";
// import userRoutes from "./user.route.mjs";
import authenticateUser from "../../../middlewares/authenticateUser.middleware.mjs";
import authenticateAdmin from "../../../middlewares/authenticateAdmin.middleware.mjs";

const router = express.Router();

router.use("/admin", [authenticateAdmin], adminRoutes);
router.use("/auth", authRoutes);
router.use("/complaints", [authenticateUser], fileComplaint);
// router.use("/membership", [authenticateUser], membershipRoutes); // Aggregator Endpoint
router.use("/merry", [authenticateUser], merryRoutes);
// router.use("/merry", [authenticateUser], merryRoutes);
// router.use("/merryList", [authenticateUser], merryListRoutes)
router.use("/messages", messagesRoutes);
router.use("/packages", packageRoutes);
router.use("/payment", paymentRoutes);
router.use("/profiles", [authenticateUser], profilesRoutes);
// router.use("/searchRoutes", searchRoutes);
// router.use("/transactionRoutes", transactionRoutes);
// router.use("/users", userRoutes);

export default router;

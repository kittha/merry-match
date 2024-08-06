import express from "express";

import adminRoutes from "./admin.route.mjs";
import authRoutes from "./auth.route.mjs";
import fileComplaint from "./complaints.route.mjs";
import matchRoutes from "./match.route.mjs";
import membershipRoutes from "./membership.route.mjs";
import merryRoutes from "./merry.route.mjs";
// import merryListRoutes from "./merrylist.route.mjs" // TODO : prepare to delete
import messagesRoutes from "./messages.route.mjs";
import merryListRoutes from "./merrylist.route.mjs";
// import messagesRoutes from "./messages.route.mjs"; // TODO : prepare to delete
import packageRoutes from "./package.route.mjs";
import paymentRoutes from "./payment.route.mjs";
import profilesRoutes from "./profiles.route.mjs";
// import searchRoutes from "./search.route.mjs"; // TODO : prepare to delete
// import transactionRoutes from "./transaction.route.mjs"; // TODO : prepare to delete
// import userRoutes from "./user.route.mjs"; // TODO : prepare to delete
import authenticateUser from "../../../middlewares/authenticateUser.middleware.mjs";
import authenticateAdmin from "../../../middlewares/authenticateAdmin.middleware.mjs";

const router = express.Router();

router.use("/admin", [authenticateAdmin], adminRoutes);
router.use("/auth", authRoutes);
router.use("/complaints", [authenticateUser], fileComplaint);
router.use("/membership", [authenticateUser], membershipRoutes);
router.use("/merry", [authenticateUser], merryRoutes);

router.use("/match", [authenticateUser], matchRoutes);
router.use("/messages", messagesRoutes);
router.use("/merry-list", [authenticateUser], merryListRoutes);

router.use("/packages", packageRoutes);
router.use("/payment", paymentRoutes);
router.use("/profiles", [authenticateUser], profilesRoutes);
// router.use("/searchRoutes", searchRoutes); // TODO : prepare to delete
// router.use("/transactionRoutes", transactionRoutes); // TODO : prepare to delete
// router.use("/users", userRoutes); // TODO : prepare to delete

export default router;

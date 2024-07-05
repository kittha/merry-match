import express from "express";

import authRoutes from "./auth.route.mjs";
// import userRoutes from "./user.route.mjs";
// import profilesRoutes from "./profiles.route.mjs";
// import messagesRoutes from "./messages.route.mjs";
// import packageRoutes from "./package.route.mjs";
// import paymentRoutes from "./payment.route.mjs";
// import transactionRoutes from "./transaction.route.mjs";
// import matchingRoutes from "./matching.route.mjs";
// import complaintsRoutes from "./complaints.route.mjs";
// import adminRoutes from "./admin.route.mjs";
// import blockRoutes from "./blockUser.route.mjs";
// import searchRoutes from "./search.route.mjs";
// import hobbiesRoutes from "./hobbies.route.mjs";

const router = express.Router();

router.use("/auth", authRoutes);
// router.use("/users", userRoutes);
// router.use("/profiles", profilesRoutes);
// router.use("/messages", messagesRoutes);
// router.use("/packages", packageRoutes);
// router.use("/payment", paymentRoutes);
// router.use("/transactionRoutes", transactionRoutes);
// router.use("/matchingRoutes", matchingRoutes);
// router.use("/complaintRoutes", complaintsRoutes);
// router.use("/adminRoutes", adminRoutes);
// router.use("/blockRoutes", blockRoutes);
// router.use("/searchRoutes", searchRoutes);
// router.use("/hobbiesRoutes", hobbiesRoutes);

export default router;

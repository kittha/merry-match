// import getUserPackageById from "./transaction.controller.mjs";
// import getUserTransactionsById from "./transaction.controller.mjs";

// export const getmembershipDataById = async (req, res) => {
//   const userId = req.user.user_id;
//   try {
//     const mockReq = { userId }; // send req by using userId as argument

//     let userPackage, userTransaction;
//     let userPackageStatusCode, userTransactionStatusCode;

//     const userPackageResponse = {
//       status: (statusCode) => {
//         userPackageStatusCode = statusCode;
//         return {
//           json: (data) => {
//             userPackage = data;
//           },
//         };
//       },
//     };

//     const userTransactionResponse = {
//       status: (statusCode) => {
//         userTransactionStatusCode = statusCode;
//         return {
//           json: (data) => {
//             userTransaction = data;
//           },
//         };
//       },
//     };

//     await getUserPackageById(mockReq, userPackageResponse); // reuse api
//     await getUserTransactionsById(mockReq, userTransactionResponse); // reuse api

//     const membershipData = { userPackage, userTransaction };

//     if (userPackageStatusCode !== 200 || userTransactionStatusCode !== 200) {
//       return res.status(500).json({ error: "Failed to fetch membership data" });
//     }

//     res.status(200).json(membershipData);
//   } catch (error) {
//     console.error("Error fetching membership data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

import {
  getPackageIdByUserId,
  removeUserPackage,
} from "../models/user.model.mjs";
import { getPackageById } from "../models/package.model.mjs";
import { getTransactionWithPackageDetails } from "../models/transaction.model.mjs";

export const getMembershipData = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch package ID associated with the user
    const packageId = await getPackageIdByUserId(userId);

    // Fetch package details using the package ID
    const packageDetails = await getPackageById(packageId);

    // Fetch billing history with package details using the user ID
    const billingHistoryWithPackageDetails =
      await getTransactionWithPackageDetails(userId);

    // Respond with combined data
    res.status(200).json({
      packageDetails,
      billingHistory: billingHistoryWithPackageDetails,
    });
  } catch (error) {
    console.error("Error getting membership data:", error);
    res.status(500).json({ message: error.message });
  }
};

export const cancelUserPackage = async (req, res) => {
  const { userId } = req.params;

  try {
    console.log(`Fetching package ID for userId: ${userId}`);
    const packageId = await getPackageIdByUserId(userId);
    console.log(`Fetched packageId: ${packageId} for userId: ${userId}`);

    if (!packageId) {
      return res
        .status(404)
        .json({ message: "User has no package to cancel." });
    }

    const result = await removeUserPackage(userId, packageId);

    res.status(200).json({ message: "Package canceled successfully.", result });
  } catch (error) {
    console.error("Error canceling package:", error);
    res.status(500).json({ message: error.message });
  }
};

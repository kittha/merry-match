import { getPackageIdByUserId } from "../models/user.model.mjs";
import { getPackageById } from "../models/package.model.mjs";
import { getTransactionWithPackageDetails } from "../models/transaction.model.mjs"; // Assuming you have this function

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

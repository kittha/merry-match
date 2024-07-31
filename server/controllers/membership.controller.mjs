import { getPackageIdByUserId } from "../models/user.model.mjs";
import { getPackageById } from "../models/package.model.mjs";
import { getTransactionByUserId } from "../models/transaction.model.mjs"; // Assuming you have this function

export const getMembershipData = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch package ID associated with the user
    const packageId = await getPackageIdByUserId(userId);

    // Fetch package details using the package ID
    const packageDetails = await getPackageById(packageId);

    // Fetch billing history using the user ID
    const billingHistory = await getTransactionByUserId(userId);

    // Attach package details to each billing history entry
    const billingHistoryWithPackageDetails = await Promise.all(
      billingHistory.map(async (transaction) => {
        const packageDetails = await getPackageById(transaction.package_id);
        if (!packageDetails) {
          throw new Error(
            `Package details not found for packageId: ${transaction.package_id}`
          );
        }
        return {
          ...transaction,
          package_name: packageDetails.name,
          package_price: packageDetails.price,
        };
      })
    );
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

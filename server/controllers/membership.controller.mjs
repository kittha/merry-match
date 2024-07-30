import { getPackageIdByUserId } from "../models/user.model.mjs";
import { getPackageById } from "../models/package.model.mjs";

export const getMembershipPackage = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch package ID associated with the user
    const packageId = await getPackageIdByUserId(userId);

    // Fetch package details using the package ID
    const packageDetails = await getPackageById(packageId);

    // Respond with package details
    res.status(200).json(packageDetails);
  } catch (error) {
    console.error("Error getting membership package:", error);
    res.status(500).json({ message: error.message });
  }
};

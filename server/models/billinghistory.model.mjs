import { getTransactionByUserId } from "./transaction.model.mjs"; // Adjust the import if necessary

export const getBillingHistoryByUserId = async (userId) => {
  try {
    // Fetch billing history for the user
    const billingHistory = await getTransactionByUserId(userId);
    return billingHistory;
  } catch (error) {
    throw new Error(`Error fetching billing history: ${error.message}`);
  }
};

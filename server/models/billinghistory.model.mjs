import { getTransactionByUserId } from "./transaction.model.mjs";

export const getBillingHistoryByUserId = async (userId) => {
  try {
    const billingHistory = await getTransactionByUserId(userId);
    return billingHistory;
  } catch (error) {
    throw new Error(`Error fetching billing history: ${error.message}`);
  }
};

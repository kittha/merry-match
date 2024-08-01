import { getTransactionsOlderThan } from "../models/transaction.model.mjs";
import { removeUserPackage } from "../models/user.model.mjs";
import cron from "node-cron";

// Function to check and remove old packages
const checkAndRemoveOldPackages = async () => {
  try {
    // Get the date one month ago
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Fetch transactions older than one month
    const oldTransactions = await getTransactionsOlderThan(oneMonthAgo);

    for (const transaction of oldTransactions) {
      // Remove the package from the user
      await removeUserPackage(transaction.user_id, transaction.package_id);

      console.log(
        `Removed package ${transaction.package_id} from user ${transaction.user_id}`
      );
    }
  } catch (error) {
    console.error("Error removing old packages:", error);
  }
};

// Schedule the job to run daily at midnight
cron.schedule("0 0 * * *", checkAndRemoveOldPackages);

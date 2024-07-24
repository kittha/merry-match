import connectionPool from "../configs/db.mjs";

/**
 * Inserts a new transaction into the database.
 * @param {object} transaction - The transaction object containing details to be inserted.
 * @returns {Promise<object>} - Returns an object containing the transaction_id.
 */
export const createTransaction = async (transaction) => {
  const { package_id, status, created_at, updated_at, session_id } =
    transaction;

  try {
    const result = await connectionPool.query(
      `
      INSERT INTO transactions 
      (package_id, status, created_at, updated_at, session_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING transaction_id
      `,
      [package_id, status, created_at, updated_at, session_id]
    );
    return result.rows[0]; // Returns the transaction_id
  } catch (error) {
    console.error("Error inserting transaction:", error);
    throw error;
  }
};

/**
 * Updates the status of a transaction in the database.
 * @param {string} stripeId - The ID of the Stripe payment intent.
 * @param {string} status - The new status of the transaction.
 * @returns {Promise<object>} - Returns an object containing the transaction_id if updated.
 */
export const updateTransactionStatus = async (stripeId, status) => {
  try {
    const result = await connectionPool.query(
      `
      UPDATE transactions
      SET status = $1, updated_at = NOW()
      WHERE stripe_id = $2
      RETURNING transaction_id
      `,
      [status, stripeId]
    );

    if (result.rowCount === 0) {
      console.warn("No rows updated.");
      return { transaction_id: 1 }; // Default value if no rows are updated
    }

    return result.rows[0]; // Returns the transaction_id
  } catch (error) {
    console.error("Error updating transaction status:", error);
    throw error;
  }
};

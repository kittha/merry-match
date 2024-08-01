import connectionPool from "../configs/db.mjs";

/**
 * Inserts a new transaction into the database.
 * @param {object} transaction - The transaction object containing details to be inserted.
 * @returns {Promise<object>} - Returns an object containing the transaction_id.
 */
export const createTransaction = async (transaction) => {
  const {
    user_id,

    package_id,
    status,
    created_at,
    updated_at,
    session_id,
  } = transaction;

  try {
    const result = await connectionPool.query(
      `
      INSERT INTO transactions 
      (user_id,package_id, status, created_at, updated_at, session_id)
      VALUES ($1, $2, $3, $4, $5,$6)
      RETURNING transaction_id
      `,
      [user_id, package_id, status, created_at, updated_at, session_id]
    );
    return result.rows[0]; // Returns the transaction_id
  } catch (error) {
    console.error("Error inserting transaction:", error);
    throw error;
  }
};

export const getTransactionByUserId = async (userId) => {
  try {
    const result = await connectionPool.query(
      "SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    return result.rows;
  } catch (error) {
    throw new Error(`Error fetching transaction by user id: ${error.message}`);
  }
};
export const getTransactionsOlderThan = async (date) => {
  try {
    const result = await connectionPool.query(
      "SELECT * FROM transactions WHERE created_at < $1",
      [date]
    );
    return result.rows;
  } catch {
    throw new Error(`Error fetching transaction: ${error.message}`);
  }
};

import connectionPool from "../configs/db.mjs"; // Adjust the import path

/**
 * Inserts a new transaction into the database.
 * @param {object} transaction - The transaction object containing details to be inserted.
 * @returns {Promise<void>}
 */
export const createTransaction = async (transaction) => {
  const query = `
    INSERT INTO transactions 
    (package_id, status, created_at, updated_at, session_id, stripe_id)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;
  const values = [
    transaction.package_id, // INTEGER
    transaction.status, // VARCHAR
    transaction.created_at, // TIMESTAMPTZ
    transaction.updated_at, // TIMESTAMPTZ
    transaction.session_id, // TEXT
    transaction.stripe_id, // TEXT
  ];

  try {
    const client = await connectionPool.connect();
    await client.query(query, values);
    client.release();
  } catch (error) {
    console.error("Error inserting transaction:", error);
    throw error;
  }
};

/**
 * Updates the status of a transaction in the database.
 * @param {string} stripeId - The ID of the Stripe payment intent.
 * @param {string} status - The new status of the transaction.
 * @returns {Promise<void>}
 */
export const updateTransactionStatus = async (stripeId, status) => {
  const query = `
    UPDATE transactions
    SET status = $1, updated_at = NOW()
    WHERE stripe_id = $2
  `;
  const values = [status, stripeId];

  try {
    const client = await connectionPool.connect();
    await client.query(query, values);
    client.release();
  } catch (error) {
    console.error("Error updating transaction status:", error);
    throw error;
  }
};

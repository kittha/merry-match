import connectionPool from "../configs/db.mjs"; // Adjust the import path

export const createTransaction = async (transaction) => {
  try {
    const result = await connectionPool.query(
      `INSERT INTO transactions 
      ( package_id, status, created_at, updated_at, session_id, stripe_id)
     VALUES 
      ($1, $2, $3, $4, $5, $6 )`,

      [
        transaction.package_id, // INTEGER
        transaction.status, // VARCHAR
        transaction.created_at, // TIMESTAMPTZ
        transaction.updated_at, // TIMESTAMPTZ
        transaction.session_id, // TEXT
        transaction.stripe_id, // TEXT
      ]
    );
    return;
  } catch (error) {
    console.error("Error inserting transaction:", error);
    throw error;
  }
};

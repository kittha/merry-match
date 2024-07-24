import connectionPool from "../configs/db.mjs";

export const createPayment = async (data) => {
  const { user_id, card_number, card_name, expired_date } = data;

  try {
    const result = await connectionPool.query(
      `
  INSERT INTO payments 
  (user_id,card_number,card_name,expired_date,created_at,updated_at)
  VALUES ($1, $2, $3, $4, $5,$6) RETURNING payment_id`,
      [user_id, card_number, card_name, expired_date, created_at, updated_at]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

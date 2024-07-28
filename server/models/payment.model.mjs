import connectionPool from "../configs/db.mjs";

export const createPayment = async (data) => {
  const {
    user_id,
    card_number,
    card_type,
    card_name,
    expired_date,
    created_at,
    updated_at,
  } = data;

  try {
    const result = await connectionPool.query(
      `
  INSERT INTO payment
  (user_id,card_number,card_type,card_name,expired_date,created_at,updated_at)
  VALUES ($1, $2, $3, $4, $5,$6,$7) RETURNING payment_id`,
      [
        user_id,
        card_number,
        card_type,
        card_name,
        expired_date,
        created_at,
        updated_at,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

export const getPaymentById = async (paymentId) => {
  try {
    const result = await connectionPool.query(
      `
  SELECT * FROM payment WHERE payment_id = $1 
  `,
      [paymentId]
    );
    const paymentDetails = result.rows[0];
    return paymentDetails;
  } catch (error) {
    console.error("Error fetching payment:", error);
    throw error;
  }
};

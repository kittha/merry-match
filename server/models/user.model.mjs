import connectionPool from "../configs/db.mjs";

/**
 * Check if user exist in the registry of Merry Match application.
 *
 * @param {string} email
 * @returns
 */
export const doesUserExist = async (email) => {
  try {
    const result = await connectionPool.query(
      `
        SELECT *
        FROM auth.users
        WHERE email = $1
        `,
      [email]
    );

    return result;
  } catch (error) {
    console.error("Error occurred during signUp:", error);
    throw error;
  }
};
export const createUser = async (data) => {
  const { username, email, role_id } = data;
  const currentDateTime = new Date();
  try {
    const result = await connectionPool.query(
      `INSERT INTO users (username, email, created_at, updated_at)
      VALUES ($1, $2, $3, $3)
      RETURNING user_id`,
      [username, email, currentDateTime]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in user model", error);
    throw error;
  }
};

/**
 * Get user data (from table: users, user_profiles, hobbies, profile_picture) from email from the Merry Match application.
 *
 * @param {string} email
 * @returns {object} - The data object, containing the user, profile, hobbies, avatar key:value pairs.
 */
export const getUser = async (id) => {
  try {
    const result = await connectionPool.query(
      `SELECT * FROM users WHERE email = $1 OR user_id::text = $1`,
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in user model: ", error);
  }
};

export const updateUser = async (userId, data) => {
  const { username, role_id } = data;
  const currentDateTime = new Date();
  try {
    const result = await connectionPool.query(
      `UPDATE users SET username = $2, updated_at = $3 
      WHERE user_id = $1
      RETURNING *`,
      [userId, username, currentDateTime]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error in user model: ", error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const result = await connectionPool.query(
      `DELETE FROM users WHERE user_id = $1`,
      [userId]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error in user model: ", error);
  }
};

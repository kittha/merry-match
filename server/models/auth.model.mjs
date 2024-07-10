// this is a place to create our own auth model
// if you want to register user, get user information
// please go to ./server/models/user.model.mjs
import connectionPool from "../configs/db.mjs";

export const getUserRole = async (userId) => {
  try {
    const result = await connectionPool.query(
      `
        SELECT role_id
        FROM users
        WHERE user_id = $1
        `,
      [userId]
    );

    if (result.rows.length === 0) {
      return { message: `user role not found` };
    }

    const userRole = result.rows[0];
    return userRole;
  } catch (error) {
    console.error("Error occurred while fetching user:", error);
    throw error;
  }
};

export const getPackageByParams = async (req) => {
  try {
    const packageName = req.params.packageName;
    const result = await connectionPool.query(
      `
          SELECT *
          FROM packages
          WHERE name = $1
          `,
      [packageName]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  } finally {
    connectionPool.release();
  }
};

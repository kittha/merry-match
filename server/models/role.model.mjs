import connectionPool from "../configs/db.mjs";
export const getRole = async (userId) => {
  try {
    const result = await connectionPool.query(
      `SELECT roles.role_id, roles.name FROM roles 
      JOIN users ON roles.role_id = users.role_id 
      AND users.user_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return { message: `user role not found` };
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error occurred while fetching user:", error);
    throw error;
  }
};

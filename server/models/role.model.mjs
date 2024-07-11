import connectionPool from "../configs/db.mjs";
export const getRole = async (roleId) => {
  try {
    const result = await connectionPool.query(
      `SELECT * FROM roles WHERE role_id = $1`,
      [roleId]
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

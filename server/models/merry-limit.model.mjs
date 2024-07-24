import connectionPool from "../configs/db.mjs";

/**
 * Get merry-limit data by userId from the Merry Match application.
 *
 * @param {number} userId - The Number of user id.
 * @returns {object} - The Object that contain key:value pair of merry-limit of that user.
 */
export const getMerryLimit = async (userId) => {
  try {
    const result = await connectionPool.query(
      `
          SELECT packages.merry_limit
          FROM users
          JOIN roles ON users.role_id = roles.role_id
          JOIN packages ON roles.package_id = packages.package_id
          WHERE users.user_id = $1
          `,
      [userId]
    );

    if (result.rows.length === 0) {
      throw new Error("No data found for the given userId.");
    }

    const userMerryLimit = result.rows[0].merry_limit;

    return { merry_limit: userMerryLimit };
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

// TODO: update database schema to handle "availableClicksTodayByUserId"
export const updateAvailableClicksToday = async (userId) => {
  try {
    const result = await connectionPool.query(
      `
          `,
      [userId]
    );

    if (result.rows.length === 0) {
      throw new Error("No data found for the given userId.");
    }

    const availableClicksToday = result.rows[0].merry_limit;

    return { availableClicksToday: availableClicksToday };
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

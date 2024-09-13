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
        JOIN packages ON users.package_id = packages.package_id
        WHERE users.user_id = $1
      `,
      [userId]
    );

    let userMerryLimit = result.rows[0]?.merry_limit || 20;

    return { merry_limit: userMerryLimit };
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};
export const getAvailableClicksTodayByUserId = async (userId) => {
  try {
    const currentDateTime = new Date();
    const currentDate = currentDateTime.toISOString().split("T")[0];
    const result = await connectionPool.query(
      `
      SELECT *
      FROM match_status
      WHERE (matched_at::date = $2 OR created_at::date = $2)
        AND status_1 IN ('merry', 'match')
        AND user_id_1 = $1;
          `,
      [userId, currentDate]
    );

    const availableClicksToday = result.rowCount;

    return { availableClicksToday: availableClicksToday };
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

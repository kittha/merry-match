import connectionPool from "../configs/db.mjs";

/**
 * Get all merry list data from Merry Match Web Application
 *
 * @param {*} req - The request object, contain non important things.
 * @returns - A Array of Objects(merry lists)
 */
export const getMerryLists = async (req) => {
  try {
    const result = await connectionPool.query(
      `
        SELECT *
        FROM profiles
        `
    );

    return result.rows;
  } catch (error) {
    console.error("Error fetching merry list:", error);
    throw error;
  }
};

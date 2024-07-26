import connectionPool from "../configs/db.mjs";

export const getAllMatch = async (userId) => {
  try {
    await connectionPool.query("BEGIN");
    const result = await connectionPool.query(
      `SELECT * FROM match_status
        WHERE user_id_1 = $1 OR user_id_2 = $1`,
      [userId]
    );
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    console.error("Error occurred during adding merry status:", error);
    throw error;
  }
};

export const checkMatch = async (ownId, anotherId) => {
  try {
    await connectionPool.query("BEGIN");
    const result = await connectionPool.query(
      `SELECT * FROM match_status
        WHERE ((user_id_1 = $2 AND user_id_2 = $1) 
            OR (user_id_1 = $1 AND user_id_2 = $2))
        AND (status_1 = 'match')`,
      [ownId, anotherId]
    );
    console.log(result.rows[0]);
    return result.rows;
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    console.error("Error occurred during adding merry status:", error);
    throw error;
  }
};

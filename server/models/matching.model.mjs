import connectionPool from "../configs/db.mjs";

export const getAllStatus = async (userId) => {
  try {
    await connectionPool.query("BEGIN");
    const result = await connectionPool.query(
      `SELECT * FROM match_status
        WHERE user_id_1 = $1 OR user_id_2 = $1`,
      [userId]
    );
    // console.log(result.rows);
    return result.rows;
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    console.error("Error occurred in matching model:", error);
    throw error;
  }
};

export const checkIsMatch = async (ownId, anotherId) => {
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
    return result.rows[0];
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    console.error("Error occurred in matching model:", error);
    throw error;
  }
};

export const getAllMatch = async (userId) => {
  try {
    await connectionPool.query("BEGIN");
    const result = await connectionPool.query(
      `SELECT * FROM match_status
        WHERE (user_id_1 = $1 OR user_id_2 = $1) 
        AND (status_1 = 'match')`,
      [userId]
    );
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    console.error("Error occurred in matching model:", error);
    throw error;
  }
};

export const getMatchByMatchId = async (matchId) => {
  try {
    await connectionPool.query("BEGIN");
    const result = await connectionPool.query(
      `SELECT * FROM match_status
        WHERE match_id = $1 
        AND status_1 = 'match'`,
      [matchId]
    );
    // console.log(result.rows[0]);
    return result.rows[0];
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    console.error("Error occurred in matching model:", error);
    throw error;
  }
};

// export const getFilteredMatchWithChat = async (userId) => {
//   try {
//     await connectionPool.query("BEGIN");
//     const result = await connectionPool.query(
//       `SELECT * FROM match_status
//       JOIN messages
//         ON match_status.match_id = messages.match_id
//       LEFT JOIN media
//         ON messages.media_id = media.media_id
//       WHERE (match_status.user_id_1 = $1
//         OR match_status.user_id_2 = $1)
//       AND (match_status.status_1 = 'match')
//       ORDER BY messages.sent_at DESC
//       LIMIT 1`,
//       [userId]
//     );
//     console.log(result.rows[0]);
//     return result.rows[0];
//   } catch (error) {
//     await connectionPool.query("ROLLBACK");
//     console.error("Error occurred in matching model:", error);
//     throw error;
//   }
// };

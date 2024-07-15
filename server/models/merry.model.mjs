import connectionPool from "../configs/db.mjs";

// status: "none", "merry", "merry_match"
export const addMerry = async (userId, merryUserId) => {
  try {
    console.log(userId, merryUserId);

    await connectionPool.query("BEGIN");

    const result1 = await connectionPool.query(
      `
        INSERT INTO match_status (user_id_1, user_id_2, status, created_at, updated_at)
        VALUES ($1, $2, 'merry', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        ON CONFLICT (user_id_1, user_id_2) DO UPDATE
        SET status = CASE
        WHEN match_status.status = 'merry' AND match_status.user_id_1 = $2 THEN 'merry_match'
        ELSE 'merry'
        END,
        updated_at = CURRENT_TIMESTAMP
        `,
      [userId, merryUserId]
    );

    console.log("First insertion result:", result1.rows);

    const result2 = await connectionPool.query(
      `
          INSERT INTO match_status (user_id_1, user_id_2, status, created_at, updated_at)
          VALUES ($2, $1, 'merry', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          ON CONFLICT (user_id_1, user_id_2) DO UPDATE
          SET status = CASE
              WHEN match_status.status = 'merry' AND match_status.user_id_1 = $1 THEN 'merry_match'
              ELSE 'merry'
          END,
          updated_at = CURRENT_TIMESTAMP
        `,
      [merryUserId, userId]
    );

    console.log("Second insertion result:", result2.rows);

    await connectionPool.query("COMMIT");
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    console.error("Error occurred during adding merry status:", error.message);
    throw error;
  }
};

export const undoMerry = async (userId, merryUserId) => {
  try {
    await connectionPool.query("BEGIN");

    const result = await connectionPool.query(
      `
        UPDATE match_status
        SET status = CASE
            WHEN user_id_1 = $2 AND user_id_2 = $1 AND status = 'merry_match' THEN 'merry'
            WHEN user_id_1 = $1 AND user_id_2 = $2 AND status = 'merry_match' THEN 'merry'
            ELSE 'none'
        END,
        updated_at = CURRENT_TIMESTAMP
        WHERE (user_id_1 = $1 AND user_id_2 = $2)
           OR (user_id_1 = $2 AND user_id_2 = $1)
        RETURNING status;
      `,
      [userId, merryUserId]
    );

    if (result.rows[0].status === "none") {
      await connectionPool.query(
        `
          DELETE FROM match_status
          WHERE (user_id_1 = $1 AND user_id_2 = $2 AND status = 'none')
             OR (user_id_1 = $2 AND user_id_2 = $1 AND status = 'none');
        `,
        [userId, merryUserId]
      );
    }

    await connectionPool.query("COMMIT");
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    throw error;
  }
};

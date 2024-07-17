import connectionPool from "../configs/db.mjs";

// status: "none", "merry", "merry_match"
export const addMerry = async (userId, merryUserId) => {
  const currentDateTime = new Date();

  try {
    await connectionPool.query("BEGIN");

    // Check if merryUserId has already clicked merry on userId
    const checkStatusResult = await connectionPool.query(
      `
      SELECT status FROM match_status
      WHERE (user_id_1 = $1 AND user_id_2 = $2)
      `,
      [merryUserId, userId]
    );

    const currentStatus =
      checkStatusResult.rows.length > 0
        ? checkStatusResult.rows[0].status
        : "none";

    let newStatus = "merry";
    if (currentStatus === "merry") {
      newStatus = "merry_match";
    }

    // Insert or update the status from userId to merryUserId
    const result = await connectionPool.query(
      `
      INSERT INTO match_status (user_id_1, user_id_2, status, created_at, updated_at)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id_1, user_id_2) DO UPDATE
      SET status = $3,
          updated_at = $4
      RETURNING *
      `,
      [userId, merryUserId, newStatus, currentDateTime]
    );

    // console.log("Insertion/Update result:", result.rows);

    // If the new status is 'merry_match', update the reverse direction as well
    if (newStatus === "merry_match") {
      await connectionPool.query(
        `
        UPDATE match_status
        SET status = 'merry_match',
            updated_at = $3,
            matched_at = $4
        WHERE user_id_1 = $1 AND user_id_2 = $2
        `,
        [merryUserId, userId, currentDateTime, currentDateTime]
      );
    }

    await connectionPool.query("COMMIT");
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    console.error("Error occurred during adding merry status:", error.message);
    throw error;
  }
};

// status: "none", "merry", "merry_match"
export const undoMerry = async (userId, merryUserId) => {
  try {
    await connectionPool.query("BEGIN");

    // Check the current status from userId to merryUserId
    const checkStatusResult = await connectionPool.query(
      `
      SELECT status FROM match_status
      WHERE user_id_1 = $1 AND user_id_2 = $2
      `,
      [userId, merryUserId]
    );

    const currentStatus =
      checkStatusResult.rows.length > 0
        ? checkStatusResult.rows[0].status
        : "none";

    // if (currentStatus === "merry_match") {
    //   // If the status is 'merry_match', update it to 'merry'
    //   await connectionPool.query(
    //     `
    //     UPDATE match_status
    //     SET status = 'merry'
    //         updated_at = $3,
    //         matched_at = $4
    //     WHERE user_id_1 = $2 AND user_id_2 = $1
    //     `,
    //     [userId, merryUserId, currentDateTime, currentDateTime]
    //   );
    // }

    if (currentStatus === "merry_match") {
      // If the status is 'merry_match', update it to 'merry'
      await connectionPool.query(
        `
        DELETE FROM match_status
        WHERE user_id_1 = $1 AND user_id_2 = $2
        `,
        [userId, merryUserId]
      );
    } else if (currentStatus === "merry") {
      // If the status is 'merry', delete the row
      await connectionPool.query(
        `
        DELETE FROM match_status
        WHERE user_id_1 = $1 AND user_id_2 = $2
        `,
        [userId, merryUserId]
      );
    }

    await connectionPool.query("COMMIT");
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    console.error("Error occurred during undoing merry status:", error.message);
    throw error;
  }
};

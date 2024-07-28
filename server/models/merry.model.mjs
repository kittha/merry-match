import connectionPool from "../configs/db.mjs";

/**
 *
 * @param {number} userId - The ID of the user initiating the "merry" status.
 * @param {number} merryUserId - The ID of the user receiving the "merry" status from `userId`.
 */
export const addMerry = async (userId, merryUserId) => {
  // status: "merry", "match", "unmatch"
  const currentDateTime = new Date();
  let result;
  try {
    await connectionPool.query("BEGIN");
    const updateResult = await connectionPool.query(
      `UPDATE match_status 
        SET status_1 = CASE 
              WHEN (user_id_1 = $1 AND status_2 = 'merry') THEN 'match'
              WHEN (user_id_2 = $1 AND status_1 = 'merry') THEN 'match'
              WHEN user_id_1 = $1 THEN 'merry' 
            ELSE status_1 END, 
            status_2 = CASE 
              WHEN (user_id_2 = $1 AND status_1 = 'merry') THEN 'match'
              WHEN (user_id_1 = $1 AND status_2 = 'merry') THEN 'match' 
              WHEN user_id_2 = $1 THEN 'merry'
            ELSE status_2 END,
            updated_1_at = CASE 
              WHEN user_id_1 = $1 THEN $3 
            ELSE updated_1_at END,
            updated_2_at = CASE 
              WHEN user_id_2 = $1 THEN $3 
            ELSE updated_2_at END,  
            matched_at = CASE
              WHEN (user_id_1 = $1 AND status_2 = 'merry')
                OR (user_id_2 = $1 AND status_1 = 'merry') 
              THEN $3 
            ELSE matched_at END
        WHERE (user_id_1 = $2 AND user_id_2 = $1) 
          OR (user_id_1 = $1 AND user_id_2 = $2)
        RETURNING *`,
      [userId, merryUserId, currentDateTime]
    );
    console.log("UPDATE", updateResult.rows);
    result = updateResult;

    if (updateResult.rowCount === 0) {
      const insertResult = await connectionPool.query(
        `INSERT INTO match_status(
          user_id_1, 
          user_id_2, 
          status_1, 
          created_at, 
          updated_1_at ) 
        VALUES ($1, $2, 'merry', $3, $3)
        ON CONFLICT (user_id_1, user_id_2) DO NOTHING`,
        [userId, merryUserId, currentDateTime]
      );
      console.log("INSERT", insertResult.rows);
      result = insertResult;
    }

    await connectionPool.query("COMMIT");

    return result.rows[0];
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    console.error("Error occurred during adding merry status:", error);
    throw error;
  }
};

/**
 *
 * @param {number} userId - The ID of the user who is undoing the "merry" status.
 * @param {number} merryUserId - The ID of the user who received the "merry" status from `userId`.
 */
export const undoMerry = async (userId, merryUserId) => {
  // status: "merry", "match", "unmatch"
  const currentDateTime = new Date();
  // console.log(userId, merryUserId);
  let result;
  try {
    await connectionPool.query("BEGIN");
    const updateResult = await connectionPool.query(
      `UPDATE match_status 
        SET status_1 = CASE 
              WHEN user_id_1 = $1 THEN 'unmatch' 
              WHEN status_1 = 'match' THEN 'merry' 
            ELSE status_1 END,
            status_2 = CASE 
              WHEN user_id_2 = $1 THEN 'unmatch' 
              WHEN status_2 = 'match' THEN 'merry' 
            ELSE status_2 END,
            updated_1_at = CASE 
              WHEN user_id_1 = $1 THEN $3 
            ELSE updated_1_at END,
            updated_2_at = CASE 
              WHEN user_id_2 = $1 THEN $3 
            ELSE updated_2_at END
        WHERE (user_id_1 = $2 AND user_id_2 = $1) 
          OR (user_id_1 = $1 AND user_id_2 = $2)
        RETURNING *;`,
      [userId, merryUserId, currentDateTime]
    );
    result = updateResult;
    console.log("UPDATE", updateResult.rows);

    if (updateResult.rowCount === 0) {
      const insertResult = await connectionPool.query(
        `INSERT INTO match_status(
          user_id_1, 
          user_id_2, 
          status_1,
          created_at, 
          updated_1_at ) 
        VALUES ($1, $2, 'unmatch', $3, $3)
        ON CONFLICT (user_id_1, user_id_2) DO NOTHING
        RETURNING *`,
        [userId, merryUserId, currentDateTime]
      );

      console.log("INSERT", insertResult.rows);
      result = insertResult;
    }

    await connectionPool.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    console.error("Error occurred during undoing merry status:", error);
    throw error;
  }
};

export const getPotentialMatches = async (userId) => {
  try {
    const result = await connectionPool.query(
      `
      SELECT 
          p2.user_id AS matched_user_id, 
          p2.name AS matched_name, 
          p2.hobbies AS matched_hobbies,
          p2.date_of_birth AS matched_date_of_birth,
          p2.location AS matched_location,
          p2.city AS matched_city,
          p2.sexual_identities AS matched_sexual_identities,
          p2.sexual_preferences AS matched_sexual_preferences,
          p2.racial_preferences AS matched_racial_preferences,
          p2.meeting_interests AS matched_meeting_interests,
          p2.bio AS matched_bio,
          pp.sequence AS picture_sequence,
          pp.url AS profile_picture_url,
          (
              (CASE WHEN p2.date_of_birth BETWEEN p1.date_of_birth - INTERVAL '10 years' AND p1.date_of_birth + INTERVAL '10 years' THEN 1 ELSE 0 END) +
              (CASE WHEN p1.location = p2.location THEN 1 ELSE 0 END) +
              (CASE WHEN p1.city = p2.city THEN 1 ELSE 0 END) +
              (CASE WHEN p1.sexual_identities = p2.sexual_preferences THEN 1 ELSE 0 END) +
              (CASE WHEN p1.sexual_preferences = p2.sexual_identities THEN 1 ELSE 0 END) +
              (CASE WHEN p1.racial_preferences = p2.racial_preferences THEN 1 ELSE 0 END) +
              (CASE WHEN p1.meeting_interests = p2.meeting_interests THEN 1 ELSE 0 END) +
              (CASE WHEN p1.bio = p2.bio THEN 1 ELSE 0 END) +
              COALESCE(hobby_match_count, 0)
          ) AS match_score
      FROM 
          profiles p1
      JOIN 
          profiles p2 ON p1.user_id != p2.user_id
      LEFT JOIN LATERAL (
          SELECT COUNT(*) AS hobby_match_count
          FROM unnest(p1.hobbies) AS hobby1
          JOIN unnest(p2.hobbies) AS hobby2 ON hobby1 = hobby2
      ) hobby_matches ON true
      LEFT JOIN 
          profile_pictures pp ON p2.user_id = pp.user_id AND pp.sequence BETWEEN 1 AND 5
      WHERE 
          p1.user_id = $1
          AND (p1.sexual_preferences ILIKE '%' || p2.sexual_identities || '%'
              OR p2.sexual_preferences ILIKE '%' || p1.sexual_identities || '%')
      ORDER BY 
          match_score DESC;
      `,
      [userId]
    );

    // Helper function to calculate age from date of birth
    const calculateAge = (dateOfBirth) => {
      const dob = new Date(dateOfBirth);
      const diffMs = Date.now() - dob.getTime();
      const ageDt = new Date(diffMs);
      return Math.abs(ageDt.getUTCFullYear() - 1970);
    };

    // Aggregate matches into a list with age calculation, index assignment, and profile pictures formatting
    const matchesMap = new Map();

    result.rows.forEach((row) => {
      if (!matchesMap.has(row.matched_user_id)) {
        matchesMap.set(row.matched_user_id, {
          user_id: row.matched_user_id,
          name: row.matched_name,
          hobbies: row.matched_hobbies,
          birthday: row.matched_date_of_birth,
          age: calculateAge(row.matched_date_of_birth), // Calculate age
          country: row.matched_location,
          city: row.matched_city,
          sexualIdentity: row.matched_sexual_identities,
          sexualPreference: row.matched_sexual_preferences,
          racialPreference: row.matched_racial_preferences,
          meetingInterests: row.matched_meeting_interests,
          bio: row.matched_bio,
          avatars: {}, // Initialize profile pictures object
          match_score: row.match_score,
        });
      }
      const match = matchesMap.get(row.matched_user_id);
      if (row.picture_sequence && row.profile_picture_url) {
        match.avatars[`image${row.picture_sequence}`] = row.profile_picture_url;
      }
    });

    // Convert map to array and sort by match_score
    const matches = Array.from(matchesMap.values())
      .sort((a, b) => b.match_score - a.match_score)
      .map((match, index) => ({ ...match, index })); // Re-assign index after sorting

    const payload = { user_id: userId, matches };

    return payload;
  } catch (error) {
    console.error("Error finding matches:", error.message);
    throw error;
  }
};

//------------------------------------------------------------------------------------------
/*Add Merry*/
// Check merry status result
// const checkStatusResult = await connectionPool.query(
//   `
//   SELECT status FROM match_status
//   WHERE (user_id_1 = $1 AND user_id_2 = $2)
//   `,
//   [merryUserId, userId]
// );

// fetch default existing status;
// if previous status is " " then "none";
// if previous existing status combination (user_1 & user_2 or user_2 & user_1) is "merry" then preserve "merry";
// const currentStatus =
//   checkStatusResult.rows.length > 0
//     ? checkStatusResult.rows[0].status
//     : "none";

// if current status is "none"; then new status is "merry"
// let newStatus = "merry";

// if current status is "merry" then new status is "merry_match"
// if (currentStatus === "merry") {
//   newStatus = "merry_match";
// }

// START OF CODE BLOCK
// case 1
// if previous combination of "user_id_1 & user_id_2" or "user_id_2 & user_id_1" didn't exist before
// and the current status is "none" & new status = "merry"
// the code will create new row; insert new relation; insert new status; insert new timestamp
// and jump to next code block

// case 2
// but, if previous combination of "user_id_1 & user_id_2" or "user_id_2 & user_id_1" already exist
// the code used "CONFLICT" to alter the behaviour
// In database; table "match_status"; we had ALTER the table with this code;
/* 
      ALTER TABLE match_status
      ADD CONSTRAINT unique_user_match UNIQUE (user_id_1, user_id_2);
    */
// this mean the "combination of 'user_id_1' & 'user_id_2'" must be unique
// if we insert new row with combination of "user_id_1 & user_id_2" or "user_id_2 & user_id_1"
// this called "CONFLICT"
// ON CONFLICT the code won't use INSERT but use UPDATE instead;
// const result = await connectionPool.query(
//   `
//   INSERT INTO match_status (user_id_1, user_id_2, status, created_at, updated_at)
//   VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
//   ON CONFLICT (user_id_1, user_id_2) DO UPDATE
//   SET status = $3,
//       updated_at = $4,
//       matched_at = CASE
//         WHEN $3 = 'merry_match' THEN CURRENT_TIMESTAMP
//         ELSE NULL
//       END
//   RETURNING *
//   `,
//   [userId, merryUserId, newStatus, currentDateTime]
// );
// // END OF CODE BLOCK

// // if current status is "merry" & new status is "merry_match"
// if (newStatus === "merry_match") {
//   await connectionPool.query(
//     `
//     UPDATE match_status
//     SET status = 'merry_match',
//         updated_at = $3,
//         matched_at = $4
//     WHERE (user_id_1 = $1 AND user_id_2 = $2)
//        OR (user_id_1 = $2 AND user_id_2 = $1);
//     `,
//     [userId, merryUserId, currentDateTime, currentDateTime]
//   );
// }

/* Undo Merry */
// status: "none", "merry", "merry_match"
// const currentDateTime = new Date();
// try {
//   await connectionPool.query("BEGIN");

//   // Check the current status from userId to merryUserId
//   const checkStatusResult1 = await connectionPool.query(
//     `
//     SELECT status FROM match_status
//     WHERE user_id_1 = $1 AND user_id_2 = $2
//     `,
//     [userId, merryUserId]
//   );

//   const currentStatus1 =
//     checkStatusResult1.rows.length > 0
//       ? checkStatusResult1.rows[0].status
//       : "none";

//   if (currentStatus1 === "merry_match") {
//     // If the status is 'merry_match', update it to 'none'
//     await connectionPool.query(
//       `
//       UPDATE match_status
//       SET status = 'none',
//       updated_at = $3
//       WHERE user_id_1 = $1 AND user_id_2 = $2
//       `,
//       [userId, merryUserId, currentDateTime]
//     );
//   } else if (currentStatus1 === "merry") {
//     // If the status is 'merry', update it to 'none'
//     await connectionPool.query(
//       `
//       UPDATE match_status
//       SET status = 'none',
//       updated_at = $3
//           WHERE user_id_1 = $1 AND user_id_2 = $2
//           `,
//       [userId, merryUserId, currentDateTime]
//     );
//   }

//   const checkStatusResult2 = await connectionPool.query(
//     `
//     SELECT status FROM match_status
//     WHERE user_id_1 = $2 AND user_id_2 = $1
//     `,
//     [userId, merryUserId]
//   );

//   const currentStatus2 =
//     checkStatusResult2.rows.length > 0
//       ? checkStatusResult2.rows[0].status
//       : "none";

//   if (currentStatus2 === "merry_match") {
//     // If the status is 'merry_match', update it to 'merry'
//     await connectionPool.query(
//       `
//           UPDATE match_status
//           SET status = 'merry',
//               updated_at = $3
//           WHERE user_id_1 = $2 AND user_id_2 = $1
//           `,
//       [userId, merryUserId, currentDateTime]
//     );
//   }

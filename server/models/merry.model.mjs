import connectionPool from "../configs/db.mjs";
import transformMatchedData from "../utils/transformMatchedData.mjs";

/**
 *
 * @param {string} userId - The ID of the user initiating the "merry" status.
 * @param {string} merryUserId - The ID of the user receiving the "merry" status from `userId`.
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
 * @param {string} userId - The ID of the user who is undoing the "merry" status.
 * @param {string} merryUserId - The ID of the user who received the "merry" status from `userId`.
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

/**
 * Retrieves potential matches for a given user ID.
 *
 * @param {string} userId - The ID of the user for whom to retrieve potential matches.
 * @return {Promise<Object>} An object containing the user ID and an array of matches, sorted by match score.
 * @throws {Error} If an error occurs while finding matches.
 */
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
          ms.match_id AS match_id,
          ms.created_at AS match_created_at,
          ms.matched_at AS match_matched_at,
          ms.status_1 AS match_status_1,
          ms.status_2 AS match_status_2,
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
      LEFT JOIN 
          match_status ms ON (p1.user_id = ms.user_id_1 AND p2.user_id = ms.user_id_2) OR (p1.user_id = ms.user_id_2 AND p2.user_id = ms.user_id_1)
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
    const matches = transformMatchedData(result.rows);
    return { user_id: userId, matches };
  } catch (error) {
    console.error("Error finding matches:", error.message);
    throw error;
  }
};

/**
 * Retrieves a list of available matches for a given user.
 *
 * @param {string} userId - The ID of the user to find matches for.
 * @return {Promise<Object>} An object containing the user ID and a list of matches.
 * @throws {Error} If there is an error retrieving the matches.
 */
export const getAvailableMatches = async (userId) => {
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
          ms.match_id AS match_id,
          ms.created_at AS match_created_at,
          ms.matched_at AS match_matched_at,
          ms.status_1 AS match_status_1,
          ms.status_2 AS match_status_2,
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
      LEFT JOIN 
          match_status ms ON (p1.user_id = ms.user_id_1 AND p2.user_id = ms.user_id_2) OR (p1.user_id = ms.user_id_2 AND p2.user_id = ms.user_id_1)
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
          AND ms.status_1 != 'merry'
          OR ms.status_1 IS NULL
          AND ms.status_2 IS NOT NULL
      ORDER BY 
          match_score DESC;
      `,
      [userId]
    );
    const matches = transformMatchedData(result.rows);
    return { user_id: userId, matches };
  } catch (error) {
    console.error("Error finding unmatched users:", error.message);
    throw error;
  }
};

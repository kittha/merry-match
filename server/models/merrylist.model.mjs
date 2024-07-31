import connectionPool from "../configs/db.mjs";

/**
 * Get all merry list data from Merry Match Web Application
 *
 * @param {*} req - The request object, contain non important things.
 * @returns - A Array of Objects(merry lists)
 */
export const getMerryLists = async (userId) => {
  try {
    const result = await connectionPool.query(
      `SELECT
    p.profile_id AS profile_id,
    p.user_id AS user_id,
    pp.sequence AS profile_picture_sequence,
    pp.url AS profile_picture,
    p.name AS name,
    p.date_of_birth AS birthday,
    p.city AS city,
    p.location AS location,
    p.sexual_identities AS sexual_identities,
    p.sexual_preferences AS sexual_preferences,
    p.racial_preferences AS racial_preferences,
    p.meeting_interests AS meeting_interests,
    p.bio AS bio,
    p.hobbies AS hobbies,
    ms.status_1 AS status_1,
    ms.user_id_1 AS user_id_1,
    ms.user_id_2 AS user_id_2,
    ms.created_at AS created_at,
    ms.updated_1_at AS updated_1_at
    FROM profiles p
    LEFT JOIN profile_pictures pp
    ON p.user_id = pp.user_id 
    AND (pp.sequence = 1 OR pp.sequence = 2)
    LEFT JOIN match_status ms
    ON p.user_id = ms.user_id_2
    WHERE
    ms.user_id_1 = $1 
    AND (ms.status_1 = 'match' OR ms.status_1 = 'merry')`,
      [userId]
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching merry list:", error);
    throw error;
  }
};

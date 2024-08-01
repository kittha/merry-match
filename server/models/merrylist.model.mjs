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
      `
    SELECT
    profiles.profile_id, profiles.user_id, profile_pictures.url, profiles.name, profiles.date_of_birth, profiles.city, profiles.location, profiles.sexual_identities, profiles.sexual_preferences,
    profiles.racial_preferences, profiles.meeting_interests, match_status.status_1, match_status.user_id_1, match_status.user_id_2
    FROM profiles
    LEFT JOIN
    profile_pictures ON profiles.user_id = profile_pictures.user_id AND profile_pictures.sequence = 1
    LEFT JOIN
    match_status ON profiles.user_id = match_status.user_id_2      
    WHERE
    match_status.user_id_1 = $1 AND (match_status.status_1 = 'match' OR match_status.status_1 = 'merry');
      `,
      [userId]
    );

    return result.rows;
  } catch (error) {
    console.error("Error fetching merry list:", error);
    throw error;
  }
};

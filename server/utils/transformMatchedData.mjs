import calculateAge from "./calculateAge.mjs";

/**
 * Transforms the given rows of matched data into an array of matches with additional properties.
 *
 * @param {Array} rows - The rows of matched data to transform.
 * @return {Array} An array of matches with additional properties sorted by match_score in descending order.
 */
export const transformMatchedData = (rows) => {
  const matchesMap = new Map();
  rows.forEach((row) => {
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
        match_id: row.match_id,
        match_created_at: row.created_at,
        match_matched_at: row.matched_at,
        match_user_id_1: row.user_id_1,
        match_user_id_2: row.user_id_2,
        match_status_1: row.status_1,
        match_status_2: row.status_2,
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

  return matches;
};

export default transformMatchedData;

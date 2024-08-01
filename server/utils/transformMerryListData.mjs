/**
 * Transforms the given rows of merry list into an array of merry list with additional properties.
 *
 * @param {Array} rows - The rows of merry list to transform.
 * @return {Array} An array of merry list with additional properties.
 */
export const transformMerryListData = (rows) => {
  const calculateAge = (date_of_birth) => {
    const dob = new Date(date_of_birth);
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };

  const merryListsMap = new Map();

  rows.forEach((row) => {
    if (!merryListsMap.has(row.user_id)) {
      merryListsMap.set(row.user_id, {
        user_id: row.user_id,
        sequence: row.profile_picture_sequence,
        url: row.profile_picture,
        avatars: {}, // Initialize profile pictures object
        name: row.name,
        birthday: row.birthday,
        age: calculateAge(row.birthday), // Calculate age
        country: row.location,
        city: row.city,
        sexualIdentity: row.sexual_identities,
        sexualPreference: row.sexual_preferences,
        racialPreference: row.racial_preferences,
        meetingInterests: row.meeting_interests,
        bio: row.bio,
        hobbies: row.hobbies,
        status_1: row.status_1,
        status_2: row.status_2,
        user_id_1: row.user_id_1,
        user_id_2: row.user_id_2,
        created_at: row.created_at,
        updated_1_at: row.updated_1_at,
      });
    }
    const merryList = merryListsMap.get(row.user_id);

    if (row.profile_picture_sequence && row.profile_picture) {
      merryList.avatars[`image${row.profile_picture_sequence}`] =
        row.profile_picture;
    }
  });

  // Convert the map to an array and sort by `status_1` if needed
  return Array.from(merryListsMap.values()).sort((a, b) => {
    // Example sorting by `status_1`, adjust as necessary
    return a.status_1.localeCompare(b.status_1);
  });
};

export default transformMerryListData;

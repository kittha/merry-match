import connectionPool from "../configs/db.mjs";
export const createProfile = async (userId, data) => {
  const {
    name,
    birthday,
    country,
    city,
    sexualIdentity,
    sexualPreference,
    racialPreference,
    meetingInterest,
    hobbies,
    bio,
  } = data;
  const currentDateTime = new Date();
  try {
    const result = await connectionPool.query(
      `INSERT INTO profiles (
        user_id, 
        name, 
        date_of_birth, 
        location, 
        city, 
        sexual_identities, 
        sexual_preferences, 
        racial_preferences, 
        meeting_interests,
        hobbies, 
        bio, 
        created_at, 
        updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $12)
      RETURNING profile_id`,
      [
        userId,
        name,
        birthday,
        country,
        city,
        sexualIdentity,
        sexualPreference,
        racialPreference,
        meetingInterest,
        hobbies,
        bio,
        currentDateTime,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in profile model", error);
    throw error;
  }
};
export const getProfile = async (userId) => {
  try {
    const result = await connectionPool.query(
      `SELECT * FROM profiles WHERE user_id = $1`,
      [userId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in profile model", error);
    throw error;
  }
};
export const updateProfile = async (userId, data) => {
  const {
    name,
    birthday,
    country,
    city,
    sexualIdentity,
    sexualPreference,
    racialPreference,
    meetingInterest,
    hobbies,
    bio,
  } = data;
  const currentDateTime = new Date();
  try {
    await connectionPool.query(
      `UPDATE profiles SET 
          name = $2, 
          date_of_birth = $3, 
          location = $4, 
          city = $5, 
          sexual_identities = $6, 
          sexual_preferences = $7, 
          racial_preferences = $8, 
          meeting_interests = $9,
          hobbies = $10
          bio = $11, 
          updated_at = $12
        WHERE user_id = $1
        RETURNING *`,
      [
        userId,
        name,
        birthday,
        country,
        city,
        sexualIdentity,
        sexualPreference,
        racialPreference,
        meetingInterest,
        hobbies,
        bio,
        currentDateTime,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in profile model", error);
    throw error;
  }
};

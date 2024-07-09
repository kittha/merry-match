import connectionPool from "../configs/db.mjs";

export const createrUser = async (formData) => {
  try {
    const {
      email,
      password,
      name,
      date_of_birth,
      location,
      city,
      sexual_identities,
      sexual_preferences,
      racial_preferences,
      meeting_interests,
      bio,
    } = formData;

    await client.query("BEGIN");

    const userIdResult = await connectionPool.query(
      `
      INSERT INTO users (email)
      VALUES ($1)
      RETURNING user_id
      `,
      [email]
    );

    const userId = userIdResult.rows[0].user_id;

    await connectionPool.query(
      `
     INSERT INTO user_profiles (user_id, name, date_of_birth, location, city, sexual_identities, sexual_preferences, racial_preferences, meeting_interests, bio)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `,
      [
        (userId,
        name,
        date_of_birth,
        location,
        city,
        sexual_identities,
        sexual_preferences,
        racial_preferences,
        meeting_interests,
        bio),
      ]
    );

    await connectionPool.query("COMMIT");
    console.log("User signed up successfully:", userId);
    return;
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    console.error("Error occurred during signUp:", error);
    throw error;
  } finally {
    connectionPool.release();
  }
};

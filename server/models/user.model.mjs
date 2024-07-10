import connectionPool from "../configs/db.mjs";

export const doesUserExist = async (email) => {
  try {
    const result = await connectionPool.query(
      `
        SELECT *
        FROM auth.users
        WHERE email = $1
        `,
      [email]
    );
    console.log("I'm at user Model");

    return result;
  } catch (error) {
    console.error("Error occurred during signUp:", error);
    throw error;
  }
};

export const getUser = async (email) => {
  try {
    const result = await connectionPool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error occurred during signIn:", error);
  }
};

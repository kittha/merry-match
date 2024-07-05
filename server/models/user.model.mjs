import connectionPool from "../configs/db.mjs";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const createUser = async (username, password, email) => {
  const roleUser = 2;
  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const result = await connectionPool.query(
      `
      INSERT INTO users (username, password, email, role_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id
      `,
      [username, hashPassword, email, roleUser]
    );
    const userId = result.rows[0].id;
    console.log(`User created successfully: ${username} (ID: ${userId})`);
    return userId;
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw error;
  }
};

export const findUserByUsername = async (username) => {
  try {
    const result = await connectionPool.query(
      `
      SELECT *
      FROM users
      WHERE username=$1
      `,
      [username]
    );
    const user = result.rows[0];

    if (user) {
      console.log(`User found by username: ${username}`);
    } else {
      console.log(`User not found with username: ${username}`);
    }

    return user || null;
  } catch (error) {
    console.error(
      `Error finding user by username=${username}: ${error.message}`
    );
    throw error;
  }
};

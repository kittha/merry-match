// this is a place to create our own auth model
// if you want to register user, get user information
// please go to ./server/models/user.model.mjs
import connectionPool from "../configs/db.mjs";
import { supabase } from "../utils/supabaseClient.mjs";

export const getUserRole = async (authId) => {
  try {
    const result = await connectionPool.query(
      `
        SELECT users.user_id, users.auth_id, roles.role_id, roles.name
        FROM users JOIN roles 
        ON users.role_id = roles.role_id 
        AND users.auth_id = $1
        `,
      [authId]
    );

    if (result.rows.length === 0) {
      return { message: `user role not found` };
    }

    const userRole = result.rows[0];
    return userRole;
  } catch (error) {
    console.error("Error occurred while fetching user:", error);
    throw error;
  }
};

export const getPackageByParams = async (req) => {
  try {
    const packageName = req.params.packageName;
    const result = await connectionPool.query(
      `
          SELECT *
          FROM packages
          WHERE name = $1
          `,
      [packageName]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  } finally {
    connectionPool.release();
  }
};

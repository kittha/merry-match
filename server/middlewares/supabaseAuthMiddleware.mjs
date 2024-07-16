import { getUser } from "../services/supabaseAuth.service.mjs";
import connectionPool from "../configs/db.mjs";

const supabaseAuthMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];

    const user = await getUser(accessToken);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // // Fetch role FROM user_profiles (eg. role = package 1, package 2, package 3, etc.)
    // const queryText = "SELECT role_id FROM user WHERE user_id = $1";
    // const queryValues = [user.id];
    // const result = await connectionPool.query(queryText, queryValues);

    // if (result.rows.length === 0) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in Supabase authentication middleware:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default supabaseAuthMiddleware;

import { getUser } from "../models/user.model.mjs";
import connectionPool from "../configs/db.mjs";

const supabaseAuthIsAdminMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];

    const user = await getUser(accessToken);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Fetch role FROM user_profiles
    const queryText = "SELECT role_id FROM user WHERE user_id = $1";
    const queryValues = [user.id];
    const result = await connectionPool.query(queryText, queryValues);

    if (result.rows.length === 0 || result.rows[0].role !== 1) {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in Supabase authentication middleware:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default supabaseAuthIsAdminMiddleware;

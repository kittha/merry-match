import connectionPool from "../configs/db.mjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

/**
 * Check Is user is a member? & role is admin or not?
 *
 * @param {object} req -  The request object, containing the header with Bearer token (JWT) with/without data in body.
 * @param {object} res - The response object
 * @param {object} next
 * @returns
 */
const authenticateAdmin = async (req, res, next) => {
  // console.log("cookie is :", req.cookies);
  // console.log("token is : ", req.cookies?.token);
  // console.log("refreshToken is : ", req.cookies?.refreshToken);

  const accessToken = req.cookies?.token;

  if (!accessToken) {
    return res.sendStatus(401); // Unauthorized if no token is present
  }

  let decodedData;
  try {
    decodedData = jwt.verify(accessToken, process.env.SUPABASE_JWT_TOKEN);
    console.log("Token is valid");
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({ error: "Token is invalid" });
  }

  try {
    const userEmail = decodedData.email;

    // then identify user email (unique value) (email has strong authentication, I think we can trust this uniqueness)
    // use email to search user role
    const supabaseQueryResult = await connectionPool.query(
      `SELECT * FROM users WHERE email = $1`,
      [userEmail]
    );

    const userDataFromDatabase = supabaseQueryResult.rows[0];

    if (!userDataFromDatabase) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { user_id, username, role_id } = userDataFromDatabase;

    // if userRole isn't 1 (role Admin) then response back "code 401: Unauthorized"
    if (role_id !== 1) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const bundledUserData = {
      ...decodedData,
      user_id,
      username,
      role_id,
    };

    req.user = bundledUserData;
    return next();
  } catch (error) {
    console.error("Error in Supabase authentication middleware:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default authenticateAdmin;

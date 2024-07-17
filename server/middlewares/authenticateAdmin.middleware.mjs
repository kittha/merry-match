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
  try {
    // chech if request has header "Authorization"
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // read JWT Token -> get uuid from token
    const accessToken = req.headers.authorization.split(" ")[1];
    let decodedData = "";
    jwt.verify(
      accessToken,
      process.env.SUPABASE_JWT_TOKEN,
      (error, decoded) => {
        if (error) {
          console.error("Token verification failed:", error);
        } else {
          console.log("Token is valid");
          decodedData = decoded;
        }
      }
    );

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
    next();
  } catch (error) {
    console.error("Error in Supabase authentication middleware:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default authenticateAdmin;

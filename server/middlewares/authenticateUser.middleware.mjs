import connectionPool from "../configs/db.mjs";

/**
 * Check Is user is a member?
 *
 * @param {object} req -  The request object, containing the header with Bearer token (JWT) with/without data in body.
 * @param {object} res - The response object
 * @param {object} next
 * @returns
 */
const authenticateUser = async (req, res, next) => {
  try {
    // chech if request has header "Authorization"
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // read JWT Token -> get uuid from token
    const accessToken = req.headers.authorization.split(" ")[1];
    const decoded = jwtDecode(accessToken);

    const userUuid = decoded.user_metadata.sub;

    // (temporary structure) use uuid to search row of user info in database
    const supabaseAuthQueryResult = await connectionPool.query(
      `
      SELECT *
      FROM auth.users 
      WHERE id = $1
      `,
      [userUuid]
    );

    // then identify user email (unique value) (email has strong authentication, I think we can trust this uniqueness)
    const userEmail = supabaseAuthQueryResult.rows[0].email;

    // use email to search user role
    const supabaseQueryResult = await connectionPool.query(
      `SELECT * FROM users WHERE email = $1`,
      [userEmail]
    );

    const user = supabaseQueryResult.rows[0];

    // if no userRole (eg.role 1 = admin, role 2 = user) then response back "code 401: Unauthorized"
    if (user.role_id !== 1 || user.role_id !== 2) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in Supabase authentication middleware:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default authenticateUser;

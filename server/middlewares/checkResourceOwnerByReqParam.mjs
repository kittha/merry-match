// this function require "authenticateUser middleware" in front of it,
// reason: this function need userIdFromJwtToken.
// please re-check the middleware at "server/routes/api/v1/index.mjs"
export const checkResourceOwnerByReqParam = (req, res, next) => {
  const userIdFromJwtToken = String(req.user.user_id);
  const userIdFromReqParams = String(req.params.userId);
  // console.log("userIdFromJwtToken", userIdFromJwtToken);
  // console.log("userIdFromReqParams", userIdFromReqParams);

  if (userIdFromJwtToken !== userIdFromReqParams) {
    return res
      .status(403)
      .json({ error: "Forbidden: You do not have access to this resource" });
  }

  next();
};

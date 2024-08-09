// this function require "authenticateUser middleware" in front of it,
// reason: this function need userIdFromJwtToken.
// please re-check the middleware at "server/routes/api/v1/index.mjs"
export const checkResourceOwnerByReqBody = (req, res, next) => {
  // console.log(req.body);

  const userIdFromJwtToken = String(req.user.user_id);
  const userIdFromReqBody1 = String(req.body.userId);
  const userIdFromReqBody2 = String(req?.body?.user?.user_id);

  if (
    userIdFromJwtToken === userIdFromReqBody1 ||
    userIdFromJwtToken === userIdFromReqBody2
  ) {
    return next();
  }
  return res
    .status(403)
    .json({ error: "Forbidden: You do not have access to this resource" });
};

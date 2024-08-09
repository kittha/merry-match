// this function require "authenticateUser middleware" in front of it,
// reason: this function need userIdFromJwtToken.
// please re-check the middleware at "server/routes/api/v1/index.mjs"
export const checkResourceOwnerAddUndoMerry = (req, res, next) => {
  // console.log(req.body);

  const userIdFromJwtToken = String(req.user.user_id);
  const userIdLiking = String(req.body.userId);
  const userIdLiked = String(req.body.merryUserId);

  if (
    userIdFromJwtToken === userIdLiking ||
    userIdFromJwtToken === userIdLiked
  ) {
    return next();
  }
  return res
    .status(403)
    .json({ error: "Forbidden: You do not have access to this resource" });
};

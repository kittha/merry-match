import { getLastMessages } from "../models/chat.model.mjs";

// this function require "authenticateUser middleware" in front of it,
// reason: this function need userIdFromJwtToken.
// please re-check the middleware at "server/routes/api/v1/index.mjs"
export const checkResourceOwnerByMatchId = async (req, res, next) => {
  const userIdFromJwtToken = String(req.user.user_id);

  const { matchId } = req.params;
  const matchIdNum = Number(matchId);
  const matchIdNumArr = [matchIdNum];
  const lastResult = await getLastMessages(matchIdNumArr);

  const chatSenderId = String(lastResult[lastResult.length - 1]?.sender_id);
  const chatReceiverId = String(lastResult[lastResult.length - 1]?.receiver_id);

  if (
    lastResult &&
    (chatSenderId === userIdFromJwtToken ||
      chatReceiverId === userIdFromJwtToken)
  ) {
    return next();
  }
  return res
    .status(403)
    .json({ error: "Forbidden: You do not have access to this resource" });
};

export const authorizeUser = (req, res, next) => {
  const { userId } = req.params;

  if (req.user.userId !== userId) {
    return res
      .status(403)
      .json({ error: "Forbidden: You do not have access to this resource" });
  }

  next();
};

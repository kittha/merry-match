export const blockEmailChange = (req, res, next) => {
  const { email } = req.body;

  if (email && req.user.email !== email) {
    return res.status(403).json({
      error: "Changing email address is not allowed.",
    });
  }

  return next();
};

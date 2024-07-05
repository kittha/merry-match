export const validateUsernamePassword = (req, res, next) => {
  const { username, password } = req.body;

  if (username.length < 4) {
    return res.status(400).json({
      message:
        "400 Bad Request: Please input username more than 4 characters long.",
    });
  }

  if (password.length < 8 || password.length > 26) {
    return res.status(400).json({
      message:
        "400 Bad Request: Please input password between 8 to 26 characters long.",
    });
  }

  next();
};

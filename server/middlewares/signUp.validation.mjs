export const validateSignUp = (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({
      message: "400 Bad Request: Please input username or password or email.",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "400 Bad Request: Please enter email address in valid format.",
    });
  }

  if (username.length < 6) {
    return res.status(400).json({
      message:
        "400 Bad Request: Please input username more than 6 characters long.",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message:
        "400 Bad Request: Please input password more than 8 characters long.",
    });
  }

  next();
};

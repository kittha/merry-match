export const validatePackageData = (req, res, next) => {
  const { name, price, merry_limit, details, packageDetails } = req.body;
  if (!name || !price || !merry_limit || !details) {
    console.error(
      "Name, price, merry_limit, details must be provided to create package."
    );
    return res.status(401).json({
      message:
        "Name, price, merry_limit, details must be provided to create package.",
    });
  }

  return next();
};

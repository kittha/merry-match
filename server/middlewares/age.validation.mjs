export const ageValidator = (req, res, next) => {
  const { birthday } = req.body;

  if (!birthday) {
    return res.status(400).json({ error: "Date of birth is required." });
  }

  // Step 1: Parse the ISO string to a Date object
  const date = new Date(birthday);

  // Step 2: Validate if the date is valid
  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: "Invalid date format." });
  }

  // Step 3: Check if age > 18
  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.setFullYear(today.getFullYear() - 18)
  );

  if (date > eighteenYearsAgo) {
    return res
      .status(400)
      .json({ error: "User must be at least 18 years old." });
  }

  // Step 4: Format the extracted date part back to an ISO string without the time component
  const formattedDate = date.toISOString().split("T")[0];

  // Replace the original birthdaywith the formatted one
  req.body.birthday = formattedDate;
  return next();
};

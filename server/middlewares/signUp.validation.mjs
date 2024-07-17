export const validateSignUp = (req, res, next) => {
  /**/
  console.log("Incoming request body: ", req.body.date_of_birth);

  // Step 1: Parse the ISO string to a Date object
  const isoString = req.body.date_of_birth;
  const date = new Date(isoString);

  // Step 2: Extract the date part (year, month, and day) from the Date object
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = date.getUTCDate().toString().padStart(2, "0");

  // Step 3: Format the extracted date part back to an ISO string without the time component
  const truncatedIsoString = `${year}-${month}-${day}`;

  console.log(truncatedIsoString); // Output: "2024-07-16"
  req.body.date_of_birth = truncatedIsoString;
  console.log(req.body.date_of_birth);

  /**/
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

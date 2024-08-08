import multer from "multer";
import path from "path";

// Define the maximum file size in bytes (2MB)
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

// File filter function to validate file type
const fileFilter = (req, file, cb) => {
  // Define allowed file types
  const allowedTypes = /jpeg|jpg|png|gif/;

  // Check MIME type
  const mimeType = allowedTypes.test(file.mimetype);
  // Check file extension
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  // If both MIME type and extension are valid, accept the file
  if (mimeType && extname) {
    cb(null, true);
  } else {
    // Otherwise, reject the file with an error
    cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."));
  }
};

// Configure multer with storage, limits, and file filter
const multerUpload = multer({
  dest: "uploads/",
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: fileFilter,
});

// Middleware for handling avatar uploads with a maximum of 5 files
const avatarUpload = multerUpload.fields([{ name: "avatar", maxCount: 5 }]);

export { avatarUpload };

import multer from "multer";

export const multerUpload = multer({ dest: "uploads/" });
export const avatarUpload = multerUpload.fields([
  { name: "avatar", maxCount: 5 },
]);

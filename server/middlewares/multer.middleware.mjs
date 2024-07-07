import multer from "multer";

const multerUpload = multer({ dest: "uploads/" });
const avatarUpload = multerUpload.fields([{ name: "avatar", maxCount: 2 }]);

export { avatarUpload };

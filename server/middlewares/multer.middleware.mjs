import multer from "multer";

// FIXME high priority : must create fileUploadValidation module
// to prevent malicious file upload
// such as : malicious file type, malicious file size, etc
// thing to do : limit file size, type;
// additional: verify file type; sanitize filenames and path; use VirusTotal API to scan file
//
const multerUpload = multer({ dest: "uploads/" });
const avatarUpload = multerUpload.fields([{ name: "avatar", maxCount: 5 }]);

export { avatarUpload };

const multer = require("multer");
const path = require("path");
const { ErrorObject } = require("../helpers/error");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = path.resolve(__dirname, "../public/uploads");
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.split(".")[0];
    const fileExtension = path.extname(file.originalname);
    cb(null, `${fileName}-${Date.now()}${fileExtension}`);
    // nombreimg-timestamp.jpg/png etc
  },
});

const uploadAvatar = multer({
  storage: diskStorage,
  fileFilter: (req, file, cb) => {
    const acceptedExtensions = ["image/png", "image/jpeg"];

    try {
      if (acceptedExtensions.includes(file?.mimetype)) {
        return cb(null, true);
      } else {
        throw new ErrorObject("Only png/jpg images");
      }
    } catch (error) {
      return cb(error, null);
    }
  },
  limits: { fileSize: 1000000 },
}).single("avatar");

module.exports = { uploadAvatar };

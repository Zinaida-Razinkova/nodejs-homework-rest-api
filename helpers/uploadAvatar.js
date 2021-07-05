const multer = require("multer");
const path = require("path");
const httpCode = require("./httpCode");
require("dotenv").config();

const avatarSize = 2000000; //2Mb

const UPLOAD_DIR = path.resolve("./tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: avatarSize },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }
    const err = new Error("Загружено не изображение");
    err.status = httpCode.BAD_REQUEST;
    cb(err);
  },
});

module.exports = upload;

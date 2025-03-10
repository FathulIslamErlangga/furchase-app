import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY,
});

const localStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename(req, file, cb) {
    const pathExt = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now().toLocaleString()}${pathExt}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  const allowedFile = /png|jpeg|jpg/;
  const type = allowedFile.test(file.mimetype);
  const formatName = allowedFile.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (type && formatName) {
    return callback(null, true);
  } else {
    throw new Error(
      "Format file not allowed. format only png, jpg and jpeg are allowed "
    );
  }
};

export { fileFilter, localStorage };

import multer from "multer";
import { fileFilter, localStorage } from "../utils/uploadImage";
import sharp from "sharp/lib";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";

const upload = multer({
  storage: localStorage,
  fileFilter: fileFilter,
  limits: {
    fieldSize: 1024 * 1024 * 4,
  },
});

const resizeImage = async (filePath: string): Promise<string> => {
  const resizePath = path.join("public/uploads", `${Date.now()}.webp`);

  await sharp(filePath)
    .resize(800, 800, { fit: "inside" })
    .toFormat("webp")
    .toFile(resizePath);

  fs.unlinkSync(filePath);
  return resizePath;
};

const uploadCloudinary = async (filePath: string): Promise<string> => {
  try {
    const uploads = await cloudinary.uploader.upload(filePath, {
      folder: "furchase",
      resource_type: "image",
    });
    const timeOutUpload = new Promise<string>((_, reject) => {
      setTimeout(
        () => reject(new Error("Upload  to Cloudinary timeout")),
        10000
      );
    });
    const result = await Promise.race([uploads, timeOutUpload]);

    fs.unlinkSync(filePath);
    return (result as any).secure_url;
  } catch (error) {
    throw new Error("Failed upload to cloudinary");
  }
};

export { upload, uploadCloudinary, resizeImage };

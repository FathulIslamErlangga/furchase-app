import express from "express";
import { Profile } from "../controllers/profiles.controllers";
import { authProtected } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/uploaderImage.middleware";
const profileRoute = () => {
  const router = express.Router();
  const profiles = new Profile();
  router.patch(
    "/profiles/v1/:slug",
    authProtected,
    upload.fields([
      { name: "thumbnailProfile", maxCount: 1 },
      { name: "coverProfile", maxCount: 1 },
    ]),
    profiles.updateProfile
  );
  return router;
};
export default profileRoute;

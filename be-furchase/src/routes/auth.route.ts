import express from "express";
import { Auth } from "../controllers/auth.controllers";
import { authProtected } from "../middlewares/auth.middleware";
import passport from "passport";
import {
  authFacebook,
  authGoogle,
} from "../middlewares/socialMedia.middleware";
const authRoutes = () => {
  const router = express.Router();
  const auth = new Auth();
  router.post("/auth/v1", auth.register);
  router.post("/auth/v2", auth.login);
  router.get("/auth/v3", authProtected, auth.getData);
  router.get("/auth/v4", authProtected, auth.logout);
  router.post("/auth/v5", auth.forgotPassword);
  router.get(
    "/auth/google/v6",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  router.get("/auth/google/callback", authGoogle, auth.googleCallback);

  router.get(
    "/auth/facebook/v7",
    passport.authenticate("facebook", { scope: ["email"] })
  );

  router.get("/auth/facebook/callback", authFacebook, auth.facebookCallback);
  return router;
};
export default authRoutes;

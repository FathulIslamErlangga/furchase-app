import express from "express";
import { Auth } from "../controllers/auth.controllers";
import { authProtected } from "../middlewares/auth.middleware";
const authRoutes = () => {
  const router = express.Router();
  const auth = new Auth();
  router.post("/auth/v1", auth.register);
  router.post("/auth/v2", auth.login);
  router.get("/auth/v3", authProtected, auth.getData);
  router.get("/auth/v4", authProtected, auth.logout);
  router.post("/auth/v5", auth.forgotPassword);
  return router;
};
export default authRoutes;

import express from "express";
import { Mail } from "../controllers/mail.constrollers";
const mailRoute = () => {
  const router = express.Router();
  const mail = new Mail();
  router.patch("/forgot-password", mail.forgotPassowrd);
  return router;
};

export default mailRoute;

import { sign } from "jsonwebtoken";
import { authLogger } from "./logger";
import { appError } from "./response";
import "dotenv/config";
import { User } from ".prisma/client";
import { Response } from "express";

export const signToken = (id: string) => {
  if (!id) {
    authLogger.warn("userId is required to sing the token");
    throw new appError("userId is required to sing the token", 404);
  }

  if (!process.env.JWT_SECRET) {
    authLogger.warn("Jwt secret not set in envroiment");
    throw new appError("Jwt secret not set in envroiment", 404);
  }

  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

export const createToken = (
  user: User,
  message: string,
  res: Response,
  statusCode: number
) => {
  const token = signToken(user.id);
  const isDev = process.env.NODE_ENV === "development" ? true : false;

  const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    secure: isDev,
    path: "/",
  };

  res.setHeader("Authorization", `Bearer ${token}`);
  res.cookie("jwt", token, cookieOptions);

  const withOutPassword = { ...user, password: undefined };
  res.status(statusCode).json({
    message,
    data: withOutPassword,
    token,
  });
};

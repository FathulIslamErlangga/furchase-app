import { NextFunction, Request, Response } from "express";
import asyncHandler from "./async.middleware";
import { IRequest, IUser, PayloadToken } from "../utils/interface";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { appError } from "../utils/response";
import prisma from "../utils/prisma";
import { authLogger } from "../utils/logger";
import { User } from ".prisma/client";

export const authProtected = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const requests = req as IRequest;
    const { authorization } = req.headers;
    const secret = process.env.JWT_SECRET!;

    let token: string | undefined;

    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
      console.log("token:", token);
    }

    if (!token && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      authLogger.warn("no authorized, no token provided");
      throw new appError("no authorized, no token provided", 404);
    }

    const tokenDecoded = jwt.verify(token, secret) as PayloadToken;

    if (typeof tokenDecoded !== "string") {
      const userData = tokenDecoded as PayloadToken;
      const users = await prisma.user.findUnique({
        where: { id: userData.id },
        include: {
          profiles: true,
        },
      });
      console.log("user from DB:", users);
      if (!users) {
        console.log("User ID from token not found:", userData.id);
        authLogger.warn("user not found, please login first");
        throw new appError("user not found, please login first", 404);
      }
      requests.users = {
        id: users.id,
        email: users.email,
        role: users.role,
        slug: users.slug,
      };
      requests.user = {
        id: users.id,
        email: users.email,
        role: users.role,
        slug: users.slug,
        facebookId: users.facebookId ?? "",
        googleId: users.googleId ?? "",
      };
    }
    next();
  }
);

export const protectAccess = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const requests = req as IRequest;
    const accessRole = requests.users.role;

    if (role !== accessRole) {
      authLogger.warn(`Access Forbidden ${requests.users.email}`);
      throw new appError("Access forbidden", 403);
    }
    next();
  };
};

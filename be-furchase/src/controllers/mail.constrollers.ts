import { Request, Response } from "express";
import asyncHandler from "../middlewares/async.middleware";
import { authLogger } from "../utils/logger";
import { appError, appSuccsess } from "../utils/response";
import bcrypt from "bcrypt";
import { verify } from "jsonwebtoken";
import "dotenv/config";
import { IUser, PayloadToken } from "../utils/interface";
import prisma from "../utils/prisma";

export class Mail {
  forgotPassowrd = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.query;
    const { newPassword, confirmPassword } = req.body;

    const hashPassword = await bcrypt.hash(newPassword, 10);
    if (!token) {
      authLogger.warn("token is required");
      throw new appError("token is required", 403);
    }

    if (newPassword !== confirmPassword) {
      authLogger.warn("password do not match");
      throw new appError("password do not match", 403);
    }

    const decoded = verify(
      token as string,
      process.env.JWT_SECRET!
    ) as PayloadToken;

    if (typeof decoded !== "string") {
      const user = decoded as IUser;
      const existingUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      if (!existingUser) {
        authLogger.warn("user not found");
        throw new appError("user not found", 404);
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashPassword,
        },
      });
      appSuccsess(200, "Password has been reset successfully.", res);
    }
  });
}

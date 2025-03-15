import { Request, Response } from "express";
import asyncHandler from "../middlewares/async.middleware";
import { authServices } from "../services/auth.services";
import { appError, appSuccsess } from "../utils/response";
import { authLogger } from "../utils/logger";
import { createToken, signToken } from "../utils/jwt";
import prisma from "../utils/prisma";
import { sendMailForgotPassword } from "../utils/mailer";

export class Auth {
  private auths = new authServices();
  register = asyncHandler(async (req: Request, res: Response) => {
    const registerUser = await this.auths.registerService(req);

    authLogger.info("Signup succsessfuly");
    createToken(registerUser, "Signup succsessfully", res, 201);
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const loginUser = await this.auths.loginService(req);
    authLogger.info("Signin succsessfully");
    createToken(loginUser, "Signin succsessfully", res, 201);
  });

  getData = asyncHandler(async (req: Request, res: Response) => {
    const users = await this.auths.getDataService(req);
    authLogger.info(`Get data user succsess ${users.profiles.firstName}`);
    appSuccsess(201, "Get data succsess", res, users);
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    this.auths.logoutService(res);
    authLogger.info(`Logout user succsess`);
    appSuccsess(201, "Logout user succsess", res);
  });

  forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    console.log(email);
    const users = await prisma.user.findUnique({
      where: { email },
    });

    if (email !== users?.email) {
      authLogger.warn(`Email do not match ${email}`);
      throw new appError("Email do not match", 403);
    }

    if (!users) {
      authLogger.warn(`user not found ${email}`);
      throw new appError("user not found", 404);
    }
    console.log("user email:", users.email);

    const token = signToken(users.id);
    sendMailForgotPassword(users.email, token);

    authLogger.info("succsessfuly send to your email");
    appSuccsess(201, "succsessfuly send to your email", res, undefined, token);
  });
}

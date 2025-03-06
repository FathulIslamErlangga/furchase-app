import { Request, Response } from "express";
import asyncHandler from "../middlewares/async.middleware";
import { authServices } from "../services/auth.services";
import { appSuccsess } from "../utils/response";
import { authLogger } from "../utils/logger";
import { createToken } from "../utils/jwt";

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
}

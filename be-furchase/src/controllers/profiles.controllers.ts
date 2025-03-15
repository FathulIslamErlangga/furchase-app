import { Request, Response } from "express";
import asyncHandler from "../middlewares/async.middleware";
import { ProfileService } from "../services/profile.services";
import { appSuccsess } from "../utils/response";
import { authLogger } from "../utils/logger";

export class Profile {
  private profiles = new ProfileService();
  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const profile = await this.profiles.updateService(req);

    authLogger.info("update profile succsess");
    appSuccsess(201, "update profile succsess", res, profile);
  });

  changePassword = asyncHandler(async (req: Request, res: Response) => {
    const change = await this.profiles.changeService(req);

    authLogger.info("Password successfully changed");
    appSuccsess(201, "Password successfully changed ", res, change);
  });
}

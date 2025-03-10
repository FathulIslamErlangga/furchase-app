import { Request, Response } from "express";
import asyncHandler from "../middlewares/async.middleware";
import { ProfileService } from "../services/profile.services";
import { appSuccsess } from "../utils/response";

export class Profile {
  private profiles = new ProfileService();
  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const profile = await this.profiles.updateService(req);

    appSuccsess(201, "update profile succsess", res, profile);
  });
}

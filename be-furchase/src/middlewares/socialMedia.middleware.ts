import { User } from ".prisma/client";
import { Request, NextFunction, Response } from "express";
import passport from "passport";
import { IRequest, IUserSocial } from "../utils/interface";

export const authGoogle = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "google",
    { session: false },
    (err: any, user: IUserSocial, info: { message: string } | undefined) => {
      const request = req as IRequest;

      if (err || !user) {
        const message = info?.message || "Google login failed";
        return res.redirect(
          `${process.env.PATH_URL}/login?error=${encodeURIComponent(message)}`
        );
      }
      request.user = user;
      next();
    }
  )(req, res, next);
};
export const authFacebook = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "facebook",
    { session: false },
    (err: any, user: IUserSocial, info: { message: string } | undefined) => {
      const request = req as IRequest;

      if (err || !user) {
        const message = info?.message || "Facebook login failed";
        return res.redirect(
          `${process.env.PATH_URL}/login?error=${encodeURIComponent(message)}`
        );
      }
      request.user = user;
      next();
    }
  )(req, res, next);
};

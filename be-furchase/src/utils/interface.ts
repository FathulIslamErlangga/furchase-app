import { Role, User } from ".prisma/client";
import { Request } from "express";

export interface IUser {
  id: string;
  slug: string;
  role: Role;
  email: string;
}
export interface IUserSocial {
  id: string;
  slug: string;
  role: Role;
  email: string;
  googleId: string;
  facebookId: string;
}
export interface PayloadToken {
  id: string;
}

export interface IRequest extends Request {
  users: IUser;
  info: { message: string };
  user: IUserSocial;
  file: Express.Multer.File;
  files: { [fieldname: string]: Express.Multer.File[] };
}

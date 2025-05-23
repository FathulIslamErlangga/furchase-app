import { Role, User } from ".prisma/client";
import { Request } from "express";

export interface IUser {
  id: string;
  slug: string;
  role: Role;
  email: string;
}
export interface IUserGoogle {
  id: string;
  slug: string;
  role: Role;
  email: string;
  password: string;
}
export interface PayloadToken {
  id: string;
}

export interface IRequest extends Request {
  users: IUser;
  user: User;
  file: Express.Multer.File;
  files: { [fieldname: string]: Express.Multer.File[] };
}

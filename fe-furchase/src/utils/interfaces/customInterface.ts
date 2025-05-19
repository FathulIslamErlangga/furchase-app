import { IUsers } from "./interface";

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}
export interface UserResponse {
  status?: string;
  message: string;
  data: IUsers;
  token?: string;
}

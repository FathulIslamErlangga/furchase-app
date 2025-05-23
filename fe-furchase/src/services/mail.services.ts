import api from "@/utils/api/axios";
import {
  ChangePasswrod,
  SendMail,
  UserResponse,
} from "@/utils/interfaces/customInterface";
import { getCookie } from "cookies-next";

export const mailForgotPassword = async (data: SendMail) => {
  try {
    const response = await api.post<UserResponse>("/auth/v5", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (data: ChangePasswrod) => {
  try {
    const token = getCookie("jwt");
    console.log("get token forgot password", token);
    const response = await api.patch<UserResponse>(
      `/forgot-password?token=${token}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

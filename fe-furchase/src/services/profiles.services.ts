import api from "@/utils/api/axios";
import {
  ProfileResponse,
  ResetPassword,
  ResetPasswordResponse,
} from "@/utils/interfaces/customInterface";
import { getCookie } from "cookies-next";

export const updateProfile = async (data: FormData, slug: string) => {
  try {
    const response = await api.patch<ProfileResponse>(
      `/profiles/v1/${slug}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ChangePasswordData = async (data: ResetPassword, slug: string) => {
  try {
    const response = await api.patch<ResetPasswordResponse>(
      `/profiles/v2/${slug}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

import api from "@/utils/api/axios";
import {
  LoginData,
  RegisterData,
  UserResponse,
} from "@/utils/interfaces/customInterface";

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await api.post<UserResponse>("/auth/v1", data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
    }
    throw error;
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await api.post<UserResponse>("/auth/v2", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

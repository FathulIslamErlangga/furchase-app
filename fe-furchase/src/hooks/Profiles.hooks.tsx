"use client";
import {
  ChangePasswordData,
  updateProfile,
} from "@/services/profiles.services";
import { profileProps } from "@/utils/interfaces/contextInterface";
import {
  ProfileResponse,
  ResetPassword,
  ResetPasswordResponse,
} from "@/utils/interfaces/customInterface";
import { useState } from "react";

export const profileHooks = (): profileProps => {
  const [profiles, setProfiles] = useState<ProfileResponse>();
  const [change, setChange] = useState<ResetPasswordResponse>();
  const [message, setMessage] = useState<string | undefined>("");
  const [status, setStatus] = useState<string | undefined>("");

  const clearProfileMessage = () => {
    setMessage(undefined);
    setStatus(undefined);
  };
  const profile = async (data: FormData, slug: string) => {
    try {
      const response = await updateProfile(data, slug);
      setProfiles(response);
      setMessage(response.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setStatus(error.response.data.status);
        setMessage(error.response.data.message);
      }
    }
  };

  const changePassword = async (data: ResetPassword, slug: string) => {
    try {
      const response = await ChangePasswordData(data, slug);
      setChange(response);
      setMessage(response.message);
      return true;
    } catch (error: any) {
      if (error.response && error.response.data) {
        setStatus(error.response.data.status);
        setMessage(error.response.data.message);
      }
      return false;
    }
  };
  return {
    profile,
    changePassword,
    clearProfileMessage,
    change,
    profiles,
    message,
    status,
  };
};

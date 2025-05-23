"use client";
import { loginUser, registerUser } from "@/services/auth.services";
import { changePassword, mailForgotPassword } from "@/services/mail.services";
import { authProps } from "@/utils/interfaces/contextInterface";
import {
  ChangePasswrod,
  LoginData,
  RegisterData,
  SendMail,
  UserResponse,
} from "@/utils/interfaces/customInterface";
import { getCookie, setCookie } from "cookies-next";
import React, { useState } from "react";

const authHooks = (): authProps => {
  const [user, setUsers] = useState<UserResponse>();
  const [message, setMessage] = useState<string | undefined>("");
  const [isVisibility, setIsVisibility] = useState(false);
  const [status, setStatus] = useState<string | undefined>("");

  const handleVisibility = () => {
    setIsVisibility((prev) => !prev);
  };

  const clearAuthMessage = () => {
    setMessage(undefined);
    setStatus(undefined);
  };
  const register = async (data: RegisterData) => {
    try {
      const response = await registerUser(data);
      setUsers(response);
      setMessage(response?.message);
      setCookie("jwt", response?.token, {
        secure:
          process.env.NEXT_PUBLIC_NODE_ENV === "development" ? true : false,
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        path: "/",
      });
    } catch (error: any) {
      if (error.response && error.response.data) {
        setStatus(error.response.data.status);
        setMessage(error.response.data.message);
      }
    }
  };

  const login = async (data: LoginData) => {
    try {
      const response = await loginUser(data);
      setUsers(response);
      setMessage(response.message);
      setCookie("jwt", response.token, {
        secure:
          process.env.NEXT_PUBLIC_NODE_ENV === "development" ? true : false,
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        path: "/",
      });
    } catch (error: any) {
      if (error.response && error.response.data) {
        setStatus(error.response.data.status);
        setMessage(error.response.data.message);
      }
    }
  };

  const sendMail = async (data: SendMail) => {
    try {
      const response = await mailForgotPassword(data);
      setCookie("jwt", response.token, {
        secure:
          process.env.NEXT_PUBLIC_NODE_ENV === "development" ? true : false,
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        path: "/",
      });
      setMessage(response.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setStatus(error.response.data.status);
        setMessage(error.response.data.message);
      }
    }
  };

  const forgot = async (data: ChangePasswrod) => {
    try {
      const response = await changePassword(data);
      setMessage(response.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setStatus(error.response.data.status);
        setMessage(error.response.data.message);
      }
    }
  };
  return {
    register,
    handleVisibility,
    clearAuthMessage,
    login,
    sendMail,
    forgot,
    message,
    user,
    status,
    isVisibility,
  };
};

export default authHooks;

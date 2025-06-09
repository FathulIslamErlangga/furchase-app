"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "@/style/auth/login.css";
import Link from "next/link";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginData, SendMail } from "@/utils/interfaces/customInterface";
import { loginSchema } from "@/validation/auth.validation";
import { useGlobal } from "../contexts/GlobalContexts";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import ModalForgotPassword from "../modals/forgotPassword.modal";
import { setCookie } from "cookies-next";
type Props = {};

const LoginPage = () => {
  const { auth } = useGlobal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMessage, setIsMessage] = useState("");
  const [isOpen, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        toast.error(decodeURIComponent(error), {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        router.replace("/login");
      }, 1500);
    }
  }, [error]);

  useEffect(() => {
    if (auth.message) {
      if (auth.status) {
        toast.error(auth.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: auth.clearAuthMessage,
        });
      } else {
        toast.success(auth.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: auth.clearAuthMessage,
        });
      }
    }
  }, [auth.message]);

  const initialValues: LoginData = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginData) => {
    try {
      setIsLoading(true);
      await auth.login(values);
      setTimeout(() => router.push("/"), 1500);
    } catch (error) {
      console.log("login error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMail = async (values: SendMail) => {
    try {
      await auth.sendMail(values);
      setCookie("forgot_email", values, {
        path: "/",
        expires: new Date(Date.now() + 30 * 60 * 1000),
      });
    } catch (error) {
      console.log("send mail", error);
    } finally {
      setOpen(false);
    }
  };
  const handleModal = () => setOpen((prev) => !prev);
  const handleGoogleLogin = () =>
    (window.location.href = `${process.env.NEXT_PUBLIC_API}/auth/google/v6`);
  const handleFacebookLogin = () =>
    (window.location.href = `${process.env.NEXT_PUBLIC_API}/auth/facebook/v7`);
  return (
    <>
      <div className="page-container">
        <div className="content-login">
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="form-input">
                <div className="form">
                  <label htmlFor="">Email</label>
                  <Image
                    src="/assets/images/email.png"
                    alt="login bg"
                    width={20}
                    height={20}
                    className="absolute right-64 bottom-1 "
                  />
                  <Field type="text" name="email" placeholder="Email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm absolute -bottom-5"
                  />
                </div>
                <div className="form">
                  <label htmlFor="">Password</label>
                  <button type="button" onClick={auth.handleVisibility}>
                    <Image
                      src={`${
                        auth.isVisibility
                          ? "/assets/images/hide.png"
                          : "/assets/images/view.png"
                      }`}
                      width={20}
                      height={20}
                      className="absolute right-64 bottom-1 "
                      alt="login bg"
                    />
                  </button>
                  <Field
                    type={`${auth.isVisibility ? "text" : "password"}`}
                    name="password"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm absolute -bottom-7"
                  />
                </div>

                <div className="pt-5">
                  <button
                    type="button"
                    onClick={handleModal}
                    className="pl-32 underline mt-10 text-[15px] hover:text-oranges-primary "
                  >
                    Forgot Password
                  </button>
                </div>

                <div className={`${isLoading ? "btn-loading" : "btn-login"}`}>
                  <button disabled={isLoading} type="submit">
                    {isLoading ? (
                      <div className="loading loading-spinner text-oranges-primary " />
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
                <span>
                  Don't have an account ?{" "}
                  <Link
                    href="/register"
                    className="underline text-[15px] hover:text-oranges-primary"
                  >
                    Sign Up
                  </Link>
                </span>
                <div className=" or-connection">
                  <div className="line" />
                  <span>OR</span>
                  <div className="line" />
                </div>
                <div className="social-connect">
                  <button type="button" onClick={handleGoogleLogin}>
                    <Image
                      src="/assets/images/google.png"
                      alt=""
                      height={30}
                      width={30}
                    />
                  </button>
                  <button type="button" onClick={handleFacebookLogin}>
                    <Image
                      src="/assets/images/facebook.png"
                      alt=""
                      height={30}
                      width={30}
                    />
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="content-img">
          <Image
            src="/assets/images/bg-login.png"
            width={450}
            height={450}
            alt="login bg"
          />
        </div>
      </div>
      {isOpen && (
        <ModalForgotPassword
          modalClose={handleModal}
          sendEmail={handleSendMail}
        />
      )}
    </>
  );
};

export default LoginPage;

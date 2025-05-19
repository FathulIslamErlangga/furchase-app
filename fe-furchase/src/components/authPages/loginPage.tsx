"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "@/style/auth/login.css";
import Link from "next/link";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginData } from "@/utils/interfaces/customInterface";
import { loginSchema } from "@/validation/auth.validation";
import { useGlobal } from "../contexts/GlobalContexts";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
type Props = {};

const LoginPage = () => {
  const { auth } = useGlobal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

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

  useEffect(() => {
    if (auth.user && auth.user.data) {
      setTimeout(() => router.push("/"), 1500);
    }
  }, [auth.user, router]);

  const initialValues: LoginData = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginData) => {
    try {
      setIsLoading(true);
      await auth.login(values);
    } catch (error) {
      console.log("login error", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="login-page">
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
                    src="/assets/images/mail.png"
                    width={20}
                    height={20}
                    alt="login bg"
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

                <div className="pt-10">
                  <Link
                    href="#"
                    className="pl-32 underline mt-10 text-[15px] hover:text-oranges-primary "
                  >
                    Forgot Password
                  </Link>
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
                  <button>
                    <Image
                      src="/assets/images/google.png"
                      alt=""
                      height={30}
                      width={30}
                    />
                  </button>
                  <button>
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
    </section>
  );
};

export default LoginPage;

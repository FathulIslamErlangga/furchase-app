"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "@/style/auth/register.css";
import Link from "next/link";
import { RegisterData } from "@/utils/interfaces/customInterface";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useGlobal } from "../contexts/GlobalContexts";
import { registerSchema } from "@/validation/auth.validation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const RegisterPage = () => {
  const { auth } = useGlobal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
      setTimeout(() => router.push("/login"), 2000);
    }
  }, [auth.user, router]);

  const initialValues: RegisterData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values: RegisterData) => {
    try {
      setIsLoading(true);
      await auth.register(values);
    } catch (error) {
      console.log("registrion error", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className=" registers-page">
      <div className=" page-container">
        <div className=" content-register">
          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className=" form">
                <div className=" first-form">
                  <div className="form-1">
                    <label htmlFor="firstname">First Name</label>
                    <button>
                      <Image
                        src="/assets/images/id.png"
                        alt=""
                        height={18}
                        width={18}
                      />
                    </button>
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm absolute -bottom-5"
                    />
                  </div>
                  <div className="form-1">
                    <label htmlFor="lastname">Last Name</label>
                    <button>
                      <Image
                        src="/assets/images/id.png"
                        alt=""
                        height={18}
                        width={18}
                      />
                    </button>
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm absolute -bottom-5"
                    />
                  </div>
                </div>
                <div className=" second-form">
                  <div className="form-2">
                    <label htmlFor="email">Email</label>
                    <button>
                      <Image
                        src="/assets/images/mail.png"
                        alt=""
                        height={18}
                        width={18}
                      />
                    </button>
                    <Field type="text" name="email" placeholder="Email" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm absolute -bottom-5"
                    />
                  </div>
                  <div className="form-2">
                    <label htmlFor="password">Password</label>
                    <button type="button" onClick={auth.handleVisibility}>
                      <Image
                        src={
                          auth.isVisibility
                            ? "/assets/images/hide.png"
                            : "/assets/images/view.png"
                        }
                        alt=""
                        height={18}
                        width={18}
                      />
                    </button>
                    <Field
                      type={auth.isVisibility ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm absolute -bottom-9"
                    />
                  </div>
                </div>
              </div>
              <div
                className={`btn-register ${
                  isLoading === true ? "btn-loading" : ""
                }`}
              >
                <button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <span className="loading loading-spinner text-oranges-primary absolute -top-25 -left-46"></span>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </Form>
          </Formik>
          <span>
            Already have an account ?{" "}
            <Link
              href="/login"
              className=" underline text-[15px] hover:text-oranges-primary"
            >
              Log In
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
        <div className="w-1/2">
          <Image
            src="/assets/images/bg-register.png"
            alt=""
            width={450}
            height={450}
          />
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;

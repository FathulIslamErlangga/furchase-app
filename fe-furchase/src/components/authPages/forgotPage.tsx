"use client";
import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ChangePasswrod } from "@/utils/interfaces/customInterface";
import { forgotSchema } from "@/validation/auth.validation";
import Image from "next/image";
import { useGlobal } from "../contexts/GlobalContexts";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";

type Props = {};

const ForgotPage = (props: Props) => {
  const { auth } = useGlobal();
  const router = useRouter();
  const [visibility1, setVisibility1] = useState<boolean>(false);
  const [visibility2, setVisibility2] = useState<boolean>(false);

  useEffect(() => {
    const getCookieEmail = getCookie("forgot_email");
    if (!getCookieEmail) {
      router.replace("/login");
    }
  }, []);

  const initialValues: ChangePasswrod = {
    newPassword: "",
    confirmPassword: "",
  };

  const handleVisibility1 = () => setVisibility1((prev) => !prev);
  const handleVisibility2 = () => setVisibility2((prev) => !prev);

  const handleChangePassword = async (values: ChangePasswrod) => {
    try {
      await auth.forgot(values);
      deleteCookie("forgot_email");
      setTimeout(() => router.push("/login"), 1500);
    } catch (error) {
      console.log("change password", error);
    }
  };
  return (
    <div className="card-forgot">
      <h1 className="title">Change your password</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={forgotSchema}
        onSubmit={handleChangePassword}
      >
        <Form>
          <div className="form-input">
            <label htmlFor="">New password</label>
            <button type="button" onClick={handleVisibility1}>
              <Image
                src={`${
                  visibility1
                    ? "/assets/images/hide.png"
                    : "/assets/images/view.png"
                }`}
                width={20}
                height={20}
                alt={`${visibility1 ? "hide-icon" : "view-icon"}`}
              />
            </button>
            <Field
              type={`${visibility1 ? "text" : "password"}`}
              name="newPassword"
              placeholder="Your new Password"
            />
            <ErrorMessage
              name="newPassword"
              component="div"
              className="text-red-500 text-sm absolute -bottom-7"
            />
          </div>
          <div className="form-input">
            <label htmlFor="">Confirm password</label>
            <button type="button" onClick={handleVisibility2}>
              <Image
                src={`${
                  visibility2
                    ? "/assets/images/hide.png"
                    : "/assets/images/view.png"
                }`}
                width={20}
                height={20}
                alt={`${visibility2 ? "hide-icon" : "view-icon"}`}
              />
            </button>
            <Field
              type={`${visibility2 ? "text" : "password"}`}
              name="confirmPassword"
              placeholder="Confirm your password"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-sm absolute -bottom-7"
            />
          </div>
          <div className="btn-submit">
            <button type="submit">Change Password</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ForgotPage;

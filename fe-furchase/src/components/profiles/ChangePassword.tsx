import { resetPasswordProps } from "@/utils/interfaces/customInterface";
import { changePasswordSchema } from "@/validation/profile.validation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import ToastMessage from "../modals/toast.modals";

const ChangePassword = (props: resetPasswordProps) => {
  return (
    <>
      {props.isToast && (
        <ToastMessage message={props.message} status={props.status} />
      )}
      <div className="container mx-auto">
        <Formik
          initialValues={props.initialValues}
          validationSchema={changePasswordSchema}
          onSubmit={props.handleChangePassword}
        >
          <div className="bg-gray-100 rounded-lg w-[40%] mx-auto py-15">
            <h1 className="text-center text-2xl font-semibold  pb-5 tracking-wide">
              Change your password
            </h1>
            <Form className="mx-16">
              <h1 className=" text-lg  tracking-wide">
                Enter a new password below to change your password
              </h1>
              <div className="py-5 relative">
                <label htmlFor="">Your password</label>
                <Field
                  type="password"
                  name="oldPassword"
                  placeholder="Your password"
                  className="focus:outline-none border-b-3 w-full  pt-2 border-oranges-primary block"
                />
                <ErrorMessage
                  name="oldPassword"
                  component="div"
                  className="text-red-500 text-sm absolute -bottom-5"
                />
              </div>
              <div className="py-5 relative">
                <label htmlFor="">New password</label>
                <Field
                  type="password"
                  name="newPassword"
                  placeholder="New password"
                  className="focus:outline-none border-b-3 w-full  pt-2 border-oranges-primary block"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500 text-sm absolute -bottom-5"
                />
              </div>
              <div className="bg-oranges-primary border-2 border-oranges-primary  mt-5 w-[50%] mx-auto rounded-md">
                <button
                  className="text-sm text-center p-1 font-semibold ml-4 "
                  type="submit"
                >
                  Change password
                </button>
              </div>
            </Form>
          </div>
        </Formik>
      </div>
    </>
  );
};

export default ChangePassword;

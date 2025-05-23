import { SendMail } from "@/utils/interfaces/customInterface";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import React from "react";
import * as Yup from "yup";

interface modalProps {
  modalClose: () => void;
  sendEmail: (data: SendMail) => Promise<void>;
}

const ModalForgotPassword = ({ sendEmail, modalClose }: modalProps) => {
  const initialValues: SendMail = {
    email: "",
  };
  const forgotSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
  return (
    <div className="absolute top-30">
      <div className="bg-white rounded-md relative border-4 border-oranges-primary px-14 mx-96 w-full max-w-[40%] ">
        <h1 className="text-2xl text-center font-semibold pt-5">
          Input your email for forgot password
        </h1>

        <div className="absolute -right-2 -top-2 z-5 bg-oranges-primary rounded-md  hover:bg-red-500">
          <button
            type="submit"
            onClick={modalClose}
            className="p-2 cursor-pointer"
          >
            <Image
              src="/assets/images/close.png"
              width={20}
              height={20}
              alt="close"
            />
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={forgotSchema}
          onSubmit={sendEmail}
        >
          <Form className="pb-14 pt-10 ml-10">
            <label htmlFor="" className="text-lg font-[500]">
              Email
            </label>
            <Field
              type="text"
              name="email"
              placeholder="Input your email"
              className="border-3 border-oranges-primary  mx-2 pl-1 rounded-sm focus:outline-none"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm absolute top-40 left-38"
            />
            <div className="inline">
              <button
                type="submit"
                className="bg-oranges-primary border-3 border-oranges-primary hover:bg-white rounded-md w-[20%] "
              >
                Send
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ModalForgotPassword;

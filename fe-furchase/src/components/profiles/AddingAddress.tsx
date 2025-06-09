"use client";
import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ToastMessage from "../modals/toast.modals";
import { addressSchema } from "@/validation/address.validation";
import { addingAddressProps } from "@/utils/interfaces/customInterface";

const AddingAddress = (props: addingAddressProps) => {
  return (
    <>
      {props.isToast && (
        <ToastMessage message={props.message} status={props.status} />
      )}
      <div className="container ">
        <div className="bg-base-100 rounded-box shadow-md w-[60%] mx-auto">
          <h1 className="text-left text-lg opacity-45 p-5 tracking-wide border-b-2 border-gray-300">
            Input your address
          </h1>
          <Formik
            initialValues={props.initialValues}
            validationSchema={addressSchema}
            onSubmit={props.handleCreateAddress}
          >
            <Form className="mx-32 py-10">
              <div className="flex gap-15 py-5 ">
                <div>
                  <label htmlFor="">Address</label>
                  <Field
                    type="text"
                    name="address"
                    placeholder="Jl.kumala kec pinang kel kunciran indah Rt01/10"
                    className="block border-b-3 border-oranges-primary focus:outline-none pt-2"
                  />
                  <div className="text-red-500 text-sm min-h-[20px]">
                    <ErrorMessage name="address" component="div" />
                  </div>
                </div>
                <div>
                  <label htmlFor="">City</label>
                  <Field
                    type="text"
                    name="city"
                    placeholder="Kota X"
                    className="block border-b-3 border-oranges-primary focus:outline-none pt-2"
                  />
                  <div className="text-red-500 text-sm min-h-[20px]">
                    <ErrorMessage name="city" component="div" />
                  </div>
                </div>
              </div>
              <div className="flex gap-15 py-5 ">
                <div>
                  <label htmlFor="">Province</label>
                  <Field
                    type="text"
                    name="province"
                    placeholder="x"
                    className="block border-b-3 border-oranges-primary focus:outline-none pt-2"
                  />
                  <div className="text-red-500 text-sm min-h-[20px]">
                    <ErrorMessage name="province" component="div" />
                  </div>
                </div>
                <div>
                  <label htmlFor="">Postal Code</label>
                  <Field
                    type="text"
                    name="postalCode"
                    placeholder="14533"
                    className="block border-b-3 border-oranges-primary focus:outline-none pt-2"
                  />
                  <div className="text-red-500 text-sm min-h-[20px]">
                    <ErrorMessage name="postalCode" component="div" />
                  </div>
                </div>
              </div>

              <div className="pt-5 relative">
                <Field
                  as="select"
                  name="label"
                  className="focus:outline-none border-3 border-oranges-primary rounded-box p-2 cursor-pointer"
                >
                  <option value="" disabled>
                    Pick a destination
                  </option>
                  <option value="Home">Home</option>
                  <option value="Office">Office </option>
                </Field>
                <div className="text-red-500 text-sm min-h-[20px]">
                  <ErrorMessage name="label" component="div" />
                </div>
              </div>
              <div className="flex justify-end pt-10 gap-5">
                <button
                  type="submit"
                  className="text-center  font-semibold bg-oranges-primary rounded-md p-2 border-3 border-oranges-primary hover:bg-white w-[50%] tracking-wide cursor-pointer"
                >
                  Create Address
                </button>
                <button
                  type="button"
                  onClick={() => props.setMenu("address")}
                  className="text-center font-semibold bg-red-500 rounded-md p-2 border-3 border-red-500  hover:bg-white w-[50%] tracking-wide cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddingAddress;

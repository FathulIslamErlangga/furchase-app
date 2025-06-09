import React from "react";
import ToastMessage from "../modals/toast.modals";
import { updateAddressProps } from "@/utils/interfaces/customInterface";
import { addressSchema } from "@/validation/address.validation";
import { useFormik } from "formik";

const UpdatingAddress = (props: updateAddressProps) => {
  const formik = useFormik({
    initialValues: props.initialValuesUpdate,
    validationSchema: addressSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      props.handleUpdateAddress(values);
    },
  });
  return (
    <>
      {props.isToast && (
        <ToastMessage message={props.message} status={props.status} />
      )}
      <div className="container ">
        <div className="bg-base-100 rounded-box shadow-md w-[60%] mx-auto">
          <h1 className="text-left text-lg opacity-45 p-5 tracking-wide border-b-2 border-gray-300">
            Update your address
          </h1>
          <form className="mx-32 py-10" onSubmit={formik.handleSubmit}>
            <div className="flex gap-15 py-5 ">
              <div>
                <label htmlFor="">Address</label>
                <input
                  type="text"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  name="address"
                  placeholder="Jl.kumala kec pinang kel kunciran indah Rt01/10"
                  className="block border-b-3 border-oranges-primary focus:outline-none pt-2"
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="text-red-500 text-sm min-h-[20px]">
                    <p>{formik.errors.address}</p>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="">City</label>
                <input
                  type="text"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  placeholder="Kota X"
                  className="block border-b-3 border-oranges-primary focus:outline-none pt-2"
                />
                {formik.touched.city && formik.errors.city && (
                  <div className="text-red-500 text-sm min-h-[20px]">
                    <p>{formik.errors.city}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-15 py-5 ">
              <div>
                <label htmlFor="">Province</label>
                <input
                  type="text"
                  name="province"
                  value={formik.values.province}
                  onChange={formik.handleChange}
                  placeholder="x"
                  className="block border-b-3 border-oranges-primary focus:outline-none pt-2"
                />
                {formik.touched.province && formik.errors.province && (
                  <div className="text-red-500 text-sm min-h-[20px]">
                    <p>{formik.errors.province}</p>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formik.values.postalCode}
                  onChange={formik.handleChange}
                  placeholder="14533"
                  className="block border-b-3 border-oranges-primary focus:outline-none pt-2"
                />
                <div className="text-red-500 text-sm min-h-[20px]">
                  {formik.touched.postalCode && formik.errors.postalCode && (
                    <div className="text-red-500 text-sm min-h-[20px]">
                      <p>{formik.errors.postalCode}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-5 relative">
              <select
                name="label"
                value={formik.values.label}
                onChange={formik.handleChange}
                className="focus:outline-none border-3 border-oranges-primary rounded-box p-2 cursor-pointer"
              >
                <option value="" disabled>
                  Pick a destination
                </option>
                <option value="Home">Home</option>
                <option value="Office">Office </option>
              </select>
              {formik.touched.label && formik.errors.label && (
                <div className="text-red-500 text-sm min-h-[20px]">
                  <p>{formik.errors.label}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end pt-10 gap-5">
              <button
                type="submit"
                className="text-center  font-semibold bg-oranges-primary rounded-md p-2 border-3 border-oranges-primary hover:bg-white w-[50%] tracking-wide cursor-pointer"
              >
                Update Address
              </button>
              <button
                type="button"
                onClick={() => props.setMenu("address")}
                className="text-center font-semibold bg-red-500 rounded-md p-2 border-3 border-red-500  hover:bg-white w-[50%] tracking-wide cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatingAddress;

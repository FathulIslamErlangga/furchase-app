import { detailAddressProps } from "@/utils/interfaces/customInterface";
import React from "react";

const DetailAddress = (props: detailAddressProps) => {
  return (
    <div className="container ">
      <div className="bg-base-100 rounded-box shadow-md w-[60%] mx-auto">
        <h1 className="text-left text-lg opacity-45 p-5 tracking-wide border-b-2 border-gray-300">
          Detail your address
        </h1>

        <form className="mx-32 py-10">
          <div className="flex gap-15 py-5 ">
            <div>
              <label htmlFor="">Address</label>
              <textarea
                disabled
                value={props.address?.address}
                className="block  pt-2 w-full opacity-45"
              />
            </div>
            <div>
              <label htmlFor="">City</label>
              <input
                type="text"
                disabled
                value={props.address?.city}
                className="block  pt-2  opacity-45"
              />
            </div>
          </div>
          <div className="flex gap-15 py-5 ">
            <div>
              <label htmlFor="">Province</label>
              <input
                type="text"
                disabled
                value={props.address?.province}
                className="block  pt-2  opacity-45"
              />
            </div>
            <div>
              <label htmlFor="">Postal Code</label>
              <input
                type="text"
                disabled
                value={props.address?.postalCode}
                className="block  pt-2  opacity-45"
              />
            </div>
          </div>

          <div className="pt-5 relative">
            <label htmlFor="">Destination</label>
            <input
              type="text"
              disabled
              value={props.address?.label}
              className="block  pt-2  opacity-45"
            />
          </div>
          <div className="flex justify-center pt-10 gap-5">
            <button
              type="button"
              onClick={() => props.setMenu("address")}
              className="text-center font-semibold bg-red-500 rounded-md p-2 border-3 border-red-500  hover:bg-white w-[50%] tracking-wide cursor-pointer"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailAddress;

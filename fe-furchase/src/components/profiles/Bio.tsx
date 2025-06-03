import React from "react";
import Image from "next/image";
import ToastMessage from "../modals/toast.modals";
import { BioProps } from "@/utils/interfaces/customInterface";

const Bio = (props: BioProps) => {
  return (
    <div>
      {props.isToast && (
        <ToastMessage message={props.message} status={props.status} />
      )}
      <div className="container mx-auto pt-10 ">
        <div className=" py-15 bg-gray-100 rounded-lg mx-auto flex w-[50%] justify-center relative ">
          <div
            className="flex justify-center  items-center rounded-full  absolute -top-20 cursor-pointer "
            onMouseLeave={props.mouseLeave}
            onMouseEnter={props.mouseIn}
          >
            {props.auth.user?.data.profiles?.images.map((image) => (
              <Image
                key={image.id}
                src={`${
                  props.formData.coverProfile.length > 0 &&
                  image.type === "coverProfile"
                    ? props.formData.coverProfile
                    : image.url
                }`}
                alt={image.type}
                width={120}
                height={120}
                className="rounded-full mx-auto bg-white p-2 object-cover"
              />
            ))}
            {props.open && (
              <div className="bg-gray-800 rounded-md absolute z-10 px-3 bottom-5">
                <input
                  type="file"
                  accept="image/*"
                  ref={props.coverFileRef}
                  onChange={props.handleImageChange}
                  name="coverProfile"
                  className="hidden"
                />
                <button
                  type="button"
                  className="text-center text-white text-sm cursor-pointer"
                  onClick={props.handleCoverFile}
                >
                  Update{" "}
                </button>
              </div>
            )}
          </div>
          <div className="pt-5 ">
            <div>
              <div className="flex flex-1/2 space-x-32 space-y-10">
                <div className="pt-4 ">
                  <label htmlFor="">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={props.formData.firstName ?? ""}
                    onChange={props.handleChangeValue}
                    disabled={!props.update}
                    className={`${
                      !props.update
                        ? "focus:outline-none border-b-3 border-gray-100 pt-5 block"
                        : "focus:outline-none border-b-3 border-oranges-primary pt-5 block"
                    }`}
                  />
                </div>
                <div className="pt-4">
                  <label htmlFor="">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={props.formData.lastName ?? ""}
                    onChange={props.handleChangeValue}
                    disabled={!props.update}
                    className={`${
                      !props.update
                        ? "focus:outline-none border-b-3 border-gray-100 pt-5 block"
                        : "focus:outline-none border-b-3 border-oranges-primary pt-5 block"
                    }`}
                  />
                </div>
              </div>
              <div className=" flex flex-1/2 space-x-32 space-y-10">
                <div className="pt-4 ">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="example@gmail.com"
                    value={props.auth.user?.data.email ?? ""}
                    disabled
                    className="focus:outline-none border-b-3 border-gray-100 pt-5 block"
                  />
                </div>
                <div className="pt-4">
                  <label htmlFor="">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="08222222"
                    value={props.formData.phone ?? ""}
                    onChange={props.handleChangeValue}
                    disabled={!props.update}
                    className={`${
                      !props.update
                        ? "focus:outline-none border-b-3 border-gray-100 pt-5 block"
                        : "focus:outline-none border-b-3 border-oranges-primary pt-5 block"
                    }`}
                  />
                </div>
              </div>
            </div>
            {props.update ? (
              <div className="flex">
                <div className="border-2 border-oranges-primary bg-oranges-primary rounded-md tracking-wide text-lg font-semibold w-[30%] mt-3  mx-auto text-center py-1 cursor-pointer">
                  <button
                    type="submit"
                    className="cursor-pointer"
                    onClick={props.handleUpdate}
                  >
                    Save
                  </button>
                </div>
                <div className="border-2 border-red-500 bg-red-500 rounded-md tracking-wide text-lg font-semibold w-[30%] mt-3  mx-auto text-center py-1 cursor-pointer">
                  <button
                    type="submit"
                    className="cursor-pointer"
                    onClick={props.handleButtonUpdate}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-oranges-primary bg-oranges-primary rounded-md tracking-wide text-lg font-semibold w-[30%] mt-3  mx-auto text-center py-1 cursor-pointer">
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={props.handleButtonUpdate}
                >
                  Update
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;

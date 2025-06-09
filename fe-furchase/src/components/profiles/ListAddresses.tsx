import { listAddressProps } from "@/utils/interfaces/customInterface";
import Image from "next/image";
import React from "react";
import PermissionModals from "../modals/permission.modals";
import ToastMessage from "../modals/toast.modals";

const ListAddresses = (props: listAddressProps) => {
  const addressesList = props.addresses?.data?.profiles?.addresses ?? [];
  const hasAddress = addressesList.length > 0;

  return (
    <>
      {props.isToast && (
        <ToastMessage message={props.message} status={props.status} />
      )}
      {props.isDelete && (
        <PermissionModals
          onClose={props.setDelete}
          text="address"
          handleDeleteAddress={props.handleDeleteAddress}
          message={props.message}
          status={props.status}
          isToast={props.isToast}
        />
      )}
      <div className="container  ">
        <ul className=" bg-base-100 w-[50%] mx-auto rounded-box shadow-md">
          <li className="p-4 pb-2  text-xs tracking-wide border-b-2 border-gray-300 flex items-center">
            <h1 className=" opacity-60">List Your address</h1>
            {hasAddress && (
              <div className="ml-10 flex w-full  max-w-[400px] gap-3 justify-end">
                <div className="bg-[#FCB454] rounded-md border-2 border-[#FCB454] w-[30%] text-center  p-2 hover:bg-white cursor-pointer font-semibold">
                  <button
                    className="cursor-pointer"
                    type="button"
                    onClick={() => props.setMenu("adding")}
                  >
                    Add address
                  </button>
                </div>
                {props.isSelect ? (
                  <div className="bg-red-400 rounded-md border-2 border-red-400 w-[30%] text-center  p-2 hover:bg-red-500 hover:border-red-500 cursor-pointer font-semibold">
                    <button
                      className="cursor-pointer"
                      type="button"
                      onClick={() => props.setSelect(false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="bg-[#FCB454] rounded-md border-2 border-[#FCB454] w-[30%] text-center  p-2 hover:bg-white cursor-pointer font-semibold">
                    <button
                      className="cursor-pointer"
                      type="button"
                      onClick={() => props.setSelect(true)}
                    >
                      Select default
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>

          {hasAddress ? (
            <>
              {props.addresses?.data.profiles?.addresses.map(
                (address, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center px-4 py-5 border-b-2 border-gray-300 gap-4 flex-wrap"
                  >
                    <div className="flex items-center">
                      {props.isSelect ? (
                        <>
                          <input
                            type="radio"
                            id={`radio-${address.id}`}
                            name="isDefault"
                            className="peer hidden"
                            checked={address.isDefault}
                            onChange={() =>
                              props.handleDefaultAddress(address.id)
                            }
                          />
                          <label
                            htmlFor={`radio-${address.id}`}
                            className="h-3 w-3 rounded-full border-2 border-orange-300 bg-orange-100 peer-checked:bg-orange-600 peer-checked:border-orange-600 cursor-pointer"
                          ></label>
                        </>
                      ) : (
                        <>
                          {!props.isSelect && address.isDefault === true && (
                            <Image
                              src="/assets/images/accept.png"
                              alt="accept-icn"
                              width={15}
                              height={15}
                            />
                          )}
                        </>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <Image
                        className="size-10 rounded-box"
                        src={
                          address.label === "Office"
                            ? "/assets/images/company.png"
                            : "/assets/images/house.png"
                        }
                        alt="icon-house"
                        width={25}
                        height={25}
                      />
                    </div>

                    {/* Label dan Address */}
                    <div className="flex flex-col w-[40%] min-w-[150px]">
                      <span className="font-semibold">{address.label}</span>
                      <span className="text-xs uppercase font-semibold opacity-60 truncate">
                        {address.address.slice(0, 40) + "..."}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 justify-end flex-wrap w-[40%] min-w-[150px]">
                      <button
                        className="bg-yellow-cs rounded-lg border-2 border-yellow-cs p-2 hover:bg-white shadow-lg shadow-yellow-cs cursor-pointer"
                        onClick={() => {
                          props.setGetDataById({
                            id: address.id,
                            address: address.address,
                            city: address.city,
                            label: address.label,
                            postalCode: address.postalCode,
                            province: address.province,
                          });
                          props.setMenu("view");
                        }}
                      >
                        <Image
                          src="/assets/images/view_data.png"
                          alt="icon-view"
                          width={25}
                          height={25}
                          className="mx-auto"
                        />
                      </button>
                      <button
                        className="bg-oranges-primary rounded-lg border-2 border-oranges-primary p-2 hover:bg-white shadow-lg shadow-oranges-primary cursor-pointer"
                        type="button"
                        onClick={() => {
                          props.setGetDataById({
                            id: address.id,
                            address: address.address,
                            city: address.city,
                            label: address.label,
                            postalCode: address.postalCode,
                            province: address.province,
                          });
                          props.setMenu("updating");
                        }}
                      >
                        <Image
                          src="/assets/images/pen.png"
                          alt="icon-edit"
                          width={20}
                          height={20}
                          className="mx-auto"
                        />
                      </button>
                      <button
                        className="bg-red-500 rounded-lg border-2 border-red-500 p-2 hover:bg-white shadow-lg shadow-red-500 cursor-pointer"
                        onClick={() => {
                          props.setGetDataById({
                            id: address.id,
                            address: address.address,
                            city: address.city,
                            label: address.label,
                            postalCode: address.postalCode,
                            province: address.province,
                          });
                          props.setDelete(true);
                        }}
                      >
                        <Image
                          src="/assets/images/trash.png"
                          alt="icon-trash"
                          width={20}
                          height={20}
                          className="mx-auto"
                        />
                      </button>
                    </div>
                  </li>
                )
              )}
            </>
          ) : (
            <div className="mx-auto py-10">
              <Image
                src="/assets/images/Empty-pana.png"
                alt="Empty data"
                width={150}
                height={150}
                className="mx-auto"
              />
              <h1 className="text-sm font-semibold tracking-wide text-center pt-2">
                Your address is empty, Please add your address first
              </h1>
              <div className=" pt-5 ml-52 cursor-pointer">
                <button
                  className="bg-oranges-primary rounded-md border-2 w-[40%] text-center border-oranges-primary mx-auto p-2 hover:bg-white cursor-pointer"
                  type="button"
                  onClick={() => props.setMenu("adding")}
                >
                  Add address
                </button>
              </div>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default ListAddresses;

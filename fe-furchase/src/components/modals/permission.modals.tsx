import { permissionDeleteProps } from "@/utils/interfaces/customInterface";
import Image from "next/image";
import React from "react";
import ToastMessage from "./toast.modals";

const PermissionModals = (props: permissionDeleteProps) => {
  return (
    <>
      {props.isToast && (
        <ToastMessage message={props.message} status={props.status} />
      )}
      <div className="fixed inset-0 z-50 flex items-center justify-center ">
        <div className="relative bg-white dark:bg-base-100 w-full max-w-md p-8 rounded-xl shadow-lg z-50 animate-fadeIn">
          <div className="absolute -right-2 -top-2 z-5 border-3 border-red-400 bg-white rounded-md  hover:bg-red-500">
            <button
              type="submit"
              onClick={() => props.onClose(false)}
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

          <div className="text-center">
            <Image
              src="/assets/images/dustbin.png"
              alt="dustbin"
              width={80}
              height={80}
              className="mx-auto"
            />
            <h1 className="mt-4 text-lg font-semibold">
              Are you sure you want to delete this {props.text}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              This action cannot be undone.
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              type="button"
              onClick={props.handleDeleteAddress}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PermissionModals;

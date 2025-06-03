import React from "react";

type Props = {
  message: string | undefined;
  status: string | undefined;
};

const ToastMessage = (props: Props) => {
  return (
    <div className="bg-gray-100   absolute mx-auto -top-5  right-0 left-0  w-[20%]">
      <div
        className={`${
          props.status ? "border-red-500" : "border-oranges-primary"
        } p-3  border-3 rounded-lg`}
      >
        <span>{props.message}</span>
      </div>
    </div>
  );
};

export default ToastMessage;
